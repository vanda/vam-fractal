const cookieBanner = document.querySelector('.js-cookie-banner');

if (cookieBanner) {
  const closeButton = document.querySelector('.js-cookie-banner-close');
  closeButton.onclick = (event) => {
    event.preventDefault();
    cookieBanner.classList.add('hidden');
  };
}
