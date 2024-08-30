const isMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () => (
    isMobile.Android()
    || isMobile.BlackBerry()
    || isMobile.iOS()
    || isMobile.Opera()
    || isMobile.Windows()
  ),
};

const imageOverlayContainer = document.querySelector('.b-image-overlay__container');
const body = document.querySelector('body');
const figCaption = document.querySelector('.b-image-overlay__figcaption');

const offensiveConcealer = () => {
  if (document.querySelector('.b-image-overlay__preview-concealer')) {
    document.querySelector('.b-image-overlay__preview-concealer').onclick = (e) => {
      e.stopPropagation();
    };
    document.querySelector('.b-image-overlay__preview-concealer-button').onclick = (e) => {
      e.stopPropagation();
      document.querySelector('.b-image-overlay__preview--offensive').classList.remove('b-image-overlay__preview--offensive');
      document.querySelector('.b-image-overlay__preview-image--offensive').classList.remove('b-image-overlay__preview-image--offensive');
      document.querySelector('.b-image-overlay__preview-concealer').remove();
      document.querySelectorAll('.b-image-overlay__preview--hidden').forEach((el) => el.classList.remove('b-image-overlay__preview--hidden'));
    };
  }
};

const openObjectOverlay = () => {
  imageOverlayContainer.classList.add('b-image-overlay__container--active');
  body.style.overflowY = 'hidden';
  imageOverlayContainer.style.height = `${window.innerHeight}px`;
  if (window.innerWidth <= 1000 && isMobile.any()) {
    body.style.position = 'fixed';
    figCaption.style.marginBottom = `${window.screen.height - window.innerHeight}px`;
  } else {
    figCaption.style.marginBottom = '0px';
  }
  document.querySelector('.b-image-carousel__image-preview-container').focus();
};

const closeObjectOverlay = () => {
  document.querySelector('.b-image-overlay__container').classList.remove('b-image-overlay__container--active');
  document.querySelector('body').style.overflowY = 'auto';
  document.querySelector('body').style.position = 'relative';
};

const initObjectOverlay = () => {
  offensiveConcealer();

  if (document.querySelector('.b-image-overlay')) {
    document.querySelector('.b-image-overlay__close-container').onclick = () => closeObjectOverlay();

    window.addEventListener('resize', () => {
      imageOverlayContainer.style.height = `${window.innerHeight}px`;
      // what follows is a hack for mobile phone browsers, if this does not look good on desktop,
      // trust me it works on phones...
      if (window.innerWidth <= 1000 && isMobile.any()) {
        figCaption.style.marginBottom = `${window.screen.height - window.innerHeight}px`;
      } else {
        figCaption.style.marginBottom = '0px';
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!document.querySelector('.b-image-overlay').classList.contains('b-image-overlay--unfocus')) {
          closeObjectOverlay();
        } else {
          document.querySelector('.b-image-overlay').classList.remove('b-image-overlay--unfocus');
        }
      }

      if (!document.querySelector('.b-image-overlay').classList.contains('b-image-overlay--unfocus')
        && e.key === 'Tab'
      ) {
        // stackoverflow answer 60031728
        const focusable = Array.from(document.querySelector('.b-image-overlay__content').querySelectorAll('button')).filter(
          (el) => !el.getAttribute('disabled'),
        ).filter(
          (el) => !el.closest('.js-modal'),
        ).filter(
          (el) => el.offsetHeight > 0,
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

    document.addEventListener('click', (e) => {
      if (e.target.closest('.b-image-overlay__figcaption__handle')) {
        figCaption.classList.toggle('b-image-overlay__figcaption--shut');
      }
    }, false);
  }
};

initObjectOverlay();
