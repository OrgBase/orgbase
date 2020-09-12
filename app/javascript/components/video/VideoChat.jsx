import React from 'react';

const VideoChat = ({ name, error }) => {
  const handleClick = () => {
    window.open('/room/new', '_self')
  }
  return (
    <>
      {error && <p className="alert alert-error">
        {error}
      </p>}
      <div className="video-chat-container">
        <h2>Hello, {name} </h2>
        <p>Create a room using the button below and invite a friend to it!</p>
        <button className="create-room" onClick={handleClick}>
          Create a room
        </button>
      </div>
    </>
  );
};

export default VideoChat;