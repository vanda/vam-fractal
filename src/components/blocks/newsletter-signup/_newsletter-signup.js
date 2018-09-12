function isEmail (t) {
  const e = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return e.test(t);
}

Array.from(document.querySelectorAll('.js-newsletter_form'), (signupForm) => {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailField = signupForm.querySelector('.js-emailValidation');
    const emailDescriptor = signupForm.querySelector('.js-newsletter__descriptor');
    const emailBtn = signupForm.querySelector('.js-newsletter__submit');
    const httpRequest = new XMLHttpRequest();
    let formInputs = '';

    if (isEmail(emailField.value)) {
      if (!httpRequest) {
        signupForm.submit();
      }
      Array.from(signupForm.querySelectorAll('input'), (ip) => {
        formInputs += `${ip.name}=${encodeURIComponent(ip.value)}&`;
        return true;
      });
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            emailBtn.value = 'Thank you!';
            emailDescriptor.innerHTML =
              'A confirmation email will be sent to this address shortly&hellip;';
            signupForm.classList.remove('invalid');
            signupForm.classList.add('sent');
          } else {
            signupForm.submit();
          }
        }
      };
      httpRequest.open('POST', signupForm.action);
      httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      httpRequest.send(formInputs);
    } else {
      emailDescriptor.innerHTML = "That doesn't look like an email address&hellip;";
      signupForm.classList.add('invalid');
    }
  });
  return true;
});
