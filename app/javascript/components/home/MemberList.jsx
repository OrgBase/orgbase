import React, {useState} from 'react'
import Avatar from "react-avatar";

const MemberList = ({ members }) => {

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
        { member.label }
      </div>
    ))}
  </>
}

export default MemberList;