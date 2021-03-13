import React, {useState} from 'react'
import Avatar from "react-avatar";
import SetupProfileForm from "./SetupProfileForm";
import Modal from "../common/modal";
import JallyVerticalLogo from '../../stylesheets/img/jally-vertical-logo.svg'
import InviteTeammatesForm from "./InviteTeammatesForm";

const MemberList = ({ members }) => {
  const [addTeammatesModalState, setAddTeammatesModalState] = useState(false)

  const toggleAddTeammatesModal = () => setAddTeammatesModalState(!addTeammatesModalState)

  const COLORS = ['#00D5E0', '#6c63ff', '#db61cf', '#ff7a41', '#04cc78', '#4ea1ff', '#9738d1', '#fc6c7f', '#FFE500'].sort( () => .5 - Math.random() );

  return <>
    { members.map((member, index) => (
      <div className="jally-member mb-3" key={member.value}>
        <Avatar
          name={member.label}
          color={COLORS[index % 9]}
          round={true}
          size={35}
          className="mr-2"
        />
        <strong>{ member.label }</strong>

      </div>
    ))}

    <div
      className="button jally-button"
      onClick={toggleAddTeammatesModal}
    > + Invite</div>


    <Modal
      modalState={addTeammatesModalState}
      modalTitle='Invite people to join this playspace'
      closeModal={toggleAddTeammatesModal}
    >
      <InviteTeammatesForm />
    </Modal>
  </>
}

export default MemberList;