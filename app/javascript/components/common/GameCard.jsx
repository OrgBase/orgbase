import React, { useState } from 'react';

const GameCard = ({ frontImg, backImg, onGameSelect }) => {
  const [showDesc, setShowDesc] = useState(false)

  const toggleDesc = () => setShowDesc(!showDesc)

  return(
    <div className='game-card-container is-relative'>
      {showDesc ? <>
        <img src={backImg} className='full-width'/>
        <span
          className="icon is-small close-icon is-clickable"
          onClick={toggleDesc}
        >
          <i className="fas fa-times"></i>
        </span>
      </> : <>
        <img src={frontImg} className='full-width'/>
        <button
          className="button start-button"
          onClick={onGameSelect}
        >
          START
        </button>
        <span
          className="icon is-small info-icon is-clickable"
          onClick={toggleDesc}
        >
          <i className="fas fa-info-circle"></i>
        </span>
      </>}
    </div>
  );
}

export default GameCard;