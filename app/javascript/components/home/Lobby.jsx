import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import VideoChat from "../video/VideoChat";

const Lobby = props => {
  return (
    <>
        <VideoChat {...props}/>
    </>
  );
};

Lobby.defaultProps = {
  name: 'user',
  errorMessage: ''
}

Lobby.propTypes = {
  name: PropTypes.string,
  errorMessage: PropTypes.string
}

export default Lobby;
