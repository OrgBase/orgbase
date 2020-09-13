import React, {useState, useEffect, useContext, createRef, useCallback} from 'react';
import { connect, LocalDataTrack, createLocalTracks} from 'twilio-video';
import Participant from "../video/Participant";
import SidePanel from "../video/SidePanel";
import RoomContextProvider from "../../context/RoomContextProvider";

const Room = ({ roomName, token, roomSid, roomShared }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const dataTrack = new LocalDataTrack();
  const urlInputRef = createRef();

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

  const copyToClipboard = (e) => {
    e.preventDefault();
    urlInputRef.current.select();
    document.execCommand('copy');
  }

  const remoteParticipants = () => {
    if(participants.length) {
      return participants.map(participant => (
        <Participant key={participant.sid} participant={participant} />
      ));
    } else {
      return (
        <>
          <p>There's no one else here 👀. Share this url with a colleague so they can join you.</p>
          <input
            ref={urlInputRef}
            defaultValue={window.location.href.split('?')[0]}
            readOnly
          />
          {
            document.queryCommandSupported('copy') &&
            <div>
              <button onClick={copyToClipboard}>Copy</button>
            </div>
          }
        </>
      );
    }
  }

  return (
    <RoomContextProvider roomShared={roomShared}>
      <div className="room clearfix">
        <button className="leave-room-btn" onClick={() => {
          if(room) {
              room.localParticipant.tracks.forEach(function(trackPublication) {
              if (trackPublication.track.kind !== 'data') {
              trackPublication.track.stop();
              }
            });
            room.disconnect();
            window.open('/lobby', '_self')
          }
        }}>Leave Room</button>
        <div className="remote-participants">{remoteParticipants()}</div>
        <div className="shared-panel">
          {room ? (
            <SidePanel
              localParticipant={room.localParticipant}
              roomName={roomName}
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