import React, {useState} from "react";
import {RoomContext} from "./context";

const RoomContextProvider = ({ roomShared, children }) => {
  const [value, setValue] = useState(roomShared);

  const updateRoomDetails = (newVal) => {
    setValue({
      ...value,
      ...newVal,
    });
  };

  return (
    <RoomContext.Provider value={{ ...value, updateRoomDetails }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;