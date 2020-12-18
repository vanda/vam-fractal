const prefix = 'b-image-overlay-license-modal';

const downloadButton = '__download-button';
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
  agreeToTerms
];

const modal = document.querySelector(`.${prefix}${modalClass}`);
const imageOverlay = document.querySelector('.b-image-overlay');
const downloadContent = document.querySelector(`.${prefix}${downloadContentClass}`);
const contactContent = document.querySelector(`.${prefix}${contactContentClass}`);

window.addEventListener('click', (e) => {
  if (e.target.closest(`.${prefix}${downloadButton}`)) {
    window.setTimeout(() => {
      document.querySelector('.b-image-overlay-license-modal__agree-to-terms').focus();
    }, 10);
    imageOverlay.classList.add('b-image-overlay--unfocus');
    modal.dispatchEvent(new CustomEvent('jsModalOpen', { bubbles: true }));
    modal.classList.add('b-modal--active');
    downloadContent.classList.add(`${prefix}${downloadContentClass}${active}`);
    contactContent.classList.remove(`${prefix}${contactContentClass}${active}`);
  }

  if (e.target.closest(`.${prefix}${contactButton}`)) {
    window.setTimeout(() => {
      document.querySelector('.b-modal__description-license-contact').focus();
    }, 10);
    imageOverlay.classList.add('b-image-overlay--unfocus');
    modal.dispatchEvent(new CustomEvent('jsModalOpen', { bubbles: true }));
    modal.classList.add('b-modal--active');
    downloadContent.classList.remove(`${prefix}${downloadContentClass}${active}`);
    contactContent.classList.add(`${prefix}${contactContentClass}${active}`);
  }

  if (e.target.closest(`.${prefix}${contactModalOpen}`)) {
    window.setTimeout(() => {
      document.querySelector('.b-modal__description-license-contact').focus();
    }, 10);
    downloadContent.classList.remove(`${prefix}${downloadContentClass}${active}`);
    contactContent.classList.add(`${prefix}${contactContentClass}${active}`);
  }

  if (e.target.closest(`.${prefix}${checkboxContainer}`)) {
    if (e.target.closest(`.${prefix}${agreeToTerms}`) === document.querySelector(`.${prefix}${agreeToTerms}`)) {
      document.querySelector(`.${prefix}${agreeCheckbox}`).checked =
        !document.querySelector(`.${prefix}${agreeCheckbox}`).checked;

      document.querySelector(`.${prefix}${agreeToTerms}`).classList.remove(`${prefix}${agreeToTerms}${warning}`);

      if (document.querySelector(`.${prefix}${agreeCheckbox}`).checked) {
        document.querySelector(`.${prefix}${agreeToTermsReminder}`).style.display = 'none';
        elements.forEach(c =>
          document.querySelector(`.${prefix}${c}`) && document.querySelector(`.${prefix}${c}`).classList.add(`${prefix}${c}--active`)
        );
        document.querySelector('.b-image-overlay-license-modal__download-link .b-icon-link').classList.add('b-icon-link--active');
      } else {
        elements.forEach(c =>
          document.querySelector(`.${prefix}${c}`) && document.querySelector(`.${prefix}${c}`).classList.remove(`${prefix}${c}--active`)
        );
        document.querySelector('.b-image-overlay-license-modal__download-link .b-icon-link').classList.remove('b-icon-link--active');
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
  const activeContent = document.querySelector(`.${prefix}${downloadContentClass}.${prefix}${downloadContentClass}${active}`) ||
    document.querySelector(`.${prefix}${contactContentClass}.${prefix}${contactContentClass}${active}`);

  if (activeModal) {
    // https://stackoverflow.com/a/60031728 w/ modifications
    if (e.keyCode === 9) {
      const focusable = activeContent.querySelectorAll(
        'button'
      );
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
  }

  if (activeModal && e.keyCode === 27) {
    modal.classList.remove('b-modal--active');
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  // idk, it stops lint complaining
  return true;
});
