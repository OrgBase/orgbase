import React, {useState} from 'react';
import Modal from "../common/modal";
import SetupProfileForm from "./SetupProfileForm";

const Onboarding = ({ name, errorMessage }) => {
  const [profileModalState, setProfileModalState] = useState(true)

  const toggleProfileModal = () => setProfileModalState(!profileModalState)

  return (
    <>
      <div className="has-text-centered mt-6">
        {errorMessage && <p className="notification is-warning">
          {errorMessage}
        </p>}
        <div>
          <div className="mx-6">
            <p className='mt-3'>Hey {name}! There is no PlaySpace associated with this account.</p>

            <button
              className='button jally-button mt-3'
              onClick={toggleProfileModal}
            >
              Get Started!
            </button>

            <p className='mt-3'>Please contact us if you need further assistance.</p>
          </div>
        </div>
      </div>
      <Modal
        modalState={profileModalState}
        modalTitle='Set Up your Profile'
        closeModal={toggleProfileModal}
      >
        <SetupProfileForm
          name={name}
          toggleProfileModal={toggleProfileModal}
        />
      </Modal>
    </>
  );
};

export default Onboarding;