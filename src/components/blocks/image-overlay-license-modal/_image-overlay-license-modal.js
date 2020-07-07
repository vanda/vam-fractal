const prefix = 'b-image-overlay-license-modal';
const links = [
  '__download-icon-link',
  '__download-link-text'
];

const downloadButton = '__download-button';
const contactButton = '__contact-button';

const modal = '__image-modal';
const contactModalOpen = '__contact-modal-open';

const iconLinkContainer = '__icon-link-container';
const checkmark = '__checkmark';
const imageIconLink = '__image-icon-link';
const agreeToTerms = '__agree-to-terms';
const downloadContent = '__modal-download-content';
const contactContent = '__modal-contact-content';
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

function initDownloadButton () {
  if (document.querySelector(`.${prefix}${downloadButton}`)) {
    document.querySelector(`.${prefix}${downloadButton}`).onclick = () => {
      document.querySelector(`.${prefix}${modal}`).dispatchEvent(new CustomEvent('jsModalOpen', { bubbles: true }));
      document.querySelector(`.${prefix}${modal}`).classList.add('b-modal--active');
      document.querySelector(`.${prefix}${downloadContent}`).classList.add(`${prefix}${downloadContent}${active}`);
      document.querySelector(`.${prefix}${contactContent}`).classList.remove(`${prefix}${contactContent}${active}`);
    };
  }

  if (document.querySelector(`.${prefix}${contactButton}`)) {
    document.querySelector(`.${prefix}${contactButton}`).onclick = () => {
      document.querySelector(`.${prefix}${modal}`).dispatchEvent(new CustomEvent('jsModalOpen', { bubbles: true }));
      document.querySelector(`.${prefix}${modal}`).classList.add('b-modal--active');
      document.querySelector(`.${prefix}${downloadContent}`).classList.remove(`${prefix}${downloadContent}${active}`);
      document.querySelector(`.${prefix}${contactContent}`).classList.add(`${prefix}${contactContent}${active}`);
    };
  }

  if (document.querySelector(`.${prefix}${contactModalOpen}`)) {
    document.querySelector(`.${prefix}${contactModalOpen}`).onclick = () => {
      document.querySelector(`.${prefix}${downloadContent}`).classList.remove(`${prefix}${downloadContent}${active}`);
      document.querySelector(`.${prefix}${contactContent}`).classList.add(`${prefix}${contactContent}${active}`);
    };
  }

  if (document.querySelector(`.${prefix}${checkboxContainer}`)) {
    document.querySelector(`.${prefix}${checkboxContainer}`).onclick = (e) => {
      if (e.target.closest(`.${prefix}${agreeToTerms}`) === document.querySelector(`.${prefix}${agreeToTerms}`)) {
        document.querySelector(`.${prefix}${agreeCheckbox}`).checked =
          !document.querySelector(`.${prefix}${agreeCheckbox}`).checked;

        document.querySelector(`.${prefix}${agreeToTerms}`).classList.remove(`.${prefix}${agreeToTerms}${warning}`);

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
    };
  }

  links.forEach((link) => {
    if (document.querySelector(`.${prefix}${link}`)) {
      document.querySelector(`.${prefix}${link}`).onclick = () => {
        if (!document.querySelector(`.${prefix}${agreeCheckbox}`).checked) {
          document.querySelector(`.${prefix}${agreeToTermsReminder}`).style.display = 'block';
          document.querySelector(`.${prefix}${agreeToTerms}`).classList.add(`.${prefix}${agreeToTerms}${warning}`);
        }
      };
    }
  });
}

initDownloadButton();
