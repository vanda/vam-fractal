import cookies from 'browser-cookies';

const modals = document.querySelectorAll('.js-modal');

function modalTracking (category, action) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'myClick',
    category,
    action
  });
}

Array.from(modals, (modal) => {
  const modalCampaign = modal.dataset.modalCampaign;
  const focusable = modal.querySelectorAll('a');

  const closeModal = () => {
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-hidden', 'true');
    modalTracking(modalCampaign, 'pop-up dismissed');
    modal.dispatchEvent(new CustomEvent('jsModalClosed', { bubbles: true }));
    // remove focus focusHandler
    modal.classList.remove('b-modal--active');
  };

  const focusHandler = (e) => {
    if (e.keyCode === 9) {
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const shift = e.shiftKey;
      if (focusable.length) {
        if (shift && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!shift && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
    if (e.key === 'Escape') {
      modal.removeEventListener('keydown', focusHandler);
      closeModal();
    }
  };

  if (
    (!modal.dataset.modalOnceOnly || !cookies.get(modalCampaign)) &&
     !modal.dataset.notOnLoad
  ) {
    document.body.appendChild(modal);
    modal.setAttribute('tabindex', '0');
    modal.removeAttribute('aria-hidden');
    modal.classList.add('b-modal--active');
    modalTracking(modalCampaign, 'pop-up displayed');

    // focus the modal instead of the body
    modal.focus();
    focusable[1].focus();

    // add focus handler
    modal.addEventListener('keydown', focusHandler);
  }

  modal.addEventListener('click', (e) => {
    if (modal.dataset.modalOnceOnly) {
      cookies.set(modalCampaign, 'seen', { domain: modal.dataset.modalDomain, expires: 365 });
    }
    if (e.target !== modal) {
      if (!!(Array.from(e.target.classList).find(c => c === 'js-modal-action')) || e.target.closest('.js-modal-action')) {
        modalTracking(modalCampaign, `clicked: ${e.target.textContent}`);
      } else {
        modal.removeEventListener('keydown', focusHandler);
        closeModal();
      }
    }
  });
  return true;
});
