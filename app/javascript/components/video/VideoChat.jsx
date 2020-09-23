import React, {useState} from 'react';

const VideoChat = ({ name, errorMessage }) => {
  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    setLoading(true);
    window.open('/room/new', '_self')
  }
  return (
    <div className="has-text-centered mt-6">
      {errorMessage && <p className="notification is-warning">
        {errorMessage}
      </p>}
      <div>
        <h2 className='title'>Hello, {name}! 👋 </h2>
        <p className='mb-3 is-family-monospace'>Build a room using the button below and invite a friend to it!</p>
        <button
          className="create-room button is-primary"
          onClick={handleClick}
          disabled={loading}
        >
          <span className='icon'>
            <i className="fas fa-person-booth"></i>
          </span>
          <span>
            {loading ? "Buckle up! Your room is being set up." : "Build and Enter!"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default VideoChat;