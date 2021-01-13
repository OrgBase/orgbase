import React, {useCallback, useContext, useState} from 'react';
import {getGame, getRandomGameIndex} from "./games";
import {RoomContext} from "../../context/context";

const SidePanel = ({ localParticipant, roomName, room }) => {
  const {panelId, panelType, randomFraction, updateRoomDetails} = useContext(RoomContext);
  const [showInstructions, setShowInstructions] = useState(false)

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  const loadRandomGame = useCallback(event => {
    const dataTrack = trackpubsToTracks(localParticipant.dataTracks)[0];
    let id = panelId;
    const type = 'short-game';
    const fraction = Math.random()

    while(id === panelId) id = getRandomGameIndex(fraction);

    dataTrack.send(JSON.stringify({
      event: 'short-game-load',
      panelType: type,
      panelId: id,
      randomFraction: fraction
    }));

    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    fetch(`/room/${roomName}/panel-update`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({
        panel_id: id,
        panel_type: type,
        random_fraction: fraction
      })
    });

    updateRoomDetails({
      panelType: 'short-game',
      panelId: id,
      randomFraction: fraction
    });
  }, [panelId]);

  const game = getGame(panelId, randomFraction)

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

  return (
    <>
      <button
        className='jally-button-small exit-button'
        onClick={handleExit}
      >
        Exit
      </button>
      <h3 className="game-title has-text-white"> {game.name} </h3>
      {showInstructions ? <>
        <button className='jally-button-small transparent-button my-3' onClick={toggleInstructions}>Back</button>
        <div className="game-rules px-2 mb-2">
          Take it in turns to reveal which option you’d choose, and why
        </div>
      </> : <>
        <button className='jally-button-small transparent-button my-3' onClick={toggleInstructions}>Show Instructions</button>
        <div className="game-rules px-2 mb-2">
          Would you rather have everything on your phone right now (browsing history, photos, etc.) made public to anyone who searches your name or never use a cell phone again?
        </div>
        <button
          className="button jally-button my-3"
          onClick={loadRandomGame}
        >
          Next Question
        </button>
      </>}
    </>
  );
}

export default SidePanel;