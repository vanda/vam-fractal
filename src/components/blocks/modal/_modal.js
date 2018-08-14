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

  if (!modal.dataset.modalOnceOnly || !cookies.get(modalCampaign)) {
    document.body.appendChild(modal);
    modal.classList.add('b-modal--active');
    modalTracking(modalCampaign, 'pop-up displayed');
  }

  modal.addEventListener('click', (e) => {
    if (modal.dataset.modalOnceOnly) {
      cookies.set(modalCampaign, 'seen', { domain: modal.dataset.modalDomain });
    }
    if (e.target !== modal) {
      const modalAction = modal.querySelector('.js-modal-action');
      if (e.target === modalAction) {
        modalTracking(modalCampaign, `clicked: ${modalAction.textContent}`);
      } else {
        modalTracking(modalCampaign, 'pop-up dismissed');
        modal.remove();
      }
    }
  });
  return true;
});
