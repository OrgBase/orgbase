import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from "./Participant";
import SidePanel from "./SidePanel";

const Room = ({ roomName, token, roomSid, handleExit }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };
    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };
    Video.connect(token, {
      sid: roomSid
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="room clearfix">
      <h2>Room: {roomName}</h2>
      <button className="leave-room-btn" onClick={() => {
        if(room) {
            room.localParticipant.tracks.forEach(function(trackPublication) {
            trackPublication.track.stop();
          });
          room.disconnect();
        }
        handleExit()
      }}>Leave Room</button>
      <div className="remote-participants">{remoteParticipants}</div>
      <div className="shared-panel">
        <SidePanel />
      </div>
      <div className="local-participant">
        {room ? (
          <Participant key={room.localParticipant.sid} participant={room.localParticipant} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Room;