const carousel = document.querySelector('.b-carousel__track');

if (carousel) {
  const slides = carousel.querySelectorAll('.b-carousel__item');
  const slideCount = slides.length;
  let activeSlide = 0;

  const initCarousel = () => {
    let greatestHeight = 0;

    slides.forEach((slide) => {
      // Reset slide position to get the actual height
      slide.classList.remove('b-carousel__item--absolute');
      const slideHeight = slide.offsetHeight;

      if (slideHeight > greatestHeight) {
        greatestHeight = slideHeight;
      }
    });

    // Set container height to that of the tallest slide
    carousel.style.height = `${greatestHeight}px`;

    slides.forEach((slide) => {
      slide.classList.add('b-carousel__item--absolute');
      slide.querySelector('.b-carousel__item-link').setAttribute('tabindex', -1);
    });

    // Add active class to the initial slide
    slides[0].classList.add('b-carousel__item--active');
    slides[0].querySelector('.b-carousel__item-link').removeAttribute('tabindex');
  };

  initCarousel();

  window.addEventListener('resize', () => {
    initCarousel();
  });

  const navigateCarousel = (direction) => {
    if (direction === 'prev') {
      activeSlide -= 1;

      if (activeSlide < 0) {
        activeSlide = slideCount - 1;
      }
    } else {
      activeSlide += 1;

      if (activeSlide >= slideCount) {
        activeSlide = 0;
      }
    }

    slides.forEach((slide) => {
      slide.classList.remove('b-carousel__item--active');
      slide.querySelector('.b-carousel__item-link').setAttribute('tabindex', -1);
    });

    slides[activeSlide].classList.add('b-carousel__item--active');
    slides[activeSlide].querySelector('.b-carousel__item-link').removeAttribute('tabindex');
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('.b-carousel__navigation-prev')) {
      navigateCarousel('prev');
    } else if (e.target.closest('.b-carousel__navigation-next')) {
      navigateCarousel('next');
    }
  });

  const keyHandle = (e) => {
    if (document.activeElement.closest('.b-carousel__item')) {
      if (e.key === 'ArrowLeft') {
        navigateCarousel('prev');
      } else if (e.key === 'ArrowRight') {
        navigateCarousel('next');
      }
    } else if (document.activeElement.closest('[class^="b-carousel__navigation"]')
    && e.key === 'Enter') {
      // on keyboard navigation using prev/next buttons, move focus to newly selected item,
      // otherwise tabbing sequence is broken (unavoidable consequence of design)
      if (document.activeElement.classList.contains('b-carousel__navigation-prev')) {
        navigateCarousel('prev');
      } else {
        navigateCarousel('next');
      }
      slides[activeSlide].querySelector('.b-carousel__item-link').focus();
    }
  };
  document.addEventListener('keydown', keyHandle);

  carousel.ontouchstart = (e) => {
    const startXY = [e.touches[0].pageX, e.touches[0].pageY];
    carousel.ontouchmove = (e2) => {
      const deltaXY = [e2.touches[0].pageX - startXY[0], e2.touches[0].pageY - startXY[1]];
      if (Math.abs(deltaXY[0]) > Math.abs(deltaXY[1])) {
        carousel.ontouchmove = null;
        if (deltaXY[0] > 0) {
          navigateCarousel('prev');
        } else {
          navigateCarousel('next');
        }
      }
    };
  };
}
