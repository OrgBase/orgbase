import React, { useState } from 'react'
import qq from '../../stylesheets/img/qq.svg'
import wyr from '../../stylesheets/img/wyr.svg'
import charades from '../../stylesheets/img/charades.svg'
import tal from '../../stylesheets/img/tal.svg'
import vm from '../../stylesheets/img/vm.svg'
import gw from '../../stylesheets/img/gw.svg'
import tof from '../../stylesheets/img/tof.svg'
import di from '../../stylesheets/img/di.svg'
import drawkward from '../../stylesheets/img/drawkward.svg'
import pictionary from '../../stylesheets/img/pictionary.svg'
import qqBack from '../../stylesheets/img/qq-back.svg'
import wyrBack from '../../stylesheets/img/wyr-back.svg'
import charadesBack from '../../stylesheets/img/charades-back.svg'
import talBack from '../../stylesheets/img/tal-back.svg'
import vmBack from '../../stylesheets/img/vm-back.svg'
import gwBack from '../../stylesheets/img/gw-back.svg'
import tofBack from '../../stylesheets/img/tof-back.svg'
import diBack from '../../stylesheets/img/di-back.svg'
import drawkwardBack from '../../stylesheets/img/drawkward-back.svg'
import pictionaryBack from '../../stylesheets/img/pictionary-back.svg'
import fetchWrapper from "../../helpers/fetchWrapper";
import GameCard from "./GameCard";

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
        <div className='column is-one-quarter is-narrow-mobile'>
          <GameCard
            frontImg={qq}
            onGameSelect={handleGameSelection.bind(null, 'qq')}
            backImg={qqBack}
          />

        </div>
        <div className='column is-one-quarter is-narrow-mobile'>
          <GameCard
            frontImg={drawkward}
            onGameSelect={handleGameSelection.bind(null, 'drawkward')}
            backImg={drawkwardBack}
          />
        </div>
        <div className='column is-one-quarter is-narrow-mobile'>
          <GameCard
            frontImg={charades}
            onGameSelect={handleGameSelection.bind(null, 'charades')}
            backImg={charadesBack}
          />
        </div>
        <div className='column is-one-quarter is-narrow-mobile'>
          <GameCard
            frontImg={wyr}
            onGameSelect={handleGameSelection.bind(null, 'wyr')}
            backImg={wyrBack}
          />
        </div>
        <div className='column is-one-quarter is-narrow-mobile'>
          <GameCard
            frontImg={tal}
            onGameSelect={handleGameSelection.bind(null, 'tal')}
            backImg={talBack}
          />
        </div>
        <div className='column is-one-quarter is-narrow-mobile'>
          <GameCard
            frontImg={pictionary}
            onGameSelect={handleGameSelection.bind(null, 'pictionary')}
            backImg={pictionaryBack}
          />
        </div>
        <div className='column is-one-quarter is-narrow-mobile'>
          <GameCard
            frontImg={vm}
            onGameSelect={handleGameSelection.bind(null, 'vm')}
            backImg={vmBack}
          />
        </div>
        <div className='column is-one-quarter is-narrow-mobile'>
          <GameCard
            frontImg={gw}
            onGameSelect={handleGameSelection.bind(null, 'gw')}
            backImg={gwBack}
          />
        </div>
        <div className='column is-one-quarter is-narrow-mobile'>
          <GameCard
            frontImg={di}
            onGameSelect={handleGameSelection.bind(null, 'di')}
            backImg={diBack}
          />
        </div>
        <div className='column is-one-quarter is-narrow-mobile'>
          <GameCard
            frontImg={tof}
            onGameSelect={handleGameSelection.bind(null, 'tof')}
            backImg={tofBack}
          />
        </div>
      </div>
    </div>
  </>
}

export default SelectGameForm