const cookieBanner = document.querySelector('.js-cookie-banner');

if (cookieBanner) {
  const closeButton = document.querySelector('.js-cookie-banner-close');
  document.addEventListener('DOMContentLoaded', () => {
    cookieBanner.classList.remove('b-cookie-banner--hidden');
  }, true);
  closeButton.onclick = (e) => {
    e.preventDefault();
    cookieBanner.classList.add('b-cookie-banner--hidden');
  };
}
