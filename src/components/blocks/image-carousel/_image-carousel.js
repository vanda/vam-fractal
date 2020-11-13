const imageCarousel = document.querySelector('.b-image-carousel');
const concealRight = document.querySelector('.b-image-carousel__conceal-right');
const concealLeft = document.querySelector('.b-image-carousel__conceal-left');
const prevButton = document.querySelector('.b-image-carousel__prev');
const nextButton = document.querySelector('.b-image-carousel__next');
const totalNumberOfImages = document.querySelector('.b-image-overlay-detail__total-number-of-images');
const imageCounter = document.querySelector('.b-image-overlay-detail__current-image');

let image = document.querySelector('.b-image-overlay__image');

const { images } = imageCarousel ? JSON.parse(imageCarousel.dataset.images) : {};

const imagesWithImage = images.map(({ src, alt }) => {
  const newImage = new Image();
  newImage.src = src;
  newImage.alt = alt;
  newImage.className = 'b-image-overlay__image b-image-overlay__image--active'
  return newImage;
});

const thumbs = images.map(({ thumb, alt }) => {
  const newImage = new Image();
  newImage.src = thumb;
  newImage.alt = `thumbnail for ${alt}`;
  newImage.className = 'b-image-carousel__image-preview'
  return newImage;
});

const changeViewIndex = (index) => {
  imageCarousel.dataset.viewIndex = ((images.length - Math.max(0, index - 2)) < 5) ? images.length - 5 : Math.max(0, index - 2);
}
const changeIndexAndViewIndex = (index) => {
  changeViewIndex(index);
  imageCarousel.dataset.index = index;
}

const initImageCourselContainers = () => {
  const carouselContainers = Array.from(document.querySelectorAll('.b-image-carousel__image-preview-container'));

  const viewIndex = parseInt(imageCarousel.dataset.viewIndex, 10)
  const imagesInView = images.slice(viewIndex, viewIndex + 5);

  carouselContainers.forEach((container, i) => {
    let index = (parseInt(imageCarousel.dataset.viewIndex, 10) + i);

    container.classList.remove('b-image-carousel__image-preview-container--selected');

    if (index === parseInt(imageCarousel.dataset.index)) {
      container.classList.add('b-image-carousel__image-preview-container--selected');
    }

    if (container.firstElementChild) {
      container.firstElementChild.remove();
    }

    container.appendChild(thumbs[index]);

    container.onclick = (e) => {
      changeIndexAndViewIndex(index);
    };
  });
}

const initImageCarousel = () => {
  totalNumberOfImages.innerHTML = images.length;

  if (!imageCarousel.dataset.index) {
    imageCarousel.dataset.index = 0;
  }

  if (!imageCarousel.dataset.viewIndex) {
    imageCarousel.dataset.viewIndex = 0;
  }

  if (imageCarousel) {
    for (let i = 0; i < Math.max(0, 5 - images.length); i++) {
      document.querySelector('.b-image-carousel__image-preview-container').remove();
    }

    initImageCourselContainers();

    const callback = (mutations) => {
      if (mutations.filter(mutation => mutation.attributeName === 'data-view-index')) {
        const viewIndex = parseInt(imageCarousel.dataset.viewIndex);
        concealLeft.style.display = (viewIndex > 0) ? 'block' : 'none';
        concealRight.style.display = (viewIndex + 5 >= images.length) ? 'none' : 'block';
      }

      if (mutations.filter(mutation => mutation.attributeName === 'data-index')) {
        const index = parseInt(imageCarousel.dataset.index);
        const selectedImg = images[index];

        const newImage = imagesWithImage[index];
        const imageParent = document.querySelector('.b-image-overlay__figure');

        image.remove();

        imageParent.appendChild(newImage);

        image = newImage;
        initImageCourselContainers();

        if (index > 0) {
          prevButton.removeAttribute('disabled');
        } else {
          prevButton.setAttribute('disabled', 'true');
        }

        if (index === images.length - 1) {
          nextButton.setAttribute('disabled', 'true');
        } else {
          nextButton.removeAttribute('disabled');
        }

        imageCounter.innerHTML = `${index + 1}`;
      }
    }

    const observer = new MutationObserver(callback);
    observer.observe(imageCarousel, { attributes: true });
    imageCarousel.dataset.viewIndex = 0;
    imageCarousel.dataset.index = 0;
  }

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

  concealRight.onclick = (e) => {
    const viewIndex = parseInt(imageCarousel.dataset.viewIndex, 10) + 1;
    imageCarousel.dataset.viewIndex = viewIndex;
    initImageCourselContainers();
  };

  concealLeft.onclick = (e) => {
    const viewIndex = parseInt(imageCarousel.dataset.viewIndex, 10) - 1;
    imageCarousel.dataset.viewIndex = viewIndex;
    initImageCourselContainers();
  };

  prevButton.onclick = (e) => {
    const index = parseInt(imageCarousel.dataset.index, 10);
    changeIndexAndViewIndex(index - 1);
  }

  nextButton.onclick = (e) => {
    const index = parseInt(imageCarousel.dataset.index, 10);
    changeIndexAndViewIndex(index + 1);
  }
}

initImageCarousel();
