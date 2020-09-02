import React, { useState, useCallback } from 'react';
import Lobby from "./Lobby";
import Room from "./Room";

const VideoChat = ({ name }) => {
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(async event => {
    event.preventDefault();

    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    const data = await fetch('/video/token', {
      method: 'POST',
      body: JSON.stringify({
        room: roomName
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      }
    }).then(res => res.json());
    setToken(data.token);
  }, [roomName]);

  const handleExit = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleExit={handleExit} />
    );
  } else {
    render = (
      <Lobby
        name={name}
        roomName={roomName}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }

  return render;
};

export default VideoChat;