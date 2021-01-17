import React, { useState } from 'react'
import ddtq from '../../stylesheets/img/ddtq.svg'
import wyr from '../../stylesheets/img/wyr.svg'
import fetchWrapper from "../../helpers/fetchWrapper";

const SelectGameForm = ({ syncGameData, closeModal, changeGame }) => {
  const [loading, setLoading] = useState(false)
  const handleGameSelection = (gameId) => {
    if(changeGame) {
      syncGameData(gameId, Math.random())
      closeModal()
    } else {
      setLoading(true)
      fetchWrapper('/session', 'POST', {
        starting_game_id: gameId
      })
        .then(response => response.json())
        .then(data => {
          setLoading(false)
          window.location.href = `/session/${data.session_slug}`
        })
        .catch(error => {
          setLoading(false)
          console.error(error)
        });
    }
  }
  return <>
    <div className="actions has-text-centered">
      <div className={`columns is is-multiline is-centered my-6 ${loading ? 'pending' : ''}`}>
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