import React, {useState} from 'react';
import fetchWrapper from "../../helpers/fetchWrapper";

const JoinPlayspaceForm = ({domainPlayspaces, toggleCreatePlayspaceModal}) => {
  const [companyId, setCompanyId] = useState(domainPlayspaces.length && domainPlayspaces[0].company_id)
  const [formError, setFormError] = useState('')

  const createPlaySpace = (event) => {
    event.preventDefault();
    setFormError('')

    fetchWrapper('/company', 'POST', {
      company_id: companyId
    })
      .then(response => response.json())
      .then(data => {
        if(data.success) {
          window.location.href = "/lobby?notice=This is your playspace now. Happy Jally'ing! 🎉 "
        }
      })
      .catch(error => {
        setFormError(error.toString())
      })
  }

  const handlePlayspaceSelection = (event) => setCompanyId(event.target.value)

  const renderDomainPlayspaces = () => domainPlayspaces.map((dp, index) => <label key={dp.company_id} className="card mb-2">
      <input className='radio' type="radio" name="domainPlayspace" value={dp.company_id} defaultChecked={index === 0} />
      <span className="plan-details" aria-hidden="true">
        <span className="plan-type">{dp.playspace_name}</span>
      </span>
    </label>)

  return <>
    {formError && <div className="notification is-warning mt-5">
      {formError}
    </div>}
    <div className='my-4 mx-6 has-text-centered'>
      Your teammates are already on Jally! Please select an existing playspace to join
    </div>
    <form className='px-6' onSubmit={(e) => createPlaySpace(e)}>
      <div className='grid width-66' onChange={handlePlayspaceSelection.bind(this)}>
        {renderDomainPlayspaces()}
      </div>

      <div className="actions has-text-centered">
        <button
          className="button is-centered mt-4 mb-2 jally-button"
          type='submit'
        >Join Now!</button>
      </div>
      <div className='has-text-centered'>
        <span className='link' onClick={toggleCreatePlayspaceModal}>
          or create a new playspace
        </span>
      </div>
      <div className='mt-6 has-text-centered'>
        <strong>💡 What’s a Playspace?</strong>
        <br/>
        <div className='px-6 disclaimer-text'>
          Each company that uses Jally has a playspace of their own.
          &nbsp;It’s where all Jally sessions happen and you can only join by
          &nbsp;invitation or by having an approved email domain.
        </div>
      </div>
    </form>
  </>
}

export default JoinPlayspaceForm;