function scrollcarousel (px) {
  const currentScroll = document.querySelector('.b-image-carousel__image-carousel').scrollLeft;
  document.querySelector('.b-image-carousel__image-carousel').scrollLeft = currentScroll + px;
}

function initImageCarousel () {
  if (document.querySelector('.b-image-carousel')) {
    const updateImageAndCounterEvent = (i = -1) => {
      if (i >= 0) {
        return new CustomEvent('updateimageandcounter', {
          bubbles: true,
          detail: {
            index: i
          }
        });
      }
      return new CustomEvent('updateimageandcounter', { bubbles: true });
    };

    const scrollPx = 160;
    const imageCarouselPreview = document.createElement('div');

    imageCarouselPreview.classList.add('b-image-carousel__image-preview-container');
    imageCarouselPreview.innerHTML = '<div class="b-image-carousel__image-preview"></div>';

    Array.from(document.querySelectorAll('.b-image-overlay__image')).forEach(
      (el, i) => {
        const cln = imageCarouselPreview.cloneNode(true);
        cln.setAttribute('data-image-index', i);
        document.querySelector('.b-image-carousel__image-carousel').appendChild(cln);
      }
    );

    if (document.querySelectorAll('.b-image-carousel__image-preview').length > 3) {
      Array.from(document.querySelectorAll('.b-image-carousel__navigation-container')).forEach(
        (e) => {
          e.style.display = 'block';
        }
      );

      document.querySelector('.b-image-carousel__conceal-right').style.display = 'block';
      document.querySelector('.b-image-carousel').classList.add('b-image-carousel--conceal');
    }

    Array.from(document.querySelectorAll('.b-image-carousel__image-preview-container')).forEach(
      (el, i) => {
        el.onclick = (e) => {
          e.preventDefault();
          e.target.dispatchEvent(updateImageAndCounterEvent(i));
        };

        if (i === 0) {
          el.dispatchEvent(updateImageAndCounterEvent(i));
        }

        const imgSrc = document.querySelector(`img[data-image-index='${i}']`).getAttribute('src');

        el.querySelector('.b-image-carousel__image-preview').style.background = `url('${imgSrc}')`;
        el.querySelector('.b-image-carousel__image-preview').style.backgroundSize = 'cover';
      }
    );

    if (document.querySelector('.b-image-carousel__image-carousel')) {
      document.querySelector('.b-image-carousel__next').onclick = () => {
        scrollcarousel(scrollPx);
      };
      document.querySelector('.b-image-carousel__prev').onclick = () => {
        scrollcarousel(-scrollPx);
      };
    }

    const concealcarousel = document.querySelector('.b-image-carousel--conceal .b-image-carousel__image-carousel');

    document.addEventListener('keydown', () => {
      const currentElementScroll = (parseInt(document.querySelector('.b-image-carousel__image-preview-container--selected').getAttribute('data-image-index'), 10) + 1) * 122;
      const carouselScroll = document.querySelector('.b-image-carousel__image-carousel').scrollLeft;
      const carouselWidth = document.querySelector('.b-image-carousel__image-carousel').offsetWidth;
      if (event.keyCode === 37) {
        document.querySelector('.b-image-carousel__image-carousel').dispatchEvent(new CustomEvent('updateimageandcounter', { detail: { opr: '-' }, bubbles: true }));
        if ((currentElementScroll - scrollPx - 122) < carouselScroll) {
          scrollcarousel(-scrollPx);
        }
      }
      if (event.keyCode === 39) {
        document.querySelector('.b-image-carousel__image-carousel').dispatchEvent(new CustomEvent('updateimageandcounter', { detail: { opr: '+' }, bubbles: true }));
        if ((currentElementScroll + scrollPx) > (carouselScroll + carouselWidth)) {
          scrollcarousel(scrollPx);
        }
      }
    });

    if (concealcarousel) {
      const concealLeft = document.querySelector('.b-image-carousel__conceal-left');
      const concealRight = document.querySelector('.b-image-carousel__conceal-right');
      const buttonLeft = document.querySelector('.b-image-carousel__prev');
      const buttonRight = document.querySelector('.b-image-carousel__next');

      concealLeft.onclick = (e) => {
        e.preventDefault();
        scrollcarousel(-scrollPx);
      };

      concealRight.onclick = (e) => {
        e.preventDefault();
        scrollcarousel(scrollPx);
      };

      concealcarousel.addEventListener('scroll', (e) => {
        const scrollLeft = e.target.scrollLeft;
        const scrollWidth = e.target.scrollWidth;
        const width = e.target.offsetWidth;

        /* controlling the buttons */
        if (scrollLeft === 0) {
          document.querySelector('.b-image-carousel__conceal-left').style.display = 'none';
          buttonLeft.classList.remove('b-image-carousel__prev--enabled');
        } else if (scrollLeft > 0) {
          document.querySelector('.b-image-carousel__conceal-left').style.display = 'block';
          buttonLeft.classList.add('b-image-carousel__prev--enabled');
        }
        /* controlling the buttons */
        if (scrollLeft === (scrollWidth - width)) {
          document.querySelector('.b-image-carousel__conceal-right').style.display = 'none';
          buttonRight.classList.remove('b-image-carousel__next--enabled');
        } else if (scrollLeft < (scrollWidth - width)) {
          document.querySelector('.b-image-carousel__conceal-right').style.display = 'block';
          buttonRight.classList.add('b-image-carousel__next--enabled');
        }
      });
    }
  }
}

initImageCarousel();
