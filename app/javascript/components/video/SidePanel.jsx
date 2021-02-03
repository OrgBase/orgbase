import React, {useContext, useState, useEffect} from 'react';
import CanvasDraw from "react-canvas-draw";
import {RoomContext} from "../../context/context";
import fetchWrapper from "../../helpers/fetchWrapper";
import iceBreakerLogo from "../../stylesheets/img/ice-breaker.svg"
import gameLogo from "../../stylesheets/img/game-icon.svg"
import gameChangeLogo from "../../stylesheets/img/dice.svg"
import Modal from "../common/modal";
import SelectGameForm from "../common/SelectGameForm";
import ParticipantSelectionList from "../common/ParticipantSelectionList";

const SidePanel = ({ localParticipant, roomName, room, participantIdentifiers }) => {
  const {gameSlug, randomFraction, activeParticipant, roomParticipants, pictionaryData, updateRoomDetails} = useContext(RoomContext);
  const [changeGameModalState, setChangeGameModalState] = useState(false)
  const [selectWinnerModalState, setSelectWinnerModalState] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [gameData, setGameData] = useState({})
  const [loadableCanvas, setLoadableCanvas] = useState({})

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  const isActiveParticipant = () => (activeParticipant && activeParticipant.identity) == localParticipant.identity

  useEffect(() => {
    async function fetchGameData() {
      try {
        fetchWrapper(`/game/${gameSlug}`)
          .then(response => response.json())
          .then(data => {
            setGameData(data)
        });
      } catch (e) {
        console.error(e);
      }
    }

    fetchGameData();
  }, [gameSlug])

  useEffect(() => {
    syncGameData(gameSlug, randomFraction, roomParticipants, activeParticipant)
  }, [])

  const syncGameData = (slug=gameSlug, fraction=randomFraction,
                        participants=roomParticipants, activeP=activeParticipant, pictinaryD= pictionaryData) => {
    const dataTrack = trackpubsToTracks(localParticipant.dataTracks)[0];
    dataTrack.send(JSON.stringify({
      gameSlug: slug,
      randomFraction: fraction,
      roomParticipants: participants,
      activeParticipant: activeP,
      pictionaryData: pictinaryD
    }));

    if (!(slug === gameSlug && fraction === randomFraction && (activeP.identity === activeParticipant.identity))) {
      fetchWrapper(`/room/${roomName}/panel-update`, 'POST',
        {
          game_slug: slug,
          random_fraction: fraction,
          employee_id: activeP && activeP.identity
        });
    }
    updateRoomDetails({
      gameSlug: slug,
      randomFraction: fraction,
      roomParticipants: participants,
      activeParticipant: activeP,
      pictionaryData: pictinaryD
    });
  }

  const { title, instructions, variants, type, winnerSelectionCriteria } = gameData

  const handleExit = () => {
    if(room) {
      room.localParticipant.tracks.forEach(function(trackPublication) {
        if (trackPublication.track.kind !== 'data') {
          trackPublication.track.stop();
        }
      });
      room.disconnect();
    }
    window.open('/lobby', '_self');
  }

  const toggleInstructions = () => setShowInstructions(!showInstructions)

  const changeVariant = () => {
    let fraction = Math.random()

    while (Math.floor(variants.length * fraction) === Math.floor(variants.length * randomFraction)) {
      fraction = Math.random()
    }

    syncGameData(gameSlug, fraction, roomParticipants, activeParticipant)
  }

  const changeTurn = (winnerIndices=[]) => {
    let fraction = Math.random()
    while (Math.floor(variants.length * fraction) === Math.floor(variants.length * randomFraction)) {
      fraction = Math.random()
    }

    let active_index = roomParticipants.findIndex(p => p.identity == activeParticipant.identity);
    const length = (roomParticipants && roomParticipants.length) || 1
    let nextParticipant = roomParticipants[(active_index + 1) % length]
    while (participantIdentifiers.indexOf(JSON.stringify(nextParticipant.identity)) < 0) {
      active_index += 1
      nextParticipant = roomParticipants[(active_index + 1) % length]
    }

    fetchWrapper('/room-participant', 'POST', {
      room_slug: roomName,
      winner_ids: winnerIndices.map((i) => roomParticipants[i] && roomParticipants[i].identity)
    })
      .then(response => response.json())
      .then(data => {
        syncGameData(gameSlug, fraction, data, nextParticipant, "")
      })
      .catch(error => {
        console.error(error)
      });
  }

  const toggleChangeGameModal = () => setChangeGameModalState(!changeGameModalState)
  const toggleSelectWinnerModal = () => setSelectWinnerModalState(!selectWinnerModalState)

  const renderVariant = () => {
    const variant = variants && variants[Math.floor(variants.length * randomFraction)]
     let variantArea = variant && <>
      {variant.title &&
      <div className="variant-title px-2 mt-2">
        {variant.title}
      </div>
      }
      <div className="game-variant px-2 mb-2">
        {variant.variant}
        {variant.hint && <>
          <br /><br />
          {variant.hint}
        </>}
      </div>
    </>

    if (gameSlug === 'pictionary') {
      return <>
        {variantArea}
        <CanvasDraw
          ref={canvasDraw => setLoadableCanvas(canvasDraw)}
          hideGrid
          canvasHeight={300}
          lazyRadius={0}
          brushRadius={1}
          onChange={() => syncGameData(gameSlug, randomFraction, roomParticipants, activeParticipant, loadableCanvas.getSaveData())}
        />
      </>
    } else {
      return variantArea
    }
  }
  const getName = (name) => {
    if(name && name[name.length -1].toUpperCase() == 'S') {
      return `${name}'`
    } else {
      return `${name}'s`
    }
  }

  const renderPassiveParticipantArea = () => {
    if(gameSlug === 'drawkward') {
      return (
        <>
          <p>Its {getName(activeParticipant && activeParticipant.name)} turn</p>
          <CanvasDraw
            hideGrid
            canvasHeight={300}
            lazyRadius={0}
            brushRadius={1}
          />
        </>
      )
    } else if (gameSlug === 'pictionary') {
      return (
        <>
          <p>Its {getName(activeParticipant && activeParticipant.name)} turn</p>
          <CanvasDraw
            disabled
            hideGrid
            loadTimeOffset={0}
            saveData={pictionaryData}
            canvasHeight={300}
            lazyRadius={0}
            brushRadius={1}
          />
        </>
      )
    } else {
      return `Its ${getName(activeParticipant && activeParticipant.name)} turn`
    }
  }

  return (
    <>
      {type == 'ice-breaker' && <img className='game-type-logo' src={iceBreakerLogo}/>}
      {type != 'ice-breaker' && <img className='game-type-logo' src={gameLogo}/>}

      <button
        className='jally-button-small exit-button'
        onClick={handleExit}
      >
        Exit
      </button>
      <h3 className="game-title has-text-white"> { title } </h3>
      {showInstructions ? <>
        <button className='jally-button-small transparent-button my-3' onClick={toggleInstructions}>Back</button>
        <div className="game-rules px-2 mb-2">
          {instructions}
        </div>
      </> : <>
        <button className='jally-button-small transparent-button my-3' onClick={toggleInstructions}>Show Instructions</button>
        {(type == 'ice-breaker' || isActiveParticipant()) ? renderVariant()  :
          <div className="game-variant px-2 mb-2">
            {renderPassiveParticipantArea()}
          </div>
        }
      </>}
        {}

      {type == 'ice-breaker' ? <button
        className="button jally-button my-3"
        onClick={changeVariant}
      >
        Next Question
      </button> : <button
        className="button jally-button my-3"
        onClick={toggleSelectWinnerModal}
      >
        Next Turn
      </button>
      }

      <div className='panel-bottom-container'>
        <img
          className='panel-bottom-logo' src={gameChangeLogo}
          onClick={toggleChangeGameModal}
        />
      </div>

      <Modal
        modalState={changeGameModalState}
        closeModal={toggleChangeGameModal}
        modalTitle='Select the next activity'
        className='jally-modal'
      >
        <SelectGameForm
          changeGame={true}
          syncGameData={syncGameData}
          closeModal={toggleChangeGameModal}
          roomName={roomName}
        />
      </Modal>

      <Modal
        modalState={selectWinnerModalState}
        closeModal={toggleSelectWinnerModal}
        modalTitle='Who won this round?'
        className='jally-modal'
      >
        <p>{winnerSelectionCriteria}</p>
        <ParticipantSelectionList
          cardContents={roomParticipants}
          multiple
          maxSelectable={roomParticipants && roomParticipants.length}
          changeTurn={changeTurn}
          closeModal={toggleSelectWinnerModal}
        />
      </Modal>
    </>
  );
}

export default SidePanel;