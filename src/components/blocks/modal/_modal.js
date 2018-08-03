import cookies from 'browser-cookies';

const modals = document.querySelectorAll('.js-modal');

function modalTracking (action) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'survey pop-up',
    popupAction: action
  });
}

Array.from(modals, (modal) => {
  const modalName = `Modal_${modal.dataset.modalCampaignName}`;

  if (!modal.dataset.modalOnceOnly || !cookies.get(modalName)) {
    document.body.appendChild(modal);
    modal.classList.add('b-modal--active');
    modalTracking('pop-up displayed');
  }

  modal.addEventListener('click', (e) => {
    if (modal.dataset.modalOnceOnly) {
      cookies.set(modalName, 'seen', { domain: modal.dataset.modalDomain });
    }
    if (e.target !== modal) {
      const modalAction = modal.querySelector('.js-modal-action');
      if (e.target === modalAction) {
        modalTracking(`clicked: ${modalAction.textContent}`);
      } else {
        modalTracking('pop-up dismissed');
        modal.remove();
      }
    }
  });
  return true;
});
