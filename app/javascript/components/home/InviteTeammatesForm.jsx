import React, {useState, useEffect} from 'react';
import fetchWrapper from "../../helpers/fetchWrapper";
import AutoCompleteSelect from "../common/AutoCompleteSelect";

const InviteTeammatesForm = ({playspaceName, memberCount}) => {
  const [formError, setFormError] = useState('')
  const [invitees, setInvitees] = useState([])
  const [loading, setLoading] = useState(false)

  const inviteTeammates = (event) => {
    event.preventDefault();
    setFormError('')
    setLoading(true)

    fetchWrapper('/invite', 'POST', {
      invitees: invitees,
    })
      .then(response => response.json())
      .then(data => {
        if(data.success) {
          window.location.href = "/lobby?notice=The invites are on their way! 🎉 "
        }
      })
      .catch(error => {
        setLoading(false)
        setFormError(error.toString())
      })
  }
  return <>
    {formError && <div className="notification is-warning mt-5">
      {formError}
    </div>}
    <form className={`px-6 ${loading ? 'pending' : ''}`} onSubmit={(e) => inviteTeammates(e)}>
      <div className="field mb-4">
        {playspaceName && memberCount && <label className="label jally-label dark-grey-text">
          {`${playspaceName}'s Playspace · ${memberCount} Members`}
        </label>}
        <AutoCompleteSelect
          users={[]}
          updateSelection={setInvitees}
          placeholder='enter work email and press tab or return key'
        />
      </div>
      <div className="actions has-text-centered">
        <button
          className="button is-centered mb-3 jally-button"
          disabled={loading}
          type='submit'
        >Invite!</button>
      </div>
    </form>
  </>
}

export default InviteTeammatesForm;