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
  errorMessage: '',
  notice: ''
}

Lobby.propTypes = {
  errorMessage: PropTypes.string,
  notice: PropTypes.string
}

export default Lobby;
