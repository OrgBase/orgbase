import React, {useState} from 'react';

const VideoChat = ({ name, errorMessage }) => {
  const [roomLoading, setRoomLoading] = useState(false)
  const [sessionLoading, setSessionLoading] = useState(false)
  const createAndRedirectToRoom = () => {
    setRoomLoading(true);
    window.open('/room/new', '_self')
  }

  const createAndRedirectToSession = () => {
    setSessionLoading(true);
    window.open('/session/new', '_self')
  }

  return (
    <div className="has-text-centered mt-6">
      {errorMessage && <p className="notification is-warning">
        {errorMessage}
      </p>}
      <div>
        <div className='columns is-centered ml-2 mr-2 '>
          <div className='column is-narrow'>
            <div
              className={`jally-card start-card ${sessionLoading && 'pending'}`}
              onClick={createAndRedirectToSession}
            >
              <div className="card-content">
                <div className='jally-card-header mb-2'>START</div>
                <div className='jally-card-text'>a Jally now</div>
              </div>
            </div>
          </div>
          <div className='column is-narrow'>
            <div className="jally-card schedule-card">
              <div className="card-content">
                <div className='jally-card-header mb-2'>SCHEDULE</div>
                <div className='jally-card-text'>a Jally for later</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;