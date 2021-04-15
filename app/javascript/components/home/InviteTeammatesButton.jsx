import React, {useState} from 'react'
import Modal from "../common/modal";
import InviteTeammatesForm from "./InviteTeammatesForm";

const InviteTeammatesButton = ({ buttonText, playspaceName, memberCount, inviteCode }) => {
  const [addTeammatesModalState, setAddTeammatesModalState] = useState(false)

  const toggleAddTeammatesModal = () => setAddTeammatesModalState(!addTeammatesModalState)

  return <>
    <div
      className="button jally-button-small is-inline"
      onClick={toggleAddTeammatesModal}
    > {buttonText}</div>
    <Modal
      modalState={addTeammatesModalState}
      modalTitle='Invite teammates to Jally'
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

export default InviteTeammatesButton;