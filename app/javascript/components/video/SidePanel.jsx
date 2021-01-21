import React, {useCallback, useContext, useState, useEffect} from 'react';
import {RoomContext} from "../../context/context";
import fetchWrapper from "../../helpers/fetchWrapper";
import iceBreakerLogo from "../../stylesheets/img/ice-breaker.svg"
import gameLogo from "../../stylesheets/img/game-icon.svg"
import gameChangeLogo from "../../stylesheets/img/dice.svg"
import Modal from "../common/modal";
import SelectGameForm from "../common/SelectGameForm";

const SidePanel = ({ localParticipant, roomName, room }) => {
  const {gameSlug, randomFraction, activeParticipant, updateRoomDetails} = useContext(RoomContext);
  const [changeGameModalState, setChangeGameModalState] = useState(false)
  const [selectWinnerModalState, setSelectWinnerModalState] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [gameData, setGameData] = useState({})

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  const isActiveParticipant = () => activeParticipant.identity == localParticipant.identity

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

  const syncGameData = (gameSlug, randomFraction) => {
    const dataTrack = trackpubsToTracks(localParticipant.dataTracks)[0];
    dataTrack.send(JSON.stringify({
      gameSlug: gameSlug,
      randomFraction: randomFraction
    }));

    fetchWrapper(`/room/${roomName}/panel-update`, 'POST',
      {
        game_slug: gameSlug,
        random_fraction: randomFraction
      });

    updateRoomDetails({
      gameSlug: gameSlug,
      randomFraction: randomFraction
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

    syncGameData(gameSlug, fraction)
  }

  const changeTurn = () => {
    let fraction = Math.random()

    while (Math.floor(variants.length * fraction) === Math.floor(variants.length * randomFraction)) {
      fraction = Math.random()
    }

    syncGameData(gameSlug, fraction)
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
            {`Its ${activeParticipant.name}'s turn`}
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
        Participant Cards here
      </Modal>
    </>
  );
}

export default SidePanel;