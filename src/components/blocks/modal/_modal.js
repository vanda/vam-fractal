import cookies from 'browser-cookies';

const modals = document.querySelectorAll('.js-modal');

function modalTracking(category, action) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'myClick',
    category,
    action,
  });
}

Array.from(modals, (modal) => {
  const modalCampaign = modal.dataset.modalCampaign == null ? 'modalCampaign-not-set' : modal.dataset.modalCampaign;

  const closeModal = () => {
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-hidden', 'true');
    modalTracking(modalCampaign, 'pop-up dismissed');
    modal.dispatchEvent(new CustomEvent('jsModalClosed', { bubbles: true }));
    modal.classList.remove('b-modal--active');
    modal.removeEventListener('keydown', focusHandler); // eslint-disable-line no-use-before-define
  };

  const focusHandler = (e) => {
    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll('a, button:enabled, input:enabled');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const shift = e.shiftKey;
      if (focusable.length) {
        if (shift && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!shift && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    } else if (e.key === 'Escape') {
      modal.removeEventListener('keydown', focusHandler);
      closeModal();
    }
  };

  if (
    (!modal.dataset.modalOnceOnly || !cookies.get(modalCampaign))
    && !modal.dataset.notOnLoad
  ) {
    document.body.appendChild(modal);
    modal.setAttribute('tabindex', '0');
    modal.removeAttribute('aria-hidden');
    modal.classList.add('b-modal--active');
    modalTracking(modalCampaign, 'pop-up displayed');

    // apply focus to modal
    modal.querySelector('a, button:enabled, input:enabled').focus();

    // add focus handler
    modal.addEventListener('keydown', focusHandler);
  }

  modal.addEventListener('click', (e) => {
    if (modal.dataset.modalOnceOnly) {
      cookies.set(modalCampaign, 'seen', { domain: modal.dataset.modalDomain, expires: 365 });
    }
    if (e.target.closest('.js-modal-action')) {
      modalTracking(modalCampaign, `clicked: ${e.target.textContent}`);
    } else if (e.target.closest('.js-modal-exit')) {
      closeModal();
    }
  });
  return true;
});
