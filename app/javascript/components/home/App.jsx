import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import VideoChat from "../video-calls/VideoChat";

const App = props => {
  return (
      <div className="app">
        <header>
          <h1>This is Jally</h1>
        </header>
        <main>
          <VideoChat />
        </main>
      </div>
  );
};

App.defaultProps = {
  name: 'user'
}

App.propTypes = {
  name: PropTypes.string
}

export default App;
