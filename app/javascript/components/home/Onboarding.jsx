import React, {useState} from 'react';
import Modal from "../common/modal";
import SetupProfileForm from "./SetupProfileForm";
import CreatePlayspaceForm from "./CreatePlayspaceForm";

const Onboarding = ({ name, errorMessage }) => {
  const [profileModalState, setProfileModalState] = useState(true)
  const [createPlayspaceModalState, setCreatePlayspaceModalState] = useState(false)

  const toggleProfileModal = () => setProfileModalState(!profileModalState)
  const toggleCreatePlayspaceModal = () => setCreatePlayspaceModalState(!createPlayspaceModalState)

  return (
    <>
      <div className="has-text-centered mt-6">
        {errorMessage && <p className="notification is-warning">
          {errorMessage}
        </p>}
        <div>
          <div className="mx-6">
            <p className='mt-3'>Hey {name}! There is no playspace associated with this account.</p>

            <button
              className='button jally-button mt-3'
              onClick={toggleProfileModal}
            >
              Get Started!
            </button>

            <p className='mt-3'>... or <a href="mailto:team@jally.co?subject=Onboarding Help"> contact us</a>
              &nbsp;at team@jally.co, if you need further assistance with onboarding your company.</p>
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
          nextStep={toggleCreatePlayspaceModal}
        />
      </Modal>

      <Modal
        modalState={createPlayspaceModalState}
        modalTitle='Create a Playspace'
        closeModal={toggleCreatePlayspaceModal}
      >
        <CreatePlayspaceForm
          toggleCreatePlayspaceModal={toggleCreatePlayspaceModal}
        />
      </Modal>
    </>
  );
};

export default Onboarding;