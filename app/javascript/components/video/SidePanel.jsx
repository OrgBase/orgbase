import React, {useState, useCallback, useEffect, useContext} from 'react';
import games from "./games";
import {RoomContext} from "../../context/context";

const SidePanel = ({ localParticipant }) => {
  const {panelId, panelType, updateRoomDetails} = useContext(RoomContext);

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  const loadRandomGame = useCallback(event => {
    const dataTrack = trackpubsToTracks(localParticipant.dataTracks)[0];
    let id = panelId;

    while(id === panelId) id = Math.floor(Math.random() * games.length);

    dataTrack.send(JSON.stringify({
      event: 'short-game-load',
      panelType: 'short-game',
      panelId: id
    }));

    updateRoomDetails({
      panelType: 'short-game',
      panelId: id
    });
  }, [panelId]);

  const game = games[panelId]

  return (
    <>
      {panelType  ? (
        <>
          <h3 className="game-title"> {game.name} </h3>
          <p className="game-rules">{game.rules}</p>
          <button className="change-game-button" key={+new Date()} onClick={loadRandomGame}>Change Game</button>
        </>
      ) : (
        <button className="start-game-button" key={+new Date()} onClick={loadRandomGame}>Start Game</button>
      )}
    </>
  );
}

export default SidePanel;