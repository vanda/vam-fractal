const offensiveConcealer = () => {
  if (document.querySelector('.b-image-overlay__preview-concealer')) {
    document.querySelector('.b-image-overlay__preview-concealer').onclick = (e) => {
      e.stopPropagation();
    };
    document.querySelector('.b-image-overlay__preview-concealer-button').onclick = (e) => {
      e.stopPropagation();
      document.querySelector('.b-image-overlay__preview--offensive').classList.remove('b-image-overlay__preview--offensive');
      document.querySelector('.b-image-overlay__preview-concealer').remove();
    };
  }
};

const openObjectOverlay = () => {
  document.querySelector('.b-image-overlay__container').classList.add('b-image-overlay__container--active');
  document.querySelector('body').style.overflowY = 'hidden';
  const scrollY = window.pageYOffset;
  document.querySelector('.b-image-overlay__container').style.top = `${scrollY}px`;
  document.querySelector('.b-image-carousel__image-preview-container').focus();
};

const closeObjectOverlay = () => {
  document.querySelector('.b-image-overlay__container').classList.remove('b-image-overlay__container--active');
  document.querySelector('body').style.overflowY = 'auto';
};

const initObjectOverlay = () => {
  offensiveConcealer();

  if (document.querySelector('.b-image-overlay')) {
    document.querySelector('.b-image-overlay__close-container').onclick = () => closeObjectOverlay();

    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        if (!document.querySelector('.b-image-overlay').classList.contains('b-image-overlay--unfocus')) {
          closeObjectOverlay();
        } else {
          document.querySelector('.b-image-overlay').classList.remove('b-image-overlay--unfocus');
        }
      }

      if (
        !document.querySelector('.b-image-overlay').classList.contains('b-image-overlay--unfocus') &&
        e.keyCode === 9
      ) {
        // stackoverflow answer 60031728
        const focusable = Array.from(document.querySelector('.b-image-overlay__content').querySelectorAll('button')).filter(
          el => !el.getAttribute('disabled')
        ).filter(
          el => !el.closest('.js-modal')
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
    });

    document.querySelector('.b-image-overlay').addEventListener('openObjectOverlay', openObjectOverlay);

    document.querySelector('.b-image-overlay__container').addEventListener('jsModalOpen', () => {
      document.querySelector('.b-image-overlay__close-container').style.display = 'none';
    });

    document.querySelector('.b-image-overlay__container').addEventListener('jsModalClosed', () => {
      document.querySelector('.b-image-overlay__close-container').style.display = 'block';
    });

    Array.from(document.querySelectorAll('.b-image-overlay__preview')).forEach((el) => {
      el.onclick = (e) => {
        e.preventDefault();
        if (!e.target.classList.contains('b-image-overlay__preview--offensive')) {
          e.target.dispatchEvent(new CustomEvent('openObjectOverlay', { bubbles: true }));
        }
      };
    });
  }
};

initObjectOverlay();
