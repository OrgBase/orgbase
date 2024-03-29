import React, {useState} from 'react';
import fetchWrapper from "../../helpers/fetchWrapper";

const JoinPlayspaceForm = ({domainPlayspaces, toggleCreatePlayspaceModal}) => {
  const [companyId, setCompanyId] = useState(domainPlayspaces.length && domainPlayspaces[0].company_id)
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  const createPlaySpace = (event) => {
    event.preventDefault();
    setFormError('');
    setLoading(true);

    fetchWrapper('/company', 'POST', {
      company_id: companyId
    })
      .then(response => response.json())
      .then(data => {
        if(data.success) {
          window.location.href = "/lobby?notice=Welcome to your Jally playspace! This is where you’ll create, join and participate in fun Jally sessions with your colleagues. Why not schedule in a Jally session for you and some colleagues now?"
        }
      })
      .catch(error => {
        setLoading(false)
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
    <form className={`px-6 ${loading ? 'pending' : ''}`} onSubmit={(e) => createPlaySpace(e)}>
      <div className='grid width-66' onChange={handlePlayspaceSelection.bind(this)}>
        {renderDomainPlayspaces()}
      </div>

      <div className="actions has-text-centered">
        <button
          className="button is-centered mt-4 mb-2 jally-button"
          type='submit'
          disabled={loading}
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