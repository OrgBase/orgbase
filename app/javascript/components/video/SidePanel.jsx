import React, {useState, useCallback, useEffect, useContext} from 'react';
import games from "./games";
import {RoomContext} from "../../context/context";

const SidePanel = ({ localParticipant, roomName }) => {
  const {panelId, panelType, updateRoomDetails} = useContext(RoomContext);

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  const loadRandomGame = useCallback(event => {
    const dataTrack = trackpubsToTracks(localParticipant.dataTracks)[0];
    let id = panelId;
    const panelType = 'short-game';

    while(id === panelId) id = Math.floor(Math.random() * games.length);

    dataTrack.send(JSON.stringify({
      event: 'short-game-load',
      panelType: 'short-game',
      panelId: id
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
        panel_type: panelType,
      })
    });

    updateRoomDetails({
      panelType: 'short-game',
      panelId: id
    });
  }, [panelId]);

  const game = games[panelId]

  return (
    <>
      {panelType && game ? (
        <>
          <h3 className="title"> {game.name} </h3>
          <p className="game-rules">{game.rules}</p>
          <button className="button is-primary change-game-button" key={+new Date()} onClick={loadRandomGame}>Change Game</button>
        </>
      ) : (
        <button className="button is-primary start-game-button" key={+new Date()} onClick={loadRandomGame}>Start Game</button>
      )}
    </>
  );
}

export default SidePanel;