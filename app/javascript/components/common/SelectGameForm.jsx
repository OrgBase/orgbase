import React, { useState } from 'react'
import ddtq from '../../stylesheets/img/ddtq.svg'
import wyr from '../../stylesheets/img/wyr.svg'
import charades from '../../stylesheets/img/charades.svg'
import otol from '../../stylesheets/img/otol.svg'
import yna from '../../stylesheets/img/yna.svg'
import vm from '../../stylesheets/img/vm.svg'
import gw from '../../stylesheets/img/gw.svg'
import tof from '../../stylesheets/img/tof.svg'
import dok from '../../stylesheets/img/dok.svg'
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
               className='max-width-125 is-clickable'
               onClick={handleGameSelection.bind(null, 'ddtq')}
          />
        </div>
        <div className='column is-narrow'>
          <img src={charades}
               className='max-width-125 is-clickable'
               onClick={handleGameSelection.bind(null, 'charades')}
          />
        </div>
        <div className='column is-narrow'>
          <img src={wyr}
               className='max-width-125 is-clickable'
               onClick={handleGameSelection.bind(null, 'wyr')}
          />
        </div>
        <div className='column is-narrow'>
          <img src={otol}
               className='max-width-125 is-clickable'
               onClick={handleGameSelection.bind(null, 'otol')}
          />
        </div>
        {/*<div className='column is-narrow'>*/}
        {/*  <img src={yna}*/}
        {/*       className='max-width-125 is-clickable'*/}
        {/*       onClick={handleGameSelection.bind(null, 'yna')}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className='column is-narrow'>
          <img src={vm}
               className='max-width-125 is-clickable'
               onClick={handleGameSelection.bind(null, 'vm')}
          />
        </div>
        <div className='column is-narrow'>
          <img src={gw}
               className='max-width-125 is-clickable'
               onClick={handleGameSelection.bind(null, 'gw')}
          />
        </div>
        <div className='column is-narrow'>
          <img src={tof}
               className='max-width-125 is-clickable'
               onClick={handleGameSelection.bind(null, 'tof')}
          />
        </div>
        <div className='column is-narrow'>
          <img src={dok}
               className='max-width-125 is-clickable'
               onClick={handleGameSelection.bind(null, 'dok')}
          />
        </div>
      </div>
    </div>
  </>
}

export default SelectGameForm