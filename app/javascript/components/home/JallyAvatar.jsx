import React, {useState} from 'react'
import Avatar from "react-avatar";
import SetupProfileForm from "./SetupProfileForm";
import Modal from "../common/modal";
import JallyVerticalLogo from '../../stylesheets/img/jally-vertical-logo.svg'
import InviteTeammatesForm from "./InviteTeammatesForm";

const JallyAvatar = ({ name, size, round, playspaceName, memberCount, inviteCode }) => {
  const [editProfileModalState, setEditProfileModalState] = useState(!name && !!playspaceName)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [addTeammatesModalState, setAddTeammatesModalState] = useState(false)

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)
  const toggleEditProfileModal = () => {
    setDropdownOpen(false)
    setEditProfileModalState(!editProfileModalState)
  }
  const toggleAddTeammatesModal = () => {
    setDropdownOpen(false)
    setAddTeammatesModalState(!addTeammatesModalState)
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
          color='#6361DB'
          fgColor='#FFFFFF'
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
          <div onClick={toggleAddTeammatesModal} className="dropdown-item">
            Add teammates
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

    <Modal
      modalState={addTeammatesModalState}
      modalTitle='Invite people to join this playspace'
      closeModal={toggleAddTeammatesModal}
    >
      <InviteTeammatesForm
        playspaceName={playspaceName}
        memberCount={memberCount}
        inviteCode={inviteCode}
      />
    </Modal>
  </>
}

export default JallyAvatar;