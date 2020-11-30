import React, {useCallback, useContext} from 'react';
import {getGame, getRandomGameIndex} from "./games";
import {RoomContext} from "../../context/context";

const SidePanel = ({ localParticipant, roomName }) => {
  const {panelId, panelType, randomFraction, updateRoomDetails} = useContext(RoomContext);

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

  return (
    <>
      {panelType && game ? (
        <>
          <h3 className="title has-text-white"> {game.name} </h3>
          <p className="game-rules px-2 mb-2">{game.rules}</p>
          <button className="button jally-button" key={+new Date()} onClick={loadRandomGame}>
            <span className='icon'>
            <i className="fas fa-random"></i>
          </span>
            <span>Change Game</span>
          </button>
        </>
      ) : (
        <button className="button jally-button" key={+new Date()} onClick={loadRandomGame}>
          <span className='icon'>
            <i className="fas fa-flag-checkered"></i>
          </span>
          <span>Start Game</span>
        </button>
      )}
    </>
  );
}

export default SidePanel;