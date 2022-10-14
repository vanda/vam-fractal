import OpenSeadragon from 'openseadragon';

const imageCarousel = document.querySelector('.b-image-carousel');
const concealRight = document.querySelector('.b-image-carousel__conceal-right');
const concealLeft = document.querySelector('.b-image-carousel__conceal-left');
const prevButton = Array.from(document.querySelectorAll('.b-image-carousel__prev'));
const nextButton = Array.from(document.querySelectorAll('.b-image-carousel__next'));
const totalNumberOfImages = document.querySelector('.b-image-overlay-detail__total-number-of-images');
const imageCounter = document.querySelector('.b-image-overlay-detail__current-image');
const imageRef = document.querySelector('.b-image-overlay__img-ref-number');
const copyrightNotice = document.querySelector('.b-image-overlay-detail__copyright-holder');
const contactModal = document.querySelector('.b-modal__description-license-contact');

const mobilePrevNextButtons = document.querySelectorAll('.b-image-overlay-detail__navigation-container > button');
const desktopPrevNextButtons = document.querySelectorAll('.b-image-carousel__prevnext > button');
let images = [];

if (imageCarousel) {
  images = (imageCarousel.dataset.images
    ? JSON.parse(imageCarousel.dataset.images) : { images: [] }).images;
}

if (imageCarousel && images.length) {
  const changeViewIndex = (index) => {
    const numberOfContainers = document.querySelectorAll('.b-image-carousel__image-preview-container').length;

    if (index > 0) {
      imageCarousel.dataset.viewIndex = index > (images.length - numberOfContainers)
        ? images.length - numberOfContainers : index;
    } else {
      imageCarousel.dataset.viewIndex = 0;
    }
  };

  const changeIndex = (index) => {
    imageCarousel.dataset.index = index;
  };

  const thumbs = images.map(({ imageId, alt }) => {
    const newImage = new Image();
    newImage.src = `https://framemark.vam.ac.uk/collections/${imageId}/full/!100,100/0/default.jpg`;
    newImage.alt = `thumbnail for ${alt}`;
    newImage.className = 'b-image-carousel__image-preview';
    return newImage;
  });

  const initImageCarouselContainers = (newSelection) => {
    const carouselContainers = Array.from(
      document.querySelectorAll('.b-image-carousel__image-preview-container'),
    );

    const viewIndex = parseInt(imageCarousel.dataset.viewIndex, 10);

    carouselContainers.forEach((container, i) => {
      const index = (viewIndex + i);

      container.classList.remove('b-image-carousel__image-preview-container--selected');

      if (index === parseInt(imageCarousel.dataset.index, 10)) {
        container.classList.add('b-image-carousel__image-preview-container--selected');
        if (newSelection) {
          container.focus();
        }
      }

      if (images[index].alt) {
        container.setAttribute('aria-label', `view ${images[index].alt}`);
      }

      if (container.firstElementChild) {
        container.firstElementChild.remove();
      }

      container.appendChild(thumbs[index]);

      container.addEventListener('click', () => { changeIndex(index); }, false);
    });
  };

  const osd = OpenSeadragon({
    element: document.querySelector('#js-image-overlay__osd'),
    showHomeControl: false,
    showFullPageControl: false,
    zoomInButton: 'js-image-overlay__zoomin',
    zoomOutButton: 'js-image-overlay__zoomout',
    showNavigator: true,
    navigatorId: 'js-image-overlay__zoomnavigator',
    navigatorDisplayRegionColor: '#b7b8bd',
    navigatorAutoFade: false,
  });
  const zoomNav = document.querySelector('#js-image-overlay__zoomnavigator');
  zoomNav.parentNode.parentNode.insertBefore(zoomNav, zoomNav.parentNode);
  zoomNav.parentNode.removeChild(zoomNav.nextSibling);

  const zoomIn = document.querySelector('.b-image-overlay-detail__zoom-in');
  const zoomOut = document.querySelector('.b-image-overlay-detail__zoom-out');

  document.addEventListener('click', (e) => {
    if (e.target.closest('.b-image-overlay-detail__zoom-in')) {
      if (osd.viewport.getZoom() === osd.viewport.getMaxZoom()) {
        zoomIn.classList.remove('b-image-overlay-detail__zoom-in--enabled');
      }
      zoomOut.classList.add('b-image-overlay-detail__zoom-out--enabled');
    } else if (e.target.closest('.b-image-overlay-detail__zoom-out')) {
      if (osd.viewport.getZoom() === osd.viewport.getMinZoom()) {
        zoomOut.classList.remove('b-image-overlay-detail__zoom-out--enabled');
      }
      zoomIn.classList.add('b-image-overlay-detail__zoom-in--enabled');
    }
  }, false);

  const osdArgs = {};

  const callback = (mutations) => {
    if (mutations.filter((mutation) => mutation.attributeName === 'data-view-index').length) {
      const viewIndex = parseInt(imageCarousel.dataset.viewIndex, 10);
      concealLeft.style.display = (viewIndex > 0) ? 'block' : 'none';
      concealRight.style.display = ((viewIndex + document.querySelectorAll('.b-image-carousel__image-preview-container').length) >= images.length) ? 'none' : 'block';
    }

    if (mutations.filter((mutation) => mutation.attributeName === 'data-image-id').length) {
      const { imageId } = imageCarousel.dataset.imageId;
      const imageIdIndex = images.findIndex((img) => img.imageId === imageId);
      if (imageIdIndex > -1) {
        changeIndex(imageIdIndex);
      }
    }

    if (mutations.filter((mutation) => mutation.attributeName === 'data-index').length) {
      const index = parseInt(imageCarousel.dataset.index, 10);

      changeViewIndex(index - Math.floor(document.querySelectorAll('.b-image-carousel__image-preview-container').length / 2));

      const newImage = images[index];
      osdArgs.tileSource = `https://framemark.vam.ac.uk/collections/${newImage.imageId}/info.json`;
      osd.world.removeAll();
      osd.addTiledImage(osdArgs);
      osd.viewport.fitHorizontally().fitVertically();

      contactModal.setAttribute('href', `mailto:vaimages@vam.ac.uk?subject=Image reference: ${newImage.ref}`);
      imageRef.innerHTML = newImage.ref;
      copyrightNotice.innerHTML = newImage.copyright;

      initImageCarouselContainers(true);

      if (window.innerWidth > 991) {
        if (index > 0) {
          desktopPrevNextButtons[0].removeAttribute('disabled');
        } else {
          desktopPrevNextButtons[0].setAttribute('disabled', 'true');
        }
        if ((index === images.length - 1)) {
          desktopPrevNextButtons[1].setAttribute('disabled', 'true');
        } else {
          desktopPrevNextButtons[1].removeAttribute('disabled');
        }
      } else {
        if (index > 0) {
          mobilePrevNextButtons[0].removeAttribute('disabled');
        } else {
          mobilePrevNextButtons[0].setAttribute('disabled', 'true');
        }
        if ((index === images.length - 1)) {
          mobilePrevNextButtons[1].setAttribute('disabled', 'true');
        } else {
          mobilePrevNextButtons[1].removeAttribute('disabled');
        }
      }
      imageCounter.innerHTML = `${index + 1}`;
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(imageCarousel, { attributes: true });

  document.addEventListener('keydown', (e) => {
    if (document.querySelector('.b-image-overlay__container--active')
      && document.activeElement !== osd.canvas) {
      if (e.key === 37) {
        const index = parseInt(imageCarousel.dataset.index, 10) - 1;
        if (index >= 0) {
          changeIndex(index);
        }
      }
      if (e.key === 39) {
        const index = parseInt(imageCarousel.dataset.index, 10) + 1;
        if (index < images.length) {
          changeIndex(index);
        }
      }
    }
  });

  const button = document.createElement('BUTTON');
  button.className = 'b-image-carousel__image-preview-container';
  button.innerHTML = '<div class="b-image-carousel__image-preview"></div>';

  const initImageCarousel = () => {
    totalNumberOfImages.innerHTML = images.length;

    if (!imageCarousel.dataset.index) {
      imageCarousel.dataset.index = 0;
    }

    if (!imageCarousel.dataset.viewIndex) {
      imageCarousel.dataset.viewIndex = 0;
    }

    if (imageCarousel) {
      if (window.innerWidth < 1200) {
        if (
          document.querySelectorAll('.b-image-carousel__image-preview-container').length > 3
          || document.querySelectorAll('.b-image-carousel__image-preview-container').length === 0
        ) {
          document.querySelector('.b-image-carousel__image-carousel').innerHTML = '';
          for (let i = 0; i < 3 && i !== images.length; i += 1) {
            document.querySelector('.b-image-carousel__image-carousel').appendChild(button.cloneNode(true));
          }
        }
      } else if (window.innerWidth > 1199) {
        if (
          (
            document.querySelectorAll('.b-image-carousel__image-preview-container').length < 5
            || document.querySelectorAll('.b-image-carousel__image-preview-container').length === 0
          )
          && images.length !== document.querySelectorAll('.b-image-carousel__image-preview-container').length
        ) {
          document.querySelector('.b-image-carousel__image-carousel').innerHTML = '';
          for (let i = 0; i < 5 && i !== images.length; i += 1) {
            document.querySelector('.b-image-carousel__image-carousel').appendChild(button.cloneNode(true));
          }
        }
      }
    }
  };

  const disableHiddenNavButtons = () => {
    if (window.innerWidth < 992) {
      mobilePrevNextButtons.forEach((el) => {
        el.removeAttribute('disabled');
      });

      desktopPrevNextButtons.forEach((el) => {
        el.setAttribute('disabled', 'true');
      });
    }

    if (window.innerWidth > 991) {
      mobilePrevNextButtons.forEach((el) => {
        el.setAttribute('disabled', 'true');
      });

      desktopPrevNextButtons.forEach((el) => {
        el.removeAttribute('disabled');
      });
    }
  };

  concealRight.onclick = () => {
    const viewIndex = parseInt(imageCarousel.dataset.viewIndex, 10) + 1;
    changeViewIndex(viewIndex);
    initImageCarouselContainers();
  };

  concealLeft.onclick = () => {
    const viewIndex = parseInt(imageCarousel.dataset.viewIndex, 10) - 1;
    changeViewIndex(viewIndex);
    initImageCarouselContainers();
  };

  prevButton.forEach((el) => {
    el.addEventListener('click', () => {
      const index = parseInt(imageCarousel.dataset.index, 10);
      changeIndex(index - 1);
    }, false);
  });

  nextButton.forEach((el) => {
    el.addEventListener('click', () => {
      const index = parseInt(imageCarousel.dataset.index, 10);
      changeIndex(index + 1);
    }, false);
  });

  window.addEventListener('resize', () => {
    initImageCarousel();
    changeIndex(parseInt(imageCarousel.dataset.index, 10));
    disableHiddenNavButtons();
    initImageCarouselContainers();
    zoomOut.classList.add('b-image-overlay-detail__zoom-out--enabled');
    zoomIn.classList.add('b-image-overlay-detail__zoom-in--enabled');
  });

  disableHiddenNavButtons();
  initImageCarousel();
  initImageCarouselContainers();
}
