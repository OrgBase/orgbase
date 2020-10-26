window.onload = function () {
  const forms = document.getElementsByClassName("landing-form");

  const submitHandler = function() {
    const button = this.querySelector('.landing-submit-button');
    button.innerHTML = 'Thanks!'
    button.setAttribute('disabled', true);
  };

  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', submitHandler, false);
  }
};
