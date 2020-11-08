import React, {useState} from 'react';
import Modal from "../common/modal";

const VideoChat = ({ name, errorMessage }) => {
  const [sessionLoading, setSessionLoading] = useState(false)
  const [startModalState, setStartModalState] = useState(false)
  const [scheduleModalState, setScheduleModalState] = useState(false)

  const createAndRedirectToSession = () => {
    setSessionLoading(true);
    window.open('/session/new', '_self')
  }

  const toggleStartModal = () => setStartModalState(!startModalState)
  const toggleScheduleModal = () => setScheduleModalState(!scheduleModalState)

  return (
    <>
      <div className="has-text-centered mt-6">
        {errorMessage && <p className="notification is-warning">
          {errorMessage}
        </p>}
        <div>
          <div className='columns is-centered ml-2 mr-2 '>
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
        <p>form goes here</p>
      </Modal>
      <Modal
        modalState={startModalState}
        closeModal={toggleStartModal}
        modalTitle='Start a Jally'
        className='jally-modal'
      >
        <p>form goes here</p>
      </Modal>
    </>
  );
};

export default VideoChat;