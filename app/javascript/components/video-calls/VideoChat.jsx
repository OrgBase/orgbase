import React, { useState, useCallback } from 'react';
import Lobby from "./Lobby";
import Room from "./Room";

const VideoChat = ({ name }) => {
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  const [roomSid, setRoomSid] = useState(null);
  const [maxCapacity, setMaxCapacity] = useState(false);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(async event => {
    event.preventDefault();

    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content');

    const data = await fetch('/video/room', {
      method: 'POST',
      body: JSON.stringify({
        room: roomName,
        capacity: 2
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      }
    }).then(res => res.json());
    console.log(data);
    setMaxCapacity(data.max_capacity);
    setToken(data.token);
    setRoomSid(data.room_sid)
  }, [roomName]);

  const handleExit = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} room_sid={roomSid} handleExit={handleExit} />
    );
  } else {
    render = (
      <>
        {maxCapacity && <p className="alert alert-error">
          Uh oh! That room is full. Please enter a different name
          below to join or create a new one.
        </p>
        }
        <Lobby
          name={name}
          roomName={roomName}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />
      </>
    );
  }

  return render;
};

export default VideoChat;