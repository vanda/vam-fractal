const cookieBanner = document.querySelector('.js-cookie-banner');

if (cookieBanner) {
  const closeButton = document.querySelector('.js-cookie-banner-close');
  window.onload = () => {
    cookieBanner.classList.remove('b-cookie-banner--hidden');
  };
  closeButton.onclick = (event) => {
    event.preventDefault();
    cookieBanner.classList.add('b-cookie-banner--hidden');
  };
}
