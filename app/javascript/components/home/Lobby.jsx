import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SelectGameForm from "../common/SelectGameForm";

const Lobby = ({ errorMessage, notice }) => {

  return (
    <>
      <div className="has-text-centered mt-6">
        {errorMessage && <p className="notification is-warning mx-6">
          {errorMessage}
        </p>}
        {notice && <p className="notification is-success mx-6">
          {notice}
        </p>}
        <div>
          <SelectGameForm
            changeGame={false}
            closeModal={()=> {}}
          />
        </div>
      </div>
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
