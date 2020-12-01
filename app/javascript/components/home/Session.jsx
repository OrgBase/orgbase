import React, { createRef, useState} from 'react';
import moment from 'moment';
import Countdown from 'react-countdown';
import useInterval from "../../helpers/useInterval";
import fetchWrapper from "../../helpers/fetchWrapper";


const Session = ({ sessionSlug, config }) => {
  const urlInputRef = createRef();
  const [copyText, setCopyText] = useState('Copy')

  const handleExit = () => {
    window.open('/lobby', '_self');
  }

  const copyToClipboard = (e) => {
    e.preventDefault();
    urlInputRef.current.select();
    document.execCommand('copy');
    setCopyText('Copied!')
  }

  const urlCopier = () => {
    return (
      <>
        <h1 className='mb-3 max-width-600 my-6'>
          Hold on tight.. we’ll get you matched up with some teammates shortly
        </h1>
        <div>
          <input
            className='input room-url'
            ref={urlInputRef}
            defaultValue={window.location.href.split('?')[0]}
            readOnly
          />
          <button className='jally-button height-40 ml-2 px-3 has-text-weight-normal' onClick={copyToClipboard}>
            <span>{copyText}</span>
          </button>
        </div>
      </>
    )
  }

  const exitButton = () => (
    <button className="button is-primary leave-room-btn is-small" onClick={handleExit}>
          <span className='icon'>
            <i className="fas fa-sign-out-alt"></i>
          </span>
      <span>Go to Lobby</span>
    </button>
  )

  const getSessionRoom = () => {
    fetchWrapper('/session-room', 'POST', {
      session_slug: sessionSlug
    })
      .then(response => response.json())
      .then(data => {
        if(data.room_slug) {
          window.location.href = `/room/${data.room_slug}`
        }
      })
      .catch(error => {
        console.error(error)
      });
  }

  const allowedToJoin = () => {
    const now = Math.floor(new Date().getTime()/1000);
    const allowed = now >= config.scheduledAt && now <= config.scheduledAt + config.cutOffSeconds;
    if(allowed) {
      useInterval(getSessionRoom, 5000)
    }
    return allowed
  }

  const showCountDown = () => {
    const now = Math.floor(new Date().getTime()/1000);

    return now < config.scheduledAt;
  }

  const sessionIsClosed = () => {
    const now = Math.floor(new Date().getTime()/1000);

    return now > config.scheduledAt + config.cutOffSeconds;
  }

  const countDownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    return <>
      <p className='mt-6 mb-2'>Come back later or start your meditation marathon for the next ..</p>
      <div className='columns is-centered is-p-color is-gapless is-mobile'>
        {days && <div className='column is-narrow subtitle'>{days} {days > 1 ? 'days' : 'day'},&nbsp;</div>}
        <div className='column is-narrow subtitle'>{hours} {hours > 1 ? 'hours' : 'hour'},&nbsp;</div>
        <div className='column is-narrow subtitle'>{minutes} {minutes > 1 ? 'minutes' : 'minute'} and &nbsp;</div>
        <div className='column is-narrow subtitle'>{seconds} {seconds > 1 ? 'seconds' : 'second'}.</div>
      </div>
    </>
    if (completed) {
      window.location.reload();
    } else {
      return <h1 className='title'>
        {days} {days > 1 ? 'days ' : 'day '},
        {hours} {hours > 1 ? 'hours ' : 'hour '},
        {minutes} {days > 1 ? 'minutes ' : 'minute '} and
        {seconds} {seconds > 1 ? 'seconds' : 'second'}</h1>;
    }
  };

  return (
    <div className='session-container'>
      <div className="has-text-centered">
        {allowedToJoin() && <>
          {urlCopier()}
          <div className='loading-box pending has-text-centered my-6'></div>
        </>
        }
        {sessionIsClosed() && <>
          <h1 className='ml-2 mt-2 my-6'>Oops! You’ve missed it</h1>
          <div className='subtitle is-p-color'>Unfortunately this Jally has already taken place. Feel free to start or schedule a new one!</div>
          <button className='button jally-button height-40 ml-2 px-3 has-text-weight-normal my-6' onClick={() => window.location.href = "/lobby"}>
            Back to Lobby
          </button>
        </>
        }
        {showCountDown() && <>
          <h1 className='my-6'>
            You’re early! This Jally hasn’t started yet.
          </h1>
          <div className='has-text-centered'>
            <Countdown
              date={new Date(config.scheduledAt * 1000)}
              renderer={countDownRenderer}
            />
          </div>
          <button className='button jally-button height-40 ml-2 px-3 has-text-weight-normal my-6' onClick={() => window.location.href = "/lobby"}>
            Back to Lobby
          </button>
        </>
        }
      </div>
    </div>
  );
};

export default Session;