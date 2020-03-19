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

  if ((!modal.dataset.modalOnceOnly || !cookies.get(modalCampaign)) && !Boolean(modal.dataset.notOnLoad)) {
    document.body.appendChild(modal);
    modal.classList.add('b-modal--active');
    modalTracking(modalCampaign, 'pop-up displayed');
  }

  modal.addEventListener('click', (e) => {
    if (modal.dataset.modalOnceOnly) {
      cookies.set(modalCampaign, 'seen', { domain: modal.dataset.modalDomain, expires: 365 });
    }
    if (e.target !== modal) {
      if (!!(Array.from(e.target.classList).find(c => c === "js-modal-action"))) {
        modalTracking(modalCampaign, `clicked: ${e.target.textContent}`);
      } else {
        modalTracking(modalCampaign, 'pop-up dismissed');
        modal.classList.remove("b-modal--active");
      }
    }
  });
  return true;
});
