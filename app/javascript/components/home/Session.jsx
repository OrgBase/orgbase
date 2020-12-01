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
        <div className='columns is-centered is-multiline is-centered'>
          <div className='column is-four-fifths mt-6'>
            <h1 className='mb-3'>
              Hold on tight.. we’ll get you matched up with some teammates shortly
            </h1>
          </div>
          <div className='column is-narrow'>
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
    <>
      <div className="has-text-centered">
        {allowedToJoin() &&
        <div className="column has-text-centered">
          {urlCopier()}
        </div>
        }
        {sessionIsClosed() && <>
          <h1 className='ml-2 mt-2 my-6'>Oops! You’ve missed it</h1>
          <div className='subtitle is-p-color'>Unfortunately this Jally has already taken place. Feel free to start or schedule a new one!</div>
          <button className='jally-button height-40 ml-2 px-3 has-text-weight-normal my-6' onClick={copyToClipboard}>
            Back to Lobby
          </button>
        </>
        }
        {showCountDown() && <>
          <div className='mt-3'>
            This session is scheduled for {moment(config.scheduledAt * 1000).format('MMMM Do, h:mm a')}.
          </div>
          <div className="column is-narrow">
            {exitButton()}
          </div>
        </>
        }
      </div>
      {showCountDown() &&
      <div className='has-text-centered'>
        <p> Starts in... </p>
        <Countdown
          date={new Date(config.scheduledAt * 1000)}
          renderer={countDownRenderer}
        />
      </div>
      }
      {allowedToJoin() &&
        <>
          <div className='loading-box pending has-text-centered mt-6'></div>
        </>
      }
    </>
  );
};

export default Session;