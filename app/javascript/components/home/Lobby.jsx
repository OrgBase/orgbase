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

  const renderActiveJallies = (activeSessions) => {
    if (activeSessions && activeSessions.length) {
      return <div className='mt-3 mb-6 is-p-color'>
        {activeSessions.map(session => (
          <div key={session.slug} className='mt-3'>
            {session.recurring && <span className="icon">
              <i className="fas fa-recycle is-text-primary"></i>
            </span>}
            <span>{session.name}</span>
            <a className='jally-button px-2 ml-2 has-text-weight-normal' href={`/session/${session.slug}`}>
              Join Now
            </a>
          </div>
        ))}
      </div>
    } else {
      return <div className='mt-3 mb-6'>
        <p>There are no active jallys on your playspace now.</p>
      </div>
    }
  }


  const renderUpcomingJallies = (upcomingSessions) => {

    if (upcomingSessions && upcomingSessions.length) {
      return <div className='mt-3 mb-6 is-p-color'>
        {upcomingSessions.map(session => (
          <div key={session.slug} className='mt-3'>
            {session.recurring && <span className="icon">
              <i className="fas fa-recycle is-text-primary"></i>
            </span>}
            <span>{formatTime(session.scheduledAt)}</span>
            <span>{` - ${session.name}`}</span>
          </div>
        ))}
      </div>
    } else {
      return <div className='mt-3 mb-6'>
        <p>There are no scheduled jallys on your playspace.</p>
      </div>
    }
  }

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
          <div className='sessions-list my-4'>
            <h2>Active Jallys</h2>
            {renderActiveJallies(activeSessions)}
          </div>
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
            {/*<div className='column is-narrow'>*/}
            {/*  <div*/}
            {/*    className="jally-card schedule-card"*/}
            {/*    onClick={toggleScheduleModal}*/}
            {/*  >*/}
            {/*    <div className="card-content">*/}
            {/*      <div className='jally-card-header mb-2'>SCHEDULE</div>*/}
            {/*      <div className='jally-card-text'>a Jally for later</div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
          <div className='sessions-list mt-6 mb-4'>
            <h2>Upcoming Jallys</h2>
            {renderUpcomingJallies(upcomingSessions)}
          </div>
        </div>
      </div>
      {/*<Modal*/}
      {/*  modalState={scheduleModalState}*/}
      {/*  modalTitle='Schedule a Jally'*/}
      {/*  closeModal={toggleScheduleModal}*/}
      {/*>*/}
      {/*  <CreateJallyForm*/}
      {/*    isImpromptu={false}*/}
      {/*    users={users}*/}
      {/*  />*/}
      {/*</Modal>*/}
      {/*<Modal*/}
      {/*  modalState={startModalState}*/}
      {/*  closeModal={toggleStartModal}*/}
      {/*  modalTitle='Start a Jally'*/}
      {/*  className='jally-modal'*/}
      {/*>*/}
      {/*  <CreateJallyForm*/}
      {/*    isImpromptu={true}*/}
      {/*    users={users}*/}
      {/*  />*/}
      {/*</Modal>*/}
      <Modal
        modalState={startModalState}
        closeModal={toggleStartModal}
        modalTitle='Select the next activity'
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
