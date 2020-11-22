import React, {useState} from 'react'
import Avatar from "react-avatar";
import SetupProfileForm from "./SetupProfileForm";
import Modal from "../common/modal";
import JallyVerticalLogo from '../../stylesheets/img/jally-vertical-logo.svg'

const JallyAvatar = ({ name, size, round, playspaceName }) => {
  const [editProfileModalState, setEditProfileModalState] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)
  const toggleEditProfileModal = () => {
    setDropdownOpen(false)
    setEditProfileModalState(!editProfileModalState)
  }

  return <>
    <div className="dropdown is-right is-active">
      <div
        className="dropdown-trigger"
        onClick={toggleDropdown}
      >
        <Avatar
          name={name}
          size={size}
          round={round}
          color='#FFFFFF'
          fgColor='#FF3E8F'
        />
      </div>
      {dropdownOpen && <div className="dropdown-menu jally-dropdown-menu" role="menu">
        <div className="dropdown-content">
          {playspaceName && <div className="dropdown-item playspace-name">
            <img src={JallyVerticalLogo} />
              <span>{playspaceName}</span>
          </div>}
          <div onClick={toggleEditProfileModal} className="dropdown-item">
            Edit Profile
          </div>
          <a href="/logout" className="dropdown-item">
            Sign Out
          </a>
        </div>
      </div>}
    </div>

    <Modal
      modalState={editProfileModalState}
      modalTitle='Edit your Profile'
      closeModal={toggleEditProfileModal}
    >
      <SetupProfileForm
        name={name}
        submitButtonText='Save'
        nextStep={toggleEditProfileModal}
      />
    </Modal>
  </>
}

export default JallyAvatar;