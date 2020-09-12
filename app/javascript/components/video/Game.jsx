import React, {useState, useCallback} from 'react';
import games from "./games";

const Game = ({ gameIdx }) => {
  const [index, setIndex] = useState(gameIdx);

  const loadGame = () => {
    const idx = index === 0 ? 1 : 0;
    setIndex(idx);
  };

  const game = games[index]
  return (
    <>
      <h3 className="game-title"> {game.name} </h3>
      <p className="game-rules">{game.rules}</p>
      <button className="change-game-button" key={+new Date()} onClick={loadGame}>Change Game</button>
    </>
  );
}

export default Game;