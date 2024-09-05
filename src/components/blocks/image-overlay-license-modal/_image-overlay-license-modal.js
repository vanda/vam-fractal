const prefix = 'b-image-overlay-license-modal';

const downloadButtonClass = '.js-image-overlay-license-modal-activate';
const exitButtonClass = '__exit';
const contactButton = '__contact-button';
const modalClass = '__image-modal';
const contactModalOpen = '__contact-modal-open';
const downloadLinks = '__download-links';
const downloadContentClass = '__modal-download-content';
const contactContentClass = '__modal-contact-content';
const agreeCheckbox = '__agree-checkbox';
const agreeToTermsReminder = '__agree-to-terms-reminder';

const active = '--active';
const warning = '--warning';

const elements = [
  downloadLinks,
  agreeCheckbox,
];

const modal = document.querySelector(`.${prefix}${modalClass}`);
const imageOverlay = document.querySelector('.b-image-overlay') || document.querySelector('body');
const downloadContent = document.querySelector(`.${prefix}${downloadContentClass}`);
const contactContent = document.querySelector(`.${prefix}${contactContentClass}`);
const downloadButtons = document.querySelectorAll('.js-image-overlay-license-modal-download-link');

const keyHandler = (e) => {
  const activeModal = (document.querySelector(`.${prefix}${modalClass}.b-modal--active`));
  const activeContent = document.querySelector(`.${prefix}${downloadContentClass}.${prefix}${downloadContentClass}${active}`)
  || document.querySelector(`.${prefix}${contactContentClass}.${prefix}${contactContentClass}${active}`);

  if (activeModal) {
    if (e.key === 'Tab') {
      const focusable = activeContent.querySelectorAll('a, button:enabled, input:enabled');
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

  if (activeModal && e.key === 'Escape') {
    e.preventDefault();
    e.stopPropagation();
    modal.classList.remove('b-modal--active');
    modal.dispatchEvent(new CustomEvent('jsModalClosed', { bubbles: true }));
    document.removeEventListener('keydown', keyHandler);
    return false;
  }

  return true;
};

document.addEventListener('click', (e) => {
  if (e.target.closest(`.${prefix}${exitButtonClass}`)) {
    modal.classList.remove('b-modal--active');
    modal.dispatchEvent(new CustomEvent('jsModalClosed', { bubbles: true }));
    document.removeEventListener('keydown', keyHandler);
  }

  if (e.target.closest(downloadButtonClass)) {
    const focusable = downloadContent.querySelectorAll('a, button:enabled, input:enabled');
    imageOverlay.classList.add('b-image-overlay--unfocus');
    modal.dispatchEvent(new CustomEvent('jsModalOpen', { bubbles: true }));
    modal.classList.add('b-modal--active');
    downloadContent.classList.add(`${prefix}${downloadContentClass}${active}`);
    contactContent.classList.remove(`${prefix}${contactContentClass}${active}`);
    focusable[0].focus();
  }

  if (e.target.closest(`.${prefix}${contactButton}`)) {
    imageOverlay.classList.add('b-image-overlay--unfocus');
    modal.dispatchEvent(new CustomEvent('jsModalOpen', { bubbles: true }));
    modal.classList.add('b-modal--active');
    downloadContent.classList.remove(`${prefix}${downloadContentClass}${active}`);
    contactContent.classList.add(`${prefix}${contactContentClass}${active}`);
    document.querySelector('.b-modal__description-license-contact').focus();
  }

  if (e.target.closest(`.${prefix}${contactModalOpen}`)) {
    downloadContent.classList.remove(`${prefix}${downloadContentClass}${active}`);
    contactContent.classList.add(`${prefix}${contactContentClass}${active}`);
    document.querySelector('.b-modal__description-license-contact').focus();
  }

  if (e.target.closest(`.${prefix}${agreeCheckbox}`)) {
    document.querySelector(`.${prefix}${agreeCheckbox}`).classList.remove(`${prefix}${agreeCheckbox}${warning}`);

    if (document.querySelector(`.${prefix}${agreeCheckbox}`).checked) {
      document.querySelector(`.${prefix}${agreeToTermsReminder}`).style.display = 'none';
      elements.forEach((c) => {
        document.querySelector(`.${prefix}${c}`).classList.add(`${prefix}${c}--active`);
      });
      Array.from(downloadButtons, (btn) => {
        btn.disabled = false;
        return true;
      });
    } else {
      elements.forEach((c) => {
        document.querySelector(`.${prefix}${c}`).classList.remove(`${prefix}${c}--active`);
      });
      Array.from(downloadButtons, (btn) => {
        btn.disabled = true;
        return true;
      });
      document.querySelector(`.${prefix}${agreeToTermsReminder}`).style.display = 'block';
      document.querySelector(`.${prefix}${agreeCheckbox}`).classList.add(`${prefix}${agreeCheckbox}${warning}`);
    }
  }
});

document.addEventListener('keydown', keyHandler);
