import React, {useState, useEffect} from 'react';
import fetchWrapper from "../../helpers/fetchWrapper";
import AutoCompleteSelect from "../common/AutoCompleteSelect";

const CreatePlayspaceForm = () => {
  const [playspaceName, setPlayspaceName] = useState('')
  const [companyUrl, setCompanyUrl] = useState('')
  const [formError, setFormError] = useState('')
  const [invitees, setInvitees] = useState([])
  const [loading, setLoading] = useState(false)

  const createPlaySpace = (event) => {
    event.preventDefault();
    setFormError('')
    setLoading(true)

    fetchWrapper('/company', 'POST', {
      playspace_name: playspaceName,
      website: companyUrl,
      invitees: invitees,
    })
      .then(response => response.json())
      .then(data => {
        if(data.success) {
          window.location.href = "/lobby?notice=Welcome to your Jally playspace! This is where you’ll create, join and participate in fun Jally sessions with your colleagues. Why not schedule in a Jally session for you and some colleagues now?"
        }
      })
      .catch(error => {
        setLoading(false)
        setFormError('Something went wrong, sorry. Please refresh and try again.')
      })
  }
  return <>
    {formError && <div className="notification is-warning mt-5">
      {formError}
    </div>}
    <form className={`px-6 ${loading ? 'pending' : ''}`} onSubmit={(e) => createPlaySpace(e)}>
      <div className="field">
        <label className="label jally-label dark-grey-text">
          What’s the name of your company or team?
        </label>
        <input
          className="input"
          name='playspaceName'
          required={true}
          autoFocus={true}
          placeholder='e.g. Stark Industries or Stark Industries Sales Team'
          onChange={(e) => setPlayspaceName(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="label jally-label dark-grey-text">
          Which teammates do you want to try out Jally with?
        </label>
        <AutoCompleteSelect
          users={[]}
          updateSelection={setInvitees}
          placeholder='enter email and press tab or return key'
        />
      </div>
      <div className="field">
        <label className="label jally-label dark-grey-text">
          Company URL
        </label>
        <input
          className="input"
          name='companyUrl'
          placeholder='e.g. https://www.marvel.com/'
          onChange={(e) => setCompanyUrl(e.target.value)}
        />
      </div>
      <div className="actions has-text-centered">
        <button
          className="button is-centered mb-3 jally-button"
          disabled={loading}
          type='submit'
        >Create!</button>
      </div>
    </form>
  </>
}

export default CreatePlayspaceForm;