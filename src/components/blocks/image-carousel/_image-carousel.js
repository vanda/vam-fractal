const imageCarousel = document.querySelector('.b-image-carousel');
const concealRight = document.querySelector('.b-image-carousel__conceal-right');
const concealLeft = document.querySelector('.b-image-carousel__conceal-left');
const prevButton = Array.from(document.querySelectorAll('.b-image-carousel__prev'));
const nextButton = Array.from(document.querySelectorAll('.b-image-carousel__next'));
const totalNumberOfImages = document.querySelector('.b-image-overlay-detail__total-number-of-images');
const imageCounter = document.querySelector('.b-image-overlay-detail__current-image');

const mobilePrevNextButtons = document.querySelectorAll('.b-image-overlay-detail__navigation-container button');
const desktopPrevNextButtons = document.querySelectorAll('.b-image-carousel__navigation-container button');
let images = [];

if (imageCarousel) {
  images = (imageCarousel ? JSON.parse(imageCarousel.dataset.images) : { images: [] }).images;
}

if (imageCarousel && images.length) {
  let image = document.querySelector('.b-image-overlay__image');

  const imagesWithImage = images.map(({ src, alt }) => {
    const newImage = new Image();
    newImage.src = src;
    newImage.alt = alt;
    newImage.className = 'b-image-overlay__image b-image-overlay__image--active';
    return newImage;
  });

  const changeViewIndex = (index) => {
    const numberOfContainers = document.querySelectorAll('.b-image-carousel__image-preview-container').length;
    if (index > 0) {
      imageCarousel.dataset.viewIndex = index > (images.length - numberOfContainers) ?
        images.length - numberOfContainers : index;
    } else {
      imageCarousel.dataset.viewIndex = 0;
    }
  };

  const changeIndex = (index) => {
    imageCarousel.dataset.index = index;
  };

  const thumbs = images.map(({ thumb, alt }) => {
    const newImage = new Image();
    newImage.src = thumb;
    newImage.alt = `thumbnail for ${alt}`;
    newImage.className = 'b-image-carousel__image-preview';
    return newImage;
  });

  const initImageCarouselContainers = (newSelection) => {
    const carouselContainers = Array.from(
      document.querySelectorAll('.b-image-carousel__image-preview-container')
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

      if (images[index]) {
        container.setAttribute('aria-label', `view ${images[index].alt}`);
      }

      if (container.firstElementChild) {
        container.firstElementChild.remove();
      }

      if (thumbs[index]) {
        container.appendChild(thumbs[index]);
      }


      container.onclick = () => {
        changeIndex(index);
      };
    });
  };

  const callback = (mutations) => {
    if (mutations.filter(mutation => mutation.attributeName === 'data-view-index').length) {
      const viewIndex = parseInt(imageCarousel.dataset.viewIndex, 10);
      concealLeft.style.display = (viewIndex > 0) ? 'block' : 'none';
      concealRight.style.display = ((viewIndex + document.querySelectorAll('.b-image-carousel__image-preview-container').length) >= images.length) ? 'none' : 'block';
    }

    if (mutations.filter(mutation => mutation.attributeName === 'data-index').length) {
      const index = parseInt(imageCarousel.dataset.index, 10);

      changeViewIndex(index - Math.floor(document.querySelectorAll('.b-image-carousel__image-preview-container').length / 2));

      const newImage = imagesWithImage[index];
      const imageParent = document.querySelector('.b-image-overlay__figure');

      image.remove();

      imageParent.appendChild(newImage);

      image = newImage;
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

  document.addEventListener('keydown', () => {
    if (event.keyCode === 37) {
      const index = parseInt(imageCarousel.dataset.index, 10) - 1;
      if (index >= 0) {
        changeIndex(index);
      }
    }
    if (event.keyCode === 39) {
      const index = parseInt(imageCarousel.dataset.index, 10) + 1;
      if (index < images.length) {
        changeIndex(index);
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
          document.querySelectorAll('.b-image-carousel__image-preview-container').length > 3 ||
          document.querySelectorAll('.b-image-carousel__image-preview-container').length === 0
        ) {
          document.querySelector('.b-image-carousel__image-carousel').innerHTML = '';
          for (let i = 0; i < 3 && i !== images.length; i += 1) {
            document.querySelector('.b-image-carousel__image-carousel').appendChild(button.cloneNode(true));
          }
        }
      } else if (window.innerWidth > 1199) {
        if (
          (
            document.querySelectorAll('.b-image-carousel__image-preview-container').length < 5 ||
            document.querySelectorAll('.b-image-carousel__image-preview-container').length === 0
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
    el.onclick = () => {
      const index = parseInt(imageCarousel.dataset.index, 10);
      changeIndex(index - 1);
    };
  });

  nextButton.forEach((el) => {
    el.onclick = () => {
      const index = parseInt(imageCarousel.dataset.index, 10);
      changeIndex(index + 1);
    };
  });

  window.addEventListener('resize', () => {
    initImageCarousel();
    changeIndex(parseInt(imageCarousel.dataset.index, 10));
    disableHiddenNavButtons();
    imageCarousel.dataset.index = imageCarousel.dataset.index;
    initImageCarouselContainers();
  });

  disableHiddenNavButtons();
  initImageCarousel();
  imageCarousel.dataset.index = imageCarousel.dataset.index;
  initImageCarouselContainers();
}
