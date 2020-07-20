function openObjectOverlay () {
  document.querySelector('.b-image-overlay__container').classList.add('b-image-overlay__container--active');
  document.querySelector('body').style.overflowY = 'hidden';
  const scrollY = window.pageYOffset;
  document.querySelector('.b-image-overlay__container').style.top = `${scrollY}px`;
}

function initObjectOverlay () {
  if (document.querySelector('.b-image-overlay')) {
    document.querySelector('.b-image-overlay__close-container').onclick = (e) => {
      e.target.dispatchEvent(new Event('closedImageOverlay'), { bubbles: true });
      document.querySelector('.b-image-overlay__container').classList.remove('b-image-overlay__container--active');
      document.querySelector('body').style.overflowY = 'auto';
    };

    document.querySelector('.b-image-overlay').addEventListener('openObjectOverlay', openObjectOverlay);

    document.querySelector('.b-image-overlay__container').addEventListener('jsModalOpen', () => {
      document.querySelector('.b-image-overlay__close-container').style.display = 'none';
    });

    document.querySelector('.b-image-overlay__container').addEventListener('jsModalClosed', () => {
      document.querySelector('.b-image-overlay__close-container').style.display = 'block';
    });

    Array.from(document.querySelectorAll('.b-image-overlay__preview')).forEach((el) => {
      el.onclick = (e) => {
        e.preventDefault();
        e.target.dispatchEvent(new CustomEvent('openObjectOverlay', { bubbles: true }));
      };
    });
  }
}

initObjectOverlay();
