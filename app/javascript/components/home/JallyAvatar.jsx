import React from 'react'
import Avatar from "react-avatar";

const JallyAvatar = ({ name, size, round }) => {
  return <Avatar
    name={name}
    size={size}
    round={round}
    color='#FFFFFF'
    fgColor='#FF3E8F'
  />
}

export default JallyAvatar;