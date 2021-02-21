import React from 'react';

import RoomContextProvider from "../../context/RoomContextProvider";
import RoomWrapper from "./RoomWrapper";

const Room = ({ roomName, token, roomSid, roomShared }) => {

  return (
    <RoomContextProvider roomShared={roomShared}>
      <RoomWrapper
        roomName={roomName}
        token={token}
        roomSid={roomSid}
        roomShared={roomShared}
      />
    </RoomContextProvider>
  );
};

export default Room;