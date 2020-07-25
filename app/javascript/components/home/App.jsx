import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const App = props => (
  <div>Hello {props.name} - from react!!</div>
)

App.defaultProps = {
  name: 'user'
}

App.propTypes = {
  name: PropTypes.string
}

export default App;
