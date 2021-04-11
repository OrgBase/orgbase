import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import moment from 'moment';
import Modal from "../common/modal";
// import CreateJallyForm from "./CreateJallyForm";
import SelectGameForm from "../common/SelectGameForm";

const Lobby = ({ errorMessage, notice, users, upcomingSessions, activeSessions }) => {
  const [startModalState, setStartModalState] = useState(false)
  const [scheduleModalState, setScheduleModalState] = useState(false)

  const toggleStartModal = () => setStartModalState(!startModalState)
  const toggleScheduleModal = () => setScheduleModalState(!scheduleModalState)

  const formatTime = (timestamp) => (
    moment.unix(timestamp).format("ddd, Do MMM [at] h:mm a")
  )

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
            closeModal={toggleStartModal}
          />
        </div>
      </div>

      <Modal
        modalState={startModalState}
        closeModal={toggleStartModal}
        modalTitle='Select the first activity'
        className='jally-modal'
      >
        <SelectGameForm
          changeGame={false}
          closeModal={toggleStartModal}
        />
      </Modal>
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
