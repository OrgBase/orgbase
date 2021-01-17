import React, {useCallback, useContext, useState, useEffect} from 'react';
import {RoomContext} from "../../context/context";
import fetchWrapper from "../../helpers/fetchWrapper";
import iceBreakerLogo from "../../stylesheets/img/ice-breaker.svg"
import gameChangeLogo from "../../stylesheets/img/dice.svg"
import Modal from "../common/modal";
import SelectGameForm from "../common/SelectGameForm";

const SidePanel = ({ localParticipant, roomName, room }) => {
  const {panelId, randomFraction, updateRoomDetails} = useContext(RoomContext);
  const [changeGameModalState, setChangeGameModalState] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [gameData, setGameData] = useState({})

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  useEffect(() => {
    async function fetchGameData() {
      try {
        fetchWrapper(`/game/${panelId}`)
          .then(response => response.json())
          .then(data => {
            setGameData(data)
        });
      } catch (e) {
        console.error(e);
      }
    }

    fetchGameData();
  }, [panelId])

  const syncGameData = (panelId, randomFraction) => {
    const dataTrack = trackpubsToTracks(localParticipant.dataTracks)[0];
    dataTrack.send(JSON.stringify({
      panelId: panelId,
      randomFraction: randomFraction
    }));

    fetchWrapper(`/room/${roomName}/panel-update`, 'POST',
      {
        panel_id: panelId,
        random_fraction: randomFraction
      });

    updateRoomDetails({
      panelId: panelId,
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

    syncGameData(panelId, fraction)
  }

  const toggleChangeGameModal = () => setChangeGameModalState(!changeGameModalState)

  return (
    <>
      {type == 'ice-breaker' && <img className='game-type-logo' src={iceBreakerLogo}/>}

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
        <div className="game-rules px-2 mb-2">
          {variants &&
            variants[Math.floor(variants.length * randomFraction)] &&
            variants[Math.floor(variants.length * randomFraction)].variant}
        </div>
        <button
          className="button jally-button my-3"
          onClick={changeVariant}
        >
          Next Question
        </button>
      </>}

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
    </>
  );
}

export default SidePanel;