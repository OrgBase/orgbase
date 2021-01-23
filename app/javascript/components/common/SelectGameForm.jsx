import React, { useState } from 'react'
import ddtq from '../../stylesheets/img/ddtq.svg'
import wyr from '../../stylesheets/img/wyr.svg'
import charades from '../../stylesheets/img/charades.svg'
import fetchWrapper from "../../helpers/fetchWrapper";

const SelectGameForm = ({ syncGameData, closeModal, changeGame, roomName }) => {
  const [loading, setLoading] = useState(false)
  const handleGameSelection = (gameSlug) => {
    if(changeGame) {
      fetchWrapper('/room-participant', 'POST', {
        room_slug: roomName,
        reset_scores: true
      })
        .then(response => response.json())
        .then(data => {
          syncGameData(gameSlug, Math.random(), data)
          closeModal()
        })
        .catch(error => {
          console.error(error)
        });
    } else {
      setLoading(true)
      fetchWrapper('/session', 'POST', {
        starting_game_slug: gameSlug
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
               onClick={handleGameSelection.bind(null, 'ddtq')}
          />
        </div>
        <div className='column is-narrow'>
          <img src={wyr}
               className='max-width-150'
               onClick={handleGameSelection.bind(null, 'wyr')}
          />
        </div>
        <div className='column is-narrow'>
          <img src={charades}
               className='max-width-150'
               onClick={handleGameSelection.bind(null, 'charades')}
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