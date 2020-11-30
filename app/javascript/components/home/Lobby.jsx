import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Modal from "../common/modal";
import CreateJallyForm from "./CreateJallyForm";

const Lobby = ({ errorMessage, notice, users }) => {
  const [startModalState, setStartModalState] = useState(false)
  const [scheduleModalState, setScheduleModalState] = useState(false)

  const toggleStartModal = () => setStartModalState(!startModalState)
  const toggleScheduleModal = () => setScheduleModalState(!scheduleModalState)

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
          <div className='columns is-centered ml-2 mr-2'>
            <div className='column is-narrow'>
              <div
                className='jally-card start-card'
                onClick={toggleStartModal}
              >
                <div className="card-content">
                  <div className='jally-card-header mb-2'>START</div>
                  <div className='jally-card-text'>a Jally now</div>
                </div>
              </div>
            </div>
            <div className='column is-narrow'>
              <div
                className="jally-card schedule-card"
                onClick={toggleScheduleModal}
              >
                <div className="card-content">
                  <div className='jally-card-header mb-2'>SCHEDULE</div>
                  <div className='jally-card-text'>a Jally for later</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        modalState={scheduleModalState}
        modalTitle='Schedule a Jally'
        closeModal={toggleScheduleModal}
      >
        <CreateJallyForm
          isImpromptu={false}
          users={users}
        />
      </Modal>
      <Modal
        modalState={startModalState}
        closeModal={toggleStartModal}
        modalTitle='Start a Jally'
        className='jally-modal'
      >
        <CreateJallyForm
          isImpromptu={true}
          users={users}
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
