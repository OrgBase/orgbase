import React, {useCallback, useContext, useState, useEffect} from 'react';
import {RoomContext} from "../../context/context";
import fetchWrapper from "../../helpers/fetchWrapper";
import iceBreakerLogo from "../../stylesheets/img/ice-breaker.svg"
import gameLogo from "../../stylesheets/img/game-icon.svg"
import gameChangeLogo from "../../stylesheets/img/dice.svg"
import Modal from "../common/modal";
import SelectGameForm from "../common/SelectGameForm";
import ParticipantSelectionList from "../common/ParticipantSelectionList";

const SidePanel = ({ localParticipant, roomName, room, participantIdentifiers }) => {
  const {gameSlug, randomFraction, activeParticipant, roomParticipants, updateRoomDetails} = useContext(RoomContext);
  const [changeGameModalState, setChangeGameModalState] = useState(false)
  const [selectWinnerModalState, setSelectWinnerModalState] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [gameData, setGameData] = useState({})

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

  const syncGameData = (gameSlug=gameSlug, randomFraction=randomFraction,
                        roomParticipants=roomParticipants, activeParticipant=activeParticipant) => {
    const dataTrack = trackpubsToTracks(localParticipant.dataTracks)[0];
    dataTrack.send(JSON.stringify({
      gameSlug: gameSlug,
      randomFraction: randomFraction,
      roomParticipants: roomParticipants,
      activeParticipant: activeParticipant
    }));

    fetchWrapper(`/room/${roomName}/panel-update`, 'POST',
      {
        game_slug: gameSlug,
        random_fraction: randomFraction,
        employee_id: activeParticipant && activeParticipant.identity
      });

    updateRoomDetails({
      gameSlug: gameSlug,
      randomFraction: randomFraction,
      roomParticipants: roomParticipants,
      activeParticipant: activeParticipant
    });
  }

  const { title, instructions, variants, type } = gameData

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
        syncGameData(gameSlug, fraction, data, nextParticipant)
      })
      .catch(error => {
        console.error(error)
      });
  }

  const toggleChangeGameModal = () => setChangeGameModalState(!changeGameModalState)
  const toggleSelectWinnerModal = () => setSelectWinnerModalState(!selectWinnerModalState)

  const renderVariant = () => (
    variants && variants[Math.floor(variants.length * randomFraction)] &&
    <>
      {variants[Math.floor(variants.length * randomFraction)].title &&
      <div className="variant-title px-2 mt-2">
        {variants[Math.floor(variants.length * randomFraction)].title}
      </div>
      }
      <div className="game-rules px-2 mb-2">
        {variants[Math.floor(variants.length * randomFraction)].variant}
      </div>
    </>
  )

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
          <div className="game-rules px-2 mb-2">
            {`Its ${activeParticipant && activeParticipant.name}'s turn`}
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
        />
      </Modal>

      <Modal
        modalState={selectWinnerModalState}
        closeModal={toggleSelectWinnerModal}
        modalTitle='Who won this round?'
        className='jally-modal'
      >
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