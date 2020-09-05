import React, {useState, useEffect, useContext} from 'react';
import { connect, LocalDataTrack, createLocalTracks} from 'twilio-video';
import Participant from "./Participant";
import SidePanel from "./SidePanel";
import RoomContextProvider from "../../context/RoomContextProvider";

const Room = ({ roomName, token, roomSid, handleExit, roomShared }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const dataTrack = new LocalDataTrack();

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };
    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };
    async function setUpTracksAndConnectToRoom() {
      try {
        const audioAndVideoTracks = await createLocalTracks();
        connect(token, {
          sid: roomSid,
          tracks: audioAndVideoTracks.concat(dataTrack)
        }).then(room => {
          setRoom(room);
          room.on('participantConnected', participantConnected);
          room.on('participantDisconnected', participantDisconnected);
          room.participants.forEach(participantConnected);
        });
      } catch (e) {
        console.error(e);
      }
    }

    setUpTracksAndConnectToRoom();

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
    <RoomContextProvider roomShared={roomShared}>
      <div className="room clearfix">
        <h2>Room: {roomName}</h2>
        <button className="leave-room-btn" onClick={() => {
          if(room) {
              room.localParticipant.tracks.forEach(function(trackPublication) {
              if (trackPublication.track.kind !== 'data') {
              trackPublication.track.stop();
              }
            });
            room.disconnect();
          }
          handleExit()
        }}>Leave Room</button>
        <div className="remote-participants">{remoteParticipants}</div>
        <div className="shared-panel">
          {room ? (
            <SidePanel
              localParticipant={room.localParticipant}
            />
          ) : (
            ''
          )}
        </div>
        <div className="local-participant">
          {room ? (
            <Participant key={room.localParticipant.sid} participant={room.localParticipant} />
          ) : (
            ''
          )}
        </div>
      </div>
    </RoomContextProvider>
  );
};

export default Room;