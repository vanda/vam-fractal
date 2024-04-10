const container = document.querySelector('.b-carousel__track');

if (container) {
  const slides = container.querySelectorAll('.b-carousel__item');
  const slideCount = slides.length;
  let activeSlide = slideCount - 1;

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
    container.style.height = `${greatestHeight}px`;

    slides.forEach((slide) => {
      slide.classList.add('b-carousel__item--absolute');
    });

    // Add active class to the initial slide (last)
    slides[slides.length - 1].classList.add('b-carousel__item--active');
  };

  window.addEventListener('resize', () => {
    initCarousel();
  });

  initCarousel();

  // Determine which slide to show based on the direction
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
    });

    slides[activeSlide].classList.add('b-carousel__item--active');
  };

  const nextButton = document.querySelector('.u-btn--navigation--next');
  const prevButton = document.querySelector('.u-btn--navigation--prev');
  nextButton.addEventListener('click', () => navigateCarousel('next'));
  prevButton.addEventListener('click', () => navigateCarousel('prev'));
}
