import React, {useState, useCallback, useEffect, useContext} from 'react';
import Game from "./Game";
import games from "./games";
import {RoomContext} from "../../context/context";

const SidePanel = ({ localParticipant }) => {
  const {gameId, updateRoomDetails} = useContext(RoomContext);

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  const loadGame = useCallback(event => {
    const dataTrack = trackpubsToTracks(localParticipant.dataTracks)[0];
    let id = gameId;

    while(id === gameId) id = Math.floor(Math.random() * games.length);

    dataTrack.send(JSON.stringify({
      event: 'short-game-load',
      gameId: id
    }));

    updateRoomDetails({
      gameId: id
    });
  }, [gameId]);

  const game = games[gameId]

  return (
    <>
      {gameId > -1 ? (
        <>
          <h3 className="game-title"> {game.name} </h3>
          <p className="game-rules">{game.rules}</p>
          <button className="change-game-button" key={+new Date()} onClick={loadGame}>Change Game</button>
        </>
      ) : (
        <button className="start-game-button" key={+new Date()} onClick={loadGame}>Start Game</button>
      )}
    </>
  );
}

export default SidePanel;