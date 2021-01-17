import React from 'react'
import ddtq from '../../stylesheets/img/ddtq.svg'
import wyr from '../../stylesheets/img/wyr.svg'

const SelectGameForm = ({ syncGameData, closeModal, changeGame }) => {
  const handleGameSelection = (gameId) => {
    if(changeGame) {
      syncGameData(gameId, Math.random())
    }
    closeModal()
  }
  return <>
    <div className="actions has-text-centered">
      <div className='columns is is-multiline is-centered my-6'>
        <div className='column is-narrow'>
          <img src={ddtq}
               className='max-width-150'
               onClick={handleGameSelection.bind(null, 2)}
          />
        </div>
        <div className='column is-narrow'>
          <img src={wyr}
               className='max-width-150'
               onClick={handleGameSelection.bind(null, 1)}
          />
        </div>
      </div>
      <button
        className="button is-centered mb-3 jally-button"
        onClick={closeModal}
      >Close</button>
    </div>
  </>
}

export default SelectGameForm