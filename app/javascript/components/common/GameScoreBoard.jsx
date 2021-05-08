import React, {useContext, useEffect, useState} from 'react';
import {RoomContext} from "../../context/context";
import ordinalize from "../../helpers/ordinalize";
import Countdown from "./Countdown";

const GameScoreBoard = ({closeModal, changedBy, localParticipantIdentity}) => {
  const {roomParticipants} = useContext(RoomContext);
  useEffect(() => {
    window.setTimeout(closeModal, 10000)
  }, [])

  const renderParticipantScore = (participant, index) => {
    const getRowStyle = () => {
      const styles = {}
      if(index === 0) {
        styles.border = `2px solid ${participant.color}`
      }
      styles.borderRadius = '25px'
      styles.backgroundColor = '#F9F9F9';

      return styles
    }
    return (
      <div
        key={participant.identity}
        className="columns mt-2 mx-5"
        style={getRowStyle()}
      >
        <div className="column has-text-centered">
          {index === 0 && <span
            className="icon is-small close-icon"
            style={{color: "#D4AF37"}}
          >
          <i className="fas fa-trophy"></i>
        </span>}
          {`  ${ordinalize(index + 1)}`}
        </div>
        <div className="column has-text-centered">
          {participant.name}
        </div>
        <div
          className="column has-text-centered"
          style={{color: participant.color}}
        >
          {`${participant.score} point${participant.score === 1 ? '' : 's'}`}
        </div>
      </div>
    )
  }

  return <>
    {changedBy && <div className='mx-3 has-text-centered subtitle'>
      {changedBy} has ended the current game, here are the scores!
    </div>}

    {roomParticipants.sort((p1, p2) => {
      if(p1.score < p2.score) {
        return 1
      } else {
        return -1
      }
    })
      .map((participant, index) => renderParticipantScore(participant, index))}
    <div
      className='mx-6 mt-3 py-1 has-text-centered'
      style={{
        border: '1px solid',
        borderRadius: '5px',
      }}
    >
      Your next activity will start in <Countdown initialCount={10}/>
    </div>
  </>
}

export default GameScoreBoard;