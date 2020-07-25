import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const App = props => (
  <div>Hello {props.name}!</div>
)

Hello.defaultProps = {
  name: 'user'
}

Hello.propTypes = {
  name: PropTypes.string
}
