const quicklinkMoreButton = document.querySelector('.u-btn--quicklink-more');

if (quicklinkMoreButton) {
  quicklinkMoreButton.addEventListener('click', () => {
    quicklinkMoreButton.classList.toggle('u-btn--quicklink-more--active');
  });
}
