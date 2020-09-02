import React from 'react';

const Lobby = ({
                 name,
                 roomName,
                 handleRoomNameChange,
                 handleSubmit
               }) => {
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div>
        <h2>Hello, {name}! Enter a room.</h2>
        <label htmlFor="room">Room Name:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>
      <button type="submit">Join</button>
    </form>
  );
};

export default Lobby;