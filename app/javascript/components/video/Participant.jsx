import React, {useState, useEffect, useRef, useContext} from 'react';
import {RoomContext} from "../../context/context";
import fetchWrapper from "../../helpers/fetchWrapper";

const Participant = ({ participant, numRemoteParticipants }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [dataTracks, setDataTracks] = useState([]);
  const [roomParticipant, setRoomParticipant] = useState({})
  const { gameSlug, roomParticipants, activeParticipant, updateRoomDetails } = useContext(RoomContext);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  useEffect(() => {
    fetchWrapper(`/room_participant/${participant.identity}`)
      .then(response => response.json())
      .then(data => {
        setRoomParticipant(data)
      });
  }, [participant])

  useEffect(() => {
    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      } else if (track.kind === 'audio') {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      } else if (track.kind === 'data') {
        setDataTracks(dataTracks => [...dataTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
      } else if (track.kind === 'audio') {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      } else if (track.kind === 'data') {
        setDataTracks(dataTracks => dataTracks.filter(d => d !== track));
      }
    };

    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));
    setDataTracks(trackpubsToTracks(participant.dataTracks));

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      setDataTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      const v = videoTrack.attach(videoRef.current);
      v.style.transform = 'scale(-1, 1)';
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  useEffect(() => {
    const dataTrack = dataTracks[0];
    if (dataTrack) {
      dataTrack.on('message', (data) =>{
        const { gameSlug, randomFraction, roomParticipants, activeParticipant, pictionaryData, scoreBoard } = JSON.parse(data);
        updateRoomDetails({
          gameSlug,
          randomFraction,
          roomParticipants,
          activeParticipant,
          pictionaryData,
          scoreBoard
        })
      });
    }
  }, [dataTracks]);

  const getColor = () => {
    const index = roomParticipants.findIndex(p => p.identity == (participant && participant.identity))
    if(index > -1) {
      return roomParticipants[index].color
    }
  }

  const isIceBreaker = () => ['wyr', 'ddtq'].indexOf(gameSlug) > -1

  const getScore = () => {
    const index = roomParticipants.findIndex(p => p.identity == (participant && participant.identity))
    if(index > -1) {
      return roomParticipants[index].score
    }
  }
  const getBorder = () => {
    let style = {}
    if(!isIceBreaker() && ((participant && participant.identity) == activeParticipant.identity)) {
      style = {
        border: `4px solid ${getColor()}`
      }
    }
    return style
  }

  const renderScore = () => {
    return !isIceBreaker() && <span className="score" style={{
      backgroundColor: getColor(),
      zIndex: '999'
    }}>{getScore() || 0}</span>
  }

  return (
    <div className={`participant ${numRemoteParticipants > 1 ? 'participant-3' : ''}`}>
      <span className="name" style={{
        backgroundColor: getColor(),
        zIndex: '999'
      }}>{roomParticipant.firstName}</span>
      {renderScore()}
      <video ref={videoRef} autoPlay={true} style={getBorder()}/>
      <audio ref={audioRef} autoPlay={true} />
    </div>
  );
};

export default Participant;