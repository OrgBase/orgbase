import React, {useState, useEffect, useContext, createRef} from 'react';
import { connect, LocalDataTrack, createLocalTracks} from 'twilio-video';
import Participant from "../video/Participant";
import SidePanel from "../video/SidePanel";
import jallyLogo from '../../stylesheets/img/jally-logo-main.svg';
import muteLogo from '../../stylesheets/img/mute.svg';
import stopVideoLogo from '../../stylesheets/img/stop-video.svg';
import unmuteLogo from '../../stylesheets/img/unmute.svg';
import startVideoLogo from '../../stylesheets/img/start-video.svg';
import gameChangeLogo from "../../stylesheets/img/activities.svg";
import SelectGameForm from "../common/SelectGameForm";
import Modal from "../common/modal";
import fetchWrapper from "../../helpers/fetchWrapper";
import {RoomContext} from "../../context/context";
// import cameraImage from '../../stylesheets/img/camera-button.svg';
// import videoFilter from '../../stylesheets/img/video-filter.svg';

const RoomWrapper = ({ roomName, token, roomSid, sessionSlug, roomShared }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [changeGameModalState, setChangeGameModalState] = useState(false)
  const [mute, setMute] = useState(false)
  const [stopVideo, setStopVideo] = useState(false)
  const dataTrack = new LocalDataTrack();
  const {gameSlug, randomFraction, activeParticipant, roomParticipants, pictionaryData, updateRoomDetails} = useContext(RoomContext);
  const [inviteText, setInviteText] = useState('Copy invite link')

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
        <div key={participant.sid} className='column is-relative is-narrow'>
          <Participant participant={participant} numRemoteParticipants={participants.length}/>
        </div>
      ));
    }
  }

  const renderLocalParticipant = () => <div className='column is-relative is-narrow'>
    {room ? (
      <Participant key={room.localParticipant.sid} participant={room.localParticipant} numRemoteParticipants={participants.length}/>
    ) : (
      ''
    )}
  </div>

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

  const toggleChangeGameModal = () => setChangeGameModalState(!changeGameModalState)

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  const syncGameData = (slug=gameSlug, fraction=randomFraction,
                        participants=roomParticipants, activeP=activeParticipant, pictinaryD= pictionaryData) => {
    const dataTrack = trackpubsToTracks(room.localParticipant.dataTracks)[0];
    dataTrack.send(JSON.stringify({
      gameSlug: slug,
      randomFraction: fraction,
      roomParticipants: participants,
      activeParticipant: activeP,
      pictionaryData: pictinaryD
    }));

    if (!(slug === gameSlug && fraction === randomFraction && (activeP.identity === activeParticipant.identity))) {
      fetchWrapper(`/room/${roomName}/panel-update`, 'POST',
        {
          game_slug: slug,
          random_fraction: fraction,
          employee_id: activeP && activeP.identity
        });
    }

    updateRoomDetails({
      gameSlug: slug,
      randomFraction: fraction,
      roomParticipants: participants,
      activeParticipant: activeP,
      pictionaryData: pictinaryD
    });
  }

  const toggleAudio = () => {
    if(mute) {
      room.localParticipant.audioTracks.forEach(track => {
        track.track.enable();
      });
    } else {
      room.localParticipant.audioTracks.forEach(track => {
        track.track.disable();
      });
    }

    setMute(!mute)
  }

  const toggleVideo = () => {
    if(stopVideo) {
      room.localParticipant.videoTracks.forEach(track => {
        track.track.enable();
      });
    } else {
      room.localParticipant.videoTracks.forEach(track => {
        track.track.disable();
      });
    }

    setStopVideo(!stopVideo)
  }

  const copyInviteLink = (e) => {
    let tempInput = document.createElement("input")
    tempInput.style = "position: absolute; left: -1000px; top: -1000px"
    tempInput.value = `jally.co/session/${sessionSlug}`
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand("copy")
    document.body.removeChild(tempInput)

    setInviteText('Invite link copied')
    setTimeout(() => {
      setInviteText('Copy invite link')
    }, 5000)
  }


  return (
    <>
      <div className="columns room is-mobile room-container is-gapless is-desktop is-vcentered">
        <div className="column is-half remote-participants has-text-centered">
          <div className='columns is-multiline is-centered'>
            {remoteParticipants()}
            {renderLocalParticipant()}
          </div>
        </div>
        <div className="column is-half side-panel">
          <div className="columns is-gapless is-multiline full-room-height">
            <div className='column position-relative'>
              <div className={`shared-panel has-text-centered is-flex`}>
                {room ? (
                  <SidePanel
                    localParticipant={room.localParticipant}
                    roomName={roomName}
                    syncGameData={syncGameData}
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
        <div className="room-footer has-text-centered">
          <div className="jally-logo-md ml-3">
            <img src={jallyLogo} />
          </div>

          <div
            className="invite-participants ml-6 has-tooltip-top has-tooltip-multiline button jally-button-small"
            data-tooltip="Jally rooms hold up to 10 people. If more than 10 people click the link, they’ll be added to a new room"
            onClick={copyInviteLink}
          >
            <span className='mx-1'><i className="fas fa-link" aria-hidden="true"></i></span>
            {inviteText}
          </div>

          <div className='footer-actions-container'>
            <img
              src={mute ? unmuteLogo : muteLogo}
              className="pr-2"
              onClick={toggleAudio}
            />
            <img
              src={stopVideo ? startVideoLogo : stopVideoLogo}
              className="pr-2"
              onClick={toggleVideo}
            />
            <img
              src={gameChangeLogo}
              onClick={toggleChangeGameModal}
            />
          </div>

          <button
            className='jally-button-small exit-button'
            onClick={handleExit}
          >
            Exit
          </button>
        </div>
      </div>

      <Modal
        modalState={changeGameModalState}
        closeModal={toggleChangeGameModal}
        modalTitle='Select the next activity'
        className="jally-modal full-width-modal xyz"
        modalClass="full-width-modal"
      >
        <SelectGameForm
          changeGame={true}
          syncGameData={syncGameData}
          closeModal={toggleChangeGameModal}
          roomName={roomName}
        />
      </Modal>
    </>
  );
};

export default RoomWrapper;