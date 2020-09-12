import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import VideoChat from "../video-calls/VideoChat";

const Lobby = props => {
  return (
    <>
      <main>
        <VideoChat name={props.name}/>
      </main>
    </>
  );
};

Lobby.defaultProps = {
  name: 'user'
}

Lobby.propTypes = {
  name: PropTypes.string
}

export default Lobby;
