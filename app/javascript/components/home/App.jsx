import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import VideoChat from "../video-calls/VideoChat";

const App = props => {
  return (
      <div className="app">
        <header>
          <h1>Jally</h1>
        </header>

        <main>
          <VideoChat name={props.name}/>
        </main>
        <footer>
          <p>
            Made with ❤️ by <a href="https://jally.co">Team Jally.</a>
          </p>
        </footer>
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
