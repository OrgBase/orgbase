import React, {useState, useEffect, useRef} from 'react'
import bulmaSlider from "bulma-slider/src/js";
import fetchWrapper from "../../helpers/fetchWrapper";
import Flatpickr from "react-flatpickr";

const CreateJallyForm = ({ isImpromptu }) => {
  //Nasty hack to make changes to absolute positioning of slider outputs. Sorry! -Midhun
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const [name, setName] = useState('');
  const [invitees, setInvitees] = useState([]);
  const [sessionDuration, setSessionDuration] = useState(30);
  const prevSessionDuration = usePrevious(sessionDuration);
  const [switchDuration, setSwitchDuration] = useState(15);
  const prevSwitchDuration = usePrevious(switchDuration);
  const [partyMode, setPartyMode] = useState(false)
  const [scheduledAt, setScheduledAt] = useState(new Date())
  const [recurring, setRecurring] = useState(true)
  const [frequencyLength, setFrequencyLength] = useState(1);
  const [frequencyUnit, setFrequencyUnit] = useState('weeks');
  const submitButtonText = isImpromptu ? 'Start Jally' : 'Schedule Jally';
  const durationSliderOutputRef = useRef();
  const swapSliderOutputRef = useRef();

  useEffect(() => {
    bulmaSlider.attach();
    let left = Number(durationSliderOutputRef.current.style.left.slice(0, -2));
    if(!isNaN(left) && prevSessionDuration != sessionDuration) {
      left -= 32;
      durationSliderOutputRef.current.style.left = `${left}px`
    }

    if(swapSliderOutputRef.current) {
      left = Number(swapSliderOutputRef.current.style.left.slice(0, -2));
      if(!isNaN(left) && prevSwitchDuration != switchDuration) {
        left -= 32;
        swapSliderOutputRef.current.style.left = `${left}px`
      }
    }
  });

  const createJally = () => {
    const session_duration_seconds = sessionDuration * 60;
    const switch_after_seconds = switchDuration * 60;
    let scheduled_at, frequency_length, frequency_unit;
    if(isImpromptu) {
      scheduled_at = Math.floor(+ new Date()/1000);
      frequency_length = 1;
      frequency_unit = 'weeks'
    } else {
      scheduled_at = Math.floor(scheduledAt.getTime()/1000)
      frequency_length = frequencyLength
      frequency_unit = frequencyUnit
    }

    fetchWrapper('/session', 'POST', {
      party: partyMode,
      recurring: isImpromptu ? false : recurring,
      session_duration_seconds,
      switch_after_seconds,
      scheduled_at,
      frequency_length,
      frequency_unit,
      name,
    })
      .then(response => response.json())
      .then(data => window.location.href = `/session/${data.session_slug}`)
      .catch(error => console.error(error));
  }


  return <>
    <form className='px-6' onSubmit={(e) => e.preventDefault()}>
      {!isImpromptu && <div className="field">
        <label className="label jally-label dark-grey-text">Name</label>
        <input
          className="input"
          placeholder='Use a name your team will recognise e.g. HR Weekly Jally'
          onChange={(e) => setName(e.target.value)}
        />
      </div>}
      <div className="field">
        <label className="label jally-label dark-grey-text">Invite People</label>
        <textarea className="textarea"
          placeholder='Enter their names or email'
        />
        {isImpromptu && <p className='light-grey-text'>you can also share via an invite link later if you prefer</p>}
      </div>
      <div className='columns my-0'>
        {
          !isImpromptu && <div className='column pl-0 pt-0 pr-3 is-half'>
            <div className="field">
              <label className="label jally-label dark-grey-text">Date & Time</label>
              <div className='control has-icons-right'>
                <Flatpickr
                  className='input'
                  data-enable-time
                  value={scheduledAt}
                  onChange={date => setScheduledAt(date[0])}
                  options={{
                    dateFormat: 'J M Y h:i K'
                  }}
                />
                <span className="icon is-medium is-right">
                <i className="fas fa-calendar"></i>
              </span>
              </div>
            </div>
          </div>
        }
        <div className='column px-0 pt-0'>
          <div className="field slider-field">
            <label className="label jally-label dark-grey-text">Session Length</label>
            <input
              className="slider jally-slider mt-3 is-fullwidth has-output-tooltip is-medium is-circle"
              id="jally-duration"
              step="5"
              min="10"
              max="60"
              type="range"
              defaultValue={sessionDuration}
              onChange={(e) => setSessionDuration(e.target.value)}
            />
            <output ref={durationSliderOutputRef} className='jally-output' htmlFor="jally-duration" data-postfix=' Mins'>30 Mins</output>
          </div>
        </div>
      </div>
      <div className='columns my-0'>
        <div className='column px-0 pt-0'>
          <label className="label jally-label dark-grey-text">
            Recurring
          </label>
          <div className="buttons">
            <button
              className={`button jally-button-small is-small ${recurring ? 'is-primary' : ''}`}
              onClick={() => setRecurring(true)}
            >
              Yes
            </button>
            <button
              className={`button jally-button-small is-small ${recurring ? '' : 'is-primary'}`}
              onClick={() => setRecurring(false)}
            >
              No
            </button>
          </div>
        </div>
        <div className='column px-0 pt-0'>
          {recurring && <div className="field slider-field">
            <label className="label jally-label dark-grey-text">
              Frequency
            </label>
            <div className='columns'>
              <div className='column pl-0 is-narrow light-grey-text mt-2'> Every</div>
              <div className='column pl-0 is-narrow light-grey-text is-one-quarter'>
                <input
                  className="input"
                  defaultValue={1}
                  type='number'
                  step='1'
                  onChange={(e) => setFrequencyLength(e.target.value)}
                />
              </div>
              <div className='column pl-0 is-narrow light-grey-text'>
                <div className='select'>
                  <select
                    defaultValue='weeks'
                    onChange={(e) => setFrequencyUnit(e.target.value)}
                  >
                    <option value='days'>Work Days</option>
                    <option value='weeks'>Weeks</option>
                    <option value='months'>Months</option>
                  </select>
                </div>
              </div>
            </div>
          </div>}
        </div>
      </div>
      <div className='columns mt-0 mb-4'>
        <div className='column px-0 py-0'>
          <label className="label jally-label dark-grey-text">
            Party Mode
            <span
              className='ml-1 has-tooltip-multiline'
              data-tooltip="Turning Party Mode on means people will automatically swap partners after a specified period of time. It’s a great way for larger groups to see more teammates in a single session!"
            ><i className="fas fa fa-info-circle" aria-hidden="true"></i></span>
          </label>
          <div className="buttons">
            <button
              className={`button jally-button-small is-small ${partyMode ? 'is-primary' : ''}`}
              onClick={() => setPartyMode(true)}
            >
              On
            </button>
            <button
              className={`button jally-button-small is-small ${partyMode ? '' : 'is-primary'}`}
              onClick={() => setPartyMode(false)}
            >
              Off
            </button>
          </div>
        </div>
        <div className='column px-0 py-0'>
          {partyMode && <div className="field slider-field">
            <label className="label jally-label dark-grey-text">
              Swap Every
            </label>
            <input
              className="slider jally-slider my-0 is-fullwidth has-output-tooltip is-medium is-circle"
              id="jally-swap-duration"
              step="5"
              min="5"
              max="30"
              type="range"
              defaultValue={switchDuration}
              onChange={(e) => setSwitchDuration(e.target.value)}
            />
            <output ref={swapSliderOutputRef} className='jally-output' htmlFor="jally-swap-duration" data-postfix=' Mins'>15 Mins</output>
          </div>}
        </div>
      </div>
      <div className="actions has-text-centered">
        <button
          className="button is-centered mb-3 jally-button"
          onClick={createJally}
        >{submitButtonText}</button>
      </div>
    </form>
  </>
}

export default CreateJallyForm;