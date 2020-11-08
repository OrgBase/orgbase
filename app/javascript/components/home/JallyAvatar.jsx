import React, {useState} from 'react'
import Avatar from "react-avatar";

const JallyAvatar = ({ name, size, round }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

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
          <a href="#" className="dropdown-item">
            Edit Profile
          </a>
          <a href="/logout" className="dropdown-item">
            Sign Out
          </a>
        </div>
      </div>}
    </div>
  </>
}

export default JallyAvatar;