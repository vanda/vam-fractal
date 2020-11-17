const imageCarousel = document.querySelector('.b-image-carousel');
const concealRight = document.querySelector('.b-image-carousel__conceal-right');
const concealLeft = document.querySelector('.b-image-carousel__conceal-left');
const prevButton = Array.from(document.querySelectorAll('.b-image-carousel__prev'));
const nextButton = Array.from(document.querySelectorAll('.b-image-carousel__next'));
const totalNumberOfImages = document.querySelector('.b-image-overlay-detail__total-number-of-images');
const imageCounter = document.querySelector('.b-image-overlay-detail__current-image');

const mobilePrevNextButtons = document.querySelectorAll('.b-image-overlay-detail__navigation-container button');
const desktopPrevNextButtons = document.querySelectorAll('.b-image-carousel__navigation-container button');


if (imageCarousel) {
  let image = document.querySelector('.b-image-overlay__image');
  const { images } = imageCarousel ? JSON.parse(imageCarousel.dataset.images) : {};

  const imagesWithImage = images.map(({ src, alt }) => {
    const newImage = new Image();
    newImage.src = src;
    newImage.alt = alt;
    newImage.className = 'b-image-overlay__image b-image-overlay__image--active'
    return newImage;
  });

  const changeViewIndex = (index) => {
    imageCarousel.dataset.viewIndex = ((images.length - Math.max(0, index - (Math.floor(document.querySelectorAll('.b-image-carousel__image-preview-container').length / 2)))) < document.querySelectorAll('.b-image-carousel__image-preview-container').length) ? images.length - document.querySelectorAll('.b-image-carousel__image-preview-container').length : Math.max(0, index - (Math.floor(document.querySelectorAll('.b-image-carousel__image-preview-container').length / 2)));
  }
  const changeIndexAndViewIndex = (index) => {
    changeViewIndex(index);
    imageCarousel.dataset.index = index;
  }

  const thumbs = images.map(({ thumb, alt }) => {
    const newImage = new Image();
    newImage.src = thumb;
    newImage.alt = `thumbnail for ${alt}`;
    newImage.className = 'b-image-carousel__image-preview'
    return newImage;
  });

  concealRight.onclick = (e) => {
    const viewIndex = parseInt(imageCarousel.dataset.viewIndex, 10) + 1;
    imageCarousel.dataset.viewIndex = viewIndex;
    initImageCarouselContainers();
  };

  concealLeft.onclick = (e) => {
    const viewIndex = parseInt(imageCarousel.dataset.viewIndex, 10) - 1;
    imageCarousel.dataset.viewIndex = viewIndex;
    initImageCarouselContainers();
  };

  prevButton.forEach((el) => {
   el.onclick = () => {
      const index = parseInt(imageCarousel.dataset.index, 10);
      changeIndexAndViewIndex(index - 1);
    };
  });

  nextButton.forEach((el) => {
    el.onclick = () => {
      const index = parseInt(imageCarousel.dataset.index, 10);
      changeIndexAndViewIndex(index + 1);
    };
  });

  const callback = (mutations) => {
    if (mutations.filter(mutation => mutation.attributeName === 'data-view-index')) {
      const viewIndex = parseInt(imageCarousel.dataset.viewIndex);
      concealLeft.style.display = (viewIndex > 0) ? 'block' : 'none';
      concealRight.style.display = (viewIndex + document.querySelectorAll('.b-image-carousel__image-preview-container').length >= images.length) ? 'none' : 'block';
    }

    if (mutations.filter(mutation => mutation.attributeName === 'data-index')) {
      const index = parseInt(imageCarousel.dataset.index);
      const selectedImg = images[index];

      const newImage = imagesWithImage[index];
      const imageParent = document.querySelector('.b-image-overlay__figure');

      image.remove();

      imageParent.appendChild(newImage);

      image = newImage;
      initImageCarouselContainers(true);

      if (index > 0) {
        if (window.innerWidth > 991) {
          desktopPrevNextButtons[0].removeAttribute('disabled');
        } else {
          mobilePrevNextButtons[0].removeAttribute('disabled');
        }
      } else {
        if (window.innerWidth > 991) {
          desktopPrevNextButtons[0].setAttribute('disabled', 'true');
        } else {
          mobilePrevNextButtons[0].setAttribute('disabled', 'true');
        }
      }

      if (index === images.length - 1) {
        if (window.innerWidth > 991) {
          desktopPrevNextButtons[1].setAttribute('disabled', 'true');
        } else {
          mobilePrevNextButtons[1].setAttribute('disabled', 'true');
        }
      } else {
        if (window.innerWidth > 991) {
          desktopPrevNextButtons[1].removeAttribute('disabled');
        } else {
          mobilePrevNextButtons[1].removeAttribute('disabled');
        }
      }

      imageCounter.innerHTML = `${index + 1}`;
    }
  }

  const observer = new MutationObserver(callback);
  observer.observe(imageCarousel, { attributes: true });

  document.addEventListener('keydown', () => {
    if (event.keyCode === 37) {
      const index = parseInt(imageCarousel.dataset.index, 10) - 1;
      if (index >= 0) {
        changeIndexAndViewIndex(index);
      }
    }
    if (event.keyCode === 39) {
     const index = parseInt(imageCarousel.dataset.index, 10) + 1;
     if (index < images.length) {
      changeIndexAndViewIndex(index);
     }
    }
  });

  const initImageCarouselContainers = (newSelection) => {
    const carouselContainers = Array.from(document.querySelectorAll('.b-image-carousel__image-preview-container'));

    const viewIndex = parseInt(imageCarousel.dataset.viewIndex, 10)
    const imagesInView = images.slice(viewIndex, viewIndex + document.querySelectorAll('.b-image-carousel__image-preview-container').length);

    carouselContainers.forEach((container, i) => {
      let index = (parseInt(imageCarousel.dataset.viewIndex, 10) + i);

      container.classList.remove('b-image-carousel__image-preview-container--selected');

      if (index === parseInt(imageCarousel.dataset.index, 10)) {
        container.classList.add('b-image-carousel__image-preview-container--selected');
        if (newSelection) {
          container.focus();
        }
      }

      container.setAttribute('aria-label', `view ${images[index].alt}`)

      if (container.firstElementChild) {
        container.firstElementChild.remove();
      }

      container.appendChild(thumbs[index]);

      container.onclick = (e) => {
        changeIndexAndViewIndex(index);
      };
    });
  }

  const initImageCarousel = (resize = false) => {
    totalNumberOfImages.innerHTML = images.length;

    if (!imageCarousel.dataset.index) {
      imageCarousel.dataset.index = 0;
    }

    if (!imageCarousel.dataset.viewIndex) {
      imageCarousel.dataset.viewIndex = 0;
    }

    if (imageCarousel) {
      for (let i = 0; i < Math.max(0, document.querySelectorAll('.b-image-carousel__image-preview-container').length - images.length); i++) {
        document.querySelector('.b-image-carousel__image-preview-container').remove();
      }

      if (!resize) {
        imageCarousel.dataset.viewIndex = 0;
        imageCarousel.dataset.index = 0;
      } else {
        changeIndexAndViewIndex(parseInt(imageCarousel.dataset.index));
      }

      initImageCarouselContainers();
    }
  }

  const button = document.createElement('BUTTON');
  button.className = 'b-image-carousel__image-preview-container';
  button.innerHTML = '<div class="b-image-carousel__image-preview"></div>';

  const responsiveImageContainerAction = () => {
    if (window.innerWidth < 1200) {
      if (document.querySelectorAll('.b-image-carousel__image-preview-container').length > 3) {
        document.querySelector('.b-image-carousel__image-carousel').innerHTML = '';
        for (let i = 0; i < 3 && i != images.length; i++) {
          document.querySelector('.b-image-carousel__image-carousel').appendChild(button.cloneNode(true));
        }
        initImageCarousel(true);
      }
    }

    if (window.innerWidth > 1199) {
      if (document.querySelectorAll('.b-image-carousel__image-preview-container').length < 5 && images.length != document.querySelectorAll('.b-image-carousel__image-preview-container').length) {
        document.querySelector('.b-image-carousel__image-carousel').innerHTML = '';
        for (let i = 0; i < 5 && i != images.length; i++) {
          document.querySelector('.b-image-carousel__image-carousel').appendChild(button.cloneNode(true));
        }
        initImageCarousel(true);
      }
    }
  }

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

  window.onresize = () => {
    responsiveImageContainerAction();
    disableHiddenNavButtons();
    imageCarousel.dataset.index = imageCarousel.dataset.index;
  };

  responsiveImageContainerAction();
  disableHiddenNavButtons();
  initImageCarousel();
  imageCarousel.dataset.index = imageCarousel.dataset.index;
}
