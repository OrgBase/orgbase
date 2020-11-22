import React, {useState} from 'react';
import fetchWrapper from "../../helpers/fetchWrapper";

const SetupProfileForm = ({name, toggleProfileModal}) => {
  const [fullName, setFullName] = useState(name)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formError, setFormError] = useState('')

  const setupProfile = (event) => {
    event.preventDefault();
    setFormError('')
    if (password || confirmPassword) {
      if (password != confirmPassword) {
        setFormError('Password and confirm password fields should match.')
        return
      }
    }

    fetchWrapper('/profile', 'POST', {
      name: fullName,
      password_confirmation: confirmPassword,
      password
    })
      .then(response => response.json())
      .then(data => {
        if(data.success) {
          toggleProfileModal()
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
    <form className='px-6' onSubmit={(e) => setupProfile(e)}>
      <div className="field">
        <label className="label jally-label dark-grey-text">
          Full Name
        </label>
        <input
          className="input"
          name='name'
          autoComplete="name"
          required={true}
          autoFocus={true}
          defaultValue={name}
          style={{
            width: '75%'
          }}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="label jally-label dark-grey-text">
          Set Password
          <span
            className='ml-1 has-tooltip-multiline'
            data-tooltip="Don’t like managing multiple passwords? With Jally you’ll always be able to log in using magic links we send to your email, so feel free to skip this if you like."
          ><i className="fas fa fa-info-circle" aria-hidden="true"></i></span>
        </label>
        <input
          type='password'
          className="input"
          name='password'
          autoComplete="new-password"
          minLength={6}
          style={{
            width: '75%'
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="label jally-label dark-grey-text">
          Confirm Password
        </label>
        <input
          type='password'
          className="input"
          name='password'
          autoComplete="new-password"
          minLength={6}
          style={{
            width: '75%'
          }}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="actions has-text-centered">
        <button
          className="button is-centered mb-3 jally-button"
          type='submit'
        >Next</button>
      </div>
    </form>
  </>
}

export default SetupProfileForm;