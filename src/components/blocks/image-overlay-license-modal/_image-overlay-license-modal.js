const prefix = 'b-image-overlay-license-modal';

const downloadButtonClass = '__download-button';
const contactButton = '__contact-button';
const modalClass = '__image-modal';
const contactModalOpen = '__contact-modal-open';
const iconLinkContainer = '__icon-link-container';
const checkmark = '__checkmark';
const imageIconLink = '__image-icon-link';
const agreeToTerms = '__agree-to-terms';
const downloadContentClass = '__modal-download-content';
const contactContentClass = '__modal-contact-content';
const checkboxContainer = '__checkbox-container';
const agreeCheckbox = '__agree-checkbox';
const agreeToTermsReminder = '__agree-to-terms-reminder';

const active = '--active';
const warning = '--warning';

const elements = [
  iconLinkContainer,
  checkmark,
  imageIconLink,
  agreeToTerms,
];

const modal = document.querySelector(`.${prefix}${modalClass}`);
const imageOverlay = document.querySelector('.b-image-overlay') || document.querySelector('body');
const downloadContent = document.querySelector(`.${prefix}${downloadContentClass}`);
const contactContent = document.querySelector(`.${prefix}${contactContentClass}`);
const downloadLink = document.querySelector('.u-link.b-image-overlay-license-modal__download-link.js-modal-action');
const downloadButton = document.querySelector('.b-icon-link.b-icon-link__download.js-modal-action');
const closeButton = document.querySelector('.b-image-overlay-license-modal__close-container');

window.addEventListener('click', (e) => {
  if (e.target.closest('.b-image-overlay-license-modal__close-container')) {
    closeButton.disabled = true;
    modal.classList.remove('b-modal--active');
    modal.dispatchEvent(new CustomEvent('jsModalClosed', { bubbles: true }));
  }

  if (e.target.closest(`.${prefix}${downloadButtonClass}`)) {
    downloadContent.querySelector('.b-image-overlay-license-modal__close-container').disabled = false;
    contactContent.querySelector('.b-image-overlay-license-modal__close-container').disabled = true;
    const focusable = downloadContent.querySelectorAll(`
      .b-image-overlay-license-modal__close-container,
      .b-image-overlay-license-modal__title-section a,
      .b-modal__description.b-image-overlay-license-modal__description-container,
      .b-image-overlay-license-modal__content-container button,
      .b-image-overlay-license-modal__footer-section a
    `);
    imageOverlay.classList.add('b-image-overlay--unfocus');
    modal.dispatchEvent(new CustomEvent('jsModalOpen', { bubbles: true }));
    modal.classList.add('b-modal--active');
    closeButton.disabled = false;
    downloadContent.classList.add(`${prefix}${downloadContentClass}${active}`);
    contactContent.classList.remove(`${prefix}${contactContentClass}${active}`);
    focusable[0].focus();
  }

  if (e.target.closest(`.${prefix}${contactButton}`)) {
    downloadContent.querySelector('.b-image-overlay-license-modal__close-container').disabled = true;
    contactContent.querySelector('.b-image-overlay-license-modal__close-container').disabled = false;
    imageOverlay.classList.add('b-image-overlay--unfocus');
    modal.dispatchEvent(new CustomEvent('jsModalOpen', { bubbles: true }));
    modal.classList.add('b-modal--active');
    closeButton.disabled = false;
    downloadContent.classList.remove(`${prefix}${downloadContentClass}${active}`);
    contactContent.classList.add(`${prefix}${contactContentClass}${active}`);
    document.querySelector('.b-modal__description-license-contact').focus();
  }

  if (e.target.closest(`.${prefix}${contactModalOpen}`)) {
    downloadContent.classList.remove(`${prefix}${downloadContentClass}${active}`);
    contactContent.classList.add(`${prefix}${contactContentClass}${active}`);
    document.querySelector('.b-modal__description-license-contact').focus();
  }

  if (e.target.closest(`.${prefix}${checkboxContainer}`)) {
    if (e.target.closest(`.${prefix}${agreeToTerms}`) === document.querySelector(`.${prefix}${agreeToTerms}`)) {
      document.querySelector(`.${prefix}${agreeCheckbox}`).checked = !document.querySelector(`.${prefix}${agreeCheckbox}`).checked;

      document.querySelector(`.${prefix}${agreeToTerms}`).classList.remove(`${prefix}${agreeToTerms}${warning}`);

      if (document.querySelector(`.${prefix}${agreeCheckbox}`).checked) {
        document.querySelector(`.${prefix}${agreeToTermsReminder}`).style.display = 'none';
        elements.forEach((c) => {
          document.querySelector(`.${prefix}${c}`).classList.add(`${prefix}${c}--active`);
        });
        document.querySelector('.b-image-overlay-license-modal__download-link .b-icon-link').classList.add('b-icon-link--active');
        downloadLink.setAttribute('data-tracking-collections', 'image download');
        downloadButton.setAttribute('data-tracking-collections', 'image download');
      } else {
        elements.forEach((c) => {
          document.querySelector(`.${prefix}${c}`).classList.remove(`${prefix}${c}--active`);
        });
        document.querySelector('.b-image-overlay-license-modal__download-link .b-icon-link').classList.remove('b-icon-link--active');
        downloadLink.removeAttribute('data-tracking-collections');
        downloadButton.removeAttribute('data-tracking-collections');
      }
    }
  }

  if (e.target.closest(`.${prefix}${checkboxContainer}`)) {
    if (!document.querySelector(`.${prefix}${agreeCheckbox}`).checked) {
      document.querySelector(`.${prefix}${agreeToTermsReminder}`).style.display = 'block';
      document.querySelector(`.${prefix}${agreeToTerms}`).classList.add(`${prefix}${agreeToTerms}${warning}`);
    }
  }
});

window.addEventListener('keydown', (e) => {
  const activeModal = (document.querySelector(`.${prefix}${modalClass}.b-modal--active`));
  const activeContent = document.querySelector(`.${prefix}${downloadContentClass}.${prefix}${downloadContentClass}${active}`)
  || document.querySelector(`.${prefix}${contactContentClass}.${prefix}${contactContentClass}${active}`);

  if (activeModal) {
    // https://stackoverflow.com/a/60031728 w/ modifications
    if (e.key === 'Tab') {
      const focusable = activeContent.querySelectorAll(`
        .b-image-overlay-license-modal__close-container,
        .b-image-overlay-license-modal__title-section a,
        .b-modal__description.b-image-overlay-license-modal__description-container,
        .b-image-overlay-license-modal__content-container button,
        .b-image-overlay-license-modal__footer-section a
      `);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const shift = e.shiftKey;
      if (focusable.length) {
        if (shift && document.activeElement === first) {
          if (focusable.length === 1) {
            first.focus();
          } else {
            last.focus();
          }
          e.preventDefault();
        } else if (!shift && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  }

  if (e.key === 'Enter' && document.activeElement.classList.contains('b-image-overlay-license-modal__contact-modal-open')) {
    document.activeElement.click();
  }

  if (activeModal && e.key === 'Escape') {
    modal.classList.remove('b-modal--active');
    modal.dispatchEvent(new CustomEvent('jsModalClosed', { bubbles: true }));
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  // idk, it stops lint complaining
  return true;
});
