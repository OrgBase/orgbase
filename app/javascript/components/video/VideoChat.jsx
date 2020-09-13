import React, {useState} from 'react';

const VideoChat = ({ name, errorMessage }) => {
  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    setLoading(true);
    window.open('/room/new', '_self')
  }
  return (
    <>
      {errorMessage && <p className="alert alert-error">
        {errorMessage}
      </p>}
      <div className="video-chat-container">
        <h2>Hello, {name} </h2>
        <p>Create a room using the button below and invite a friend to it!</p>
        <button
          className="create-room"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? "Buckle up! Your room is being set up." : "Create a room"}
        </button>
      </div>
    </>
  );
};

export default VideoChat;