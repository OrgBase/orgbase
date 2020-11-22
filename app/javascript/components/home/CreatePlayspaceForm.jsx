import React, {useState, useEffect} from 'react';
import fetchWrapper from "../../helpers/fetchWrapper";

const CreatePlayspaceForm = () => {
  const [playspaceName, setPlayspaceName] = useState('')
  const [companyUrl, setCompanyUrl] = useState('')
  const [formError, setFormError] = useState('')

  const createPlaySpace = (event) => {
    event.preventDefault();
    setFormError('')

    fetchWrapper('/company', 'POST', {
      playspace_name: playspaceName,
      website: companyUrl
    })
      .then(response => response.json())
      .then(data => {
        if(data.success) {
          window.location.href = "/lobby?notice=This is your playspace now. Happy Jally'ing! 🎉 "
        }
      })
      .catch(error => {
        setFormError('Something went wrong, sorry. Please refresh and try again.')
      })
  }
  return <>
    {formError && <div className="notification is-warning mt-5">
      {formError}
    </div>}
    <form className='px-6' onSubmit={(e) => createPlaySpace(e)}>
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
          type='submit'
        >Create!</button>
      </div>
    </form>
  </>
}

export default CreatePlayspaceForm;