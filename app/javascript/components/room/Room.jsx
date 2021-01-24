import React, {useState, useEffect, useContext, createRef, useCallback} from 'react';
import { connect, LocalDataTrack, createLocalTracks} from 'twilio-video';
import Participant from "../video/Participant";
import SidePanel from "../video/SidePanel";
import RoomContextProvider from "../../context/RoomContextProvider";
// import cameraImage from '../../stylesheets/img/camera-button.svg';
// import videoFilter from '../../stylesheets/img/video-filter.svg';

const Room = ({ roomName, token, roomSid, roomShared }) => {
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

  const remoteParticipants = () => {
    if(participants.length) {
      return participants.map(participant => (
        <div key={participant.sid} className='column is-half is-relative'>
          <Participant participant={participant} />
        </div>
      ));
    }
  }

  const renderLocalParticipant = () => <div className='column is-half is-relative'>
    {room ? (
      <Participant key={room.localParticipant.sid} participant={room.localParticipant} />
    ) : (
      ''
    )}
  </div>

  return (
    <RoomContextProvider roomShared={roomShared}>
      <div className="columns room is-mobile room-container is-gapless is-desktop is-vcentered">
        <div className="column is-half remote-participants has-text-centered">
          <div className='columns is-multiline'>
            {remoteParticipants()}
            {renderLocalParticipant()}
          </div>
        </div>
        <div className="column is-half">
          <div className="columns is-gapless is-multiline full-room-height">
            <div className='column position-relative'>
              <div className={`shared-panel has-text-centered is-flex`}>
                {room ? (
                  <SidePanel
                    room={room}
                    localParticipant={room.localParticipant}
                    roomName={roomName}
                    participantIdentifiers = {[
                      room.localParticipant.identity,
                        ...participants.map((p) => p.identity)
                    ]}

                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
        {/*<div className='column has-text-centered'>*/}
        {/*  <button className="button is-primary leave-room-btn is-small my-3" onClick={handleExit}>*/}
        {/*    <span className='icon'>*/}
        {/*      <i className="fas fa-sign-out-alt"></i>*/}
        {/*    </span>*/}
        {/*    <span>Exit Session</span>*/}
        {/*  </button>*/}
        {/*  <div className='my-6'>*/}
        {/*    <div>*/}
        {/*      <img src={videoFilter} width='80px' />*/}
        {/*    </div>*/}
        {/*    <div className="field ml-2">*/}
        {/*      <input id="switchRoundedDefault" type="checkbox" name="switchRoundedDefault"*/}
        {/*             className="switch is-rounded"*/}
        {/*             onChange={(e) => console.log(`Filter: ${e.target.checked}`)}*/}
        {/*      />*/}
        {/*      <label htmlFor="switchRoundedDefault"></label>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <div className='is-clickable my-3'>*/}
        {/*    <img src={cameraImage}/>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </RoomContextProvider>
  );
};

export default Room;