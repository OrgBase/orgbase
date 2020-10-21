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
        <h2 className='title'>Hello, {name}! 👋 </h2>
        <p className='mb-4 is-family-monospace subtitle'>Choose one of the options below to get started!</p>
        <div className='columns ml-2 mr-2'>
          <div className='column'>
            <div
              className={`card jally-card ${roomLoading && 'pending'}`}
              onClick={createAndRedirectToRoom}
            >
              <div className="card-header">
                <div className="card-header-title is-centered">
                  <span>Enter a game room.</span>
                </div>
              </div>
              <div className="card-content">
                A game room can accommodate upto 4 people including yourself! You'll get the link to invite
                others once you're in the room.
              </div>
            </div>
          </div>
          <div className='column'>
            <div
              className={`card jally-card ${sessionLoading && 'pending'}`}
              onClick={createAndRedirectToSession}
            >
              <div className="card-header">
                <div className="card-header-title is-centered">
                  <span>Start a Jally!</span>
                </div>
              </div>
              <div className="card-content">
                A Jally is a bonding session for multiple people to join. Users will be randomly paired up and added to
                separate game rooms as they join the session.
                You'll get the link to share the session in the next step.
              </div>
            </div>
          </div>
          <div className='column'>
            <div className="card jally-card">
              <div className="card-header">
                <div className="card-header-title is-centered">
                  <span>Schedule a Jally for later.</span>
                </div>
              </div>
              <div className="card-content">
                Use this option to schedule and configure a recurring or a one-time Jally
                for your team to participate in the future.
                You can also choose to send emails with calendar invites to all team members.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;