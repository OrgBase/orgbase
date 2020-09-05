import React, {useState, useCallback, useEffect} from 'react';
import Game from "./Game";
import games from "./games";

const SidePanel = ({ localParticipant, remoteParticipants, room }) => {
  const [gameIdx, setGameIdx] = useState(-1);

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  const loadGame = useCallback(event => {
    setGameIdx(Math.floor(Math.random() * games.length));
    const dataTrack = trackpubsToTracks(localParticipant.dataTracks)[0];

    dataTrack.send(JSON.stringify({
      event: 'start-game',
      gameIndex: 0
    }));
  }, [gameIdx]);

  const game = games[gameIdx]

  return (
    <>
      {gameIdx > -1 ? (
        <>
          <h3 className="game-title"> {game.name} </h3>
          <p className="game-rules">{game.rules}</p>
          <button className="change-game-button" key={+new Date()} onClick={loadGame}>Change Game</button>
        </>
      ) : (
        <button className="start-game-button" onClick={loadGame}>Start Game</button>
      )}
    </>
  );
}

export default SidePanel;