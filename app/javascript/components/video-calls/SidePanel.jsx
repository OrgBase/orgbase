import React, {useState, useCallback} from 'react';
import Game from "./Game";

const SidePanel = () => {
  const [gameIdx, setGameIdx] = useState(null);

  const loadGame = useCallback(event => {
    setGameIdx(1);
  }, [gameIdx]);
  return (
    <>
      {gameIdx ? (
        <Game gameIdx={gameIdx -1} />
      ) : (
        <button className="start-game-button" onClick={loadGame}>Start Game</button>
      )}
    </>
  );
}

export default SidePanel;