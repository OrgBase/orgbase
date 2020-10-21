import React, {useState, useEffect, createRef} from 'react';

const Session = ({ sessionSlug }) => {
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
      <span>Exit to Lobby</span>
    </button>
  )

  return (
    <div className="columns room is-mobile room-container">
      <div className="column has-text-centered">
        {urlCopier()}
      </div>
      <div className="column is-narrow">
        {exitButton()}
      </div>
    </div>
  );
};

export default Session;