import React, { createRef} from 'react';
import moment from 'moment';
import Countdown from 'react-countdown';


const Session = ({ sessionSlug, config }) => {
  const urlInputRef = createRef();

  const handleExit = () => {
    window.open('/lobby', '_self');
  }

  const copyToClipboard = (e) => {
    e.preventDefault();
    urlInputRef.current.select();
    document.execCommand('copy');
  }

  const urlCopier = () => {
    return (
      <>
        <p className='mb-3 is-family-monospace'>
        You'll be matched randomly with one of your colleagues as they join this Jally session!
        Feel free to share this url with your team to invite them directly.
        </p>
        <div className='columns is-centered'>
          <div className='column is-narrow'>
            <div className="field has-addons">
              <div className="control">
                <input
                  className='input room-url'
                  ref={urlInputRef}
                  defaultValue={window.location.href.split('?')[0]}
                  readOnly
                />
              </div>
              <div className="control">
                <button className='button is-primary' onClick={copyToClipboard}>
                      <span className='icon'>
                        <i className="fas fa-copy"></i>
                      </span>
                  <span>Copy</span>
                </button>
              </div>
            </div>
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

  const allowedToJoin = () => {
    const now = Math.floor(new Date().getTime()/1000);

    return now >= config.scheduledAt && now <= config.scheduledAt + config.cutOffSeconds;
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
      <div className="columns room is-mobile room-container is-centered">
        {allowedToJoin() &&
        <div className="column has-text-centered">
          {urlCopier()}
        </div>
        }
        {sessionIsClosed() &&
        <p className='ml-2 mt-2'>Uh oh! This jally session is currently not accepting new participants. <br />
          Please head to Lobby to create a new room or start a new Session.</p>
        }
        {showCountDown() &&
        <div className='mt-3'>
          This session will scheduled for {moment(config.scheduledAt).format('MMMM Do, h:mm a')}.
        </div>
        }
        {!allowedToJoin() &&
        <div className="column is-narrow">
          {exitButton()}
        </div>
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
    </>
  );
};

export default Session;