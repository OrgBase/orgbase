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

  const handleExit = () => {
    if(room) {
      room.localParticipant.tracks.forEach(function(trackPublication) {
        if (trackPublication.track.kind !== 'data') {
          trackPublication.track.stop();
        }
      });
      room.disconnect();
    }
    window.open('/lobby', '_self');
  }

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
          <p className='mb-3 is-family-monospace'>There's no one else here 👀. Share this url with a colleague so they can join you.</p>
          <div className='columns is-centered'>
            <div className='column is-narrow'>
              <div className="field has-addons">
                <div className="control">
                  <input
                    className='input room-url'
                    ref={urlInputRef}
                    defaultValue={window.location.href.split('?')[0]}
                    readOnly
                  />
                </div>
                <div className="control">
                  <button className='button is-primary' onClick={copyToClipboard}>
                    <span className='icon'>
                      <i className="fas fa-copy"></i>
                    </span>
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <RoomContextProvider roomShared={roomShared}>
      <div className="columns room is-mobile room-container">
        <div className="column is-two-thirds remote-participants has-text-centered">{remoteParticipants()}</div>
        <div className="column">
          <div className="columns is-multiline">
            <div className="column is-full has-text-right">
              <button className="button is-primary leave-room-btn is-small" onClick={handleExit}>
                <span className='icon'>
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                <span>Exit Room</span>
              </button>
            </div>
            <div className="column is-full">
              <div className="shared-panel has-text-centered is-flex">
                {room ? (
                  <SidePanel
                    localParticipant={room.localParticipant}
                    roomName={roomName}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
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