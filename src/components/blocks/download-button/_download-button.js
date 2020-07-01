const prefix = 'image-button';
const links = [
  '__download-icon-link',
  '__download-link-text'
];
const elements = [
  '__icon-link-container',
  '__checkmark',
  '__image-icon-link',
  '__agree-to-terms',
  '__download-content',
  '__license-content'
];


function initDownloadButton () {
  if (document.querySelector('.image-button__download-button')) {
    document.querySelector('.image-button__download-button').onclick = () => {
      document.querySelector('.image-button__image-modal').dispatchEvent(new CustomEvent('jsModalOpen', { bubbles: true }));
      document.querySelector('.image-button__image-modal').classList.add('b-modal--active');
      document.querySelector('.image-button__modal-download-content').classList.add('image-button__modal-download-content--active');
      document.querySelector('.image-button__modal-license-content').classList.remove('image-button__modal-license-content--active');
    };
  }

  if (document.querySelector('.image-button__license-button')) {
    document.querySelector('.image-button__license-button').onclick = () => {
      document.querySelector('.image-button__image-modal').dispatchEvent(new CustomEvent('jsModalOpen', { bubbles: true }));
      document.querySelector('.image-button__image-modal').classList.add('b-modal--active');
      document.querySelector('.image-button__modal-download-content').classList.remove('image-button__modal-download-content--active');
      document.querySelector('.image-button__modal-license-content').classList.add('image-button__modal-license-content--active');
    };
  }

  if (document.querySelector('.image-button__license-modal-open')) {
    document.querySelector('.image-button__license-modal-open').onclick = () => {
      document.querySelector('.image-button__modal-download-content').classList.remove('image-button__modal-download-content--active');
      document.querySelector('.image-button__modal-license-content').classList.add('image-button__modal-license-content--active');
    };
  }

  if (document.querySelector('.image-button__checkbox-container')) {
    document.querySelector('.image-button__checkbox-container').onclick = (e) => {
      if (e.target.closest('.image-button__agree-to-terms') === document.querySelector('.image-button__agree-to-terms')) {
        document.querySelector('.image-button__agree-checkbox').checked =
          !document.querySelector('.image-button__agree-checkbox').checked;

        document.querySelector('.image-button__agree-to-terms').classList.remove('image-button__agree-to-terms--warning');

        if (document.querySelector('.image-button__agree-checkbox').checked) {
          document.querySelector('.image-button__agree-to-terms-reminder').style.display = 'none';
          elements.forEach(c =>
            document.querySelector(`.${prefix}${c}`) && document.querySelector(`.${prefix}${c}`).classList.add(`${prefix}${c}--active`)
          );
        } else {
          elements.forEach(c =>
            document.querySelector(`.${prefix}${c}`) && document.querySelector(`.${prefix}${c}`).classList.remove(`${prefix}${c}--active`)
          );
        }
      }
    };
  }

  links.forEach((link) => {
    if (document.querySelector(`.${prefix}${link}`)) {
      document.querySelector(`.${prefix}${link}`).onclick = () => {
        if (!document.querySelector('.image-button__agree-checkbox').checked) {
          document.querySelector('.image-button__agree-to-terms-reminder').style.display = 'block';
          document.querySelector('.image-button__agree-to-terms').classList.add('image-button__agree-to-terms--warning');
        }
      };
    }
  });
}

initDownloadButton();
