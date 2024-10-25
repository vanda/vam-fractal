/* Carousel initialiser fn.
 * Separate control buttons can be passed in as optional param,
 * otherwise will check for them nested inside the component */
const carouselInit = (carousel, ctrls = carousel.querySelector('.b-carousel__ctrls')) => {
  const items = carousel.querySelectorAll('.b-carousel__item');

  /* Carousel logic only required for > 1 item */
  if (items.length > 1) {
    const viewport = carousel.querySelector('.b-carousel__viewport');
    const list = carousel.querySelector('.b-carousel__list');
    carousel._activeIndex = 0;
    let itemsOffset = 0;

    /* initialise with first item active */
    items[carousel._activeIndex].classList.add('js-carousel__item--active');

    /* ensure each item is tabbable if it's not by virtue of its contents */
    const tabbableContentQry = 'a[href], button:enabled';
    Array.from(items, (item) => {
      if (!item.querySelector(tabbableContentQry)) {
        item.setAttribute('tabindex', 0);
      }
      return true;
    });

    /* function for setting the active item
      * and scrolling into view, if required */
    carousel._setActiveItem = (item) => {
      list.querySelector('.js-carousel__item--active').classList.remove('js-carousel__item--active');
      item.classList.add('js-carousel__item--active');

      /* move active item into view */
      carousel._activeIndex = Array.prototype.indexOf.call(items, item);
      itemsOffset = carousel._activeIndex * (items[1].offsetLeft - items[0].offsetLeft);
      /* last item needs special right-alignment */
      if (carousel._activeIndex === items.length - 1) {
        itemsOffset -= ((1 - (item.offsetWidth / carousel.offsetWidth)) * carousel.offsetWidth);
      }
      carousel.style.setProperty('--items-offset', `-${itemsOffset}px`);

      /* dispatch an event to be heard by the detachable buttons
        * and anything else that needs it */
      carousel.dispatchEvent(new CustomEvent('itemChange', { detail: { activeIndex: Array.prototype.indexOf.call(items, item) } }));
    };

    /* on Tabbing into an item set item active, if not already.
     * requires item to be a tabbable element.
     * can't use focusin listener here, as it would activate the item
     * before the click listener below does its check */
    viewport.addEventListener('keyup', (e) => {
      if (e.key === 'Tab' && e.target.closest('.b-carousel__item:not(.js-carousel__item--active)')) {
        carousel._setActiveItem(e.target.closest('.b-carousel__item'));
      }
    });

    /* onClick set active item if not already active
     * else default click is allowed through */
    viewport.addEventListener('click', (e) => {
      if (e.target.closest('.b-carousel__item:not(.js-carousel__item--active)')) {
        e.preventDefault();
        carousel._setActiveItem(e.target.closest('.b-carousel__item'));
      }
    });

    /* add swipe gesture support */
    viewport.ontouchstart = (e) => {
      const startXY = [e.touches[0].pageX, e.touches[0].pageY];
      viewport.ontouchmove = (e2) => {
        const deltaXY = [e2.touches[0].pageX - startXY[0], e2.touches[0].pageY - startXY[1]];
        if (Math.abs(deltaXY[0]) > Math.abs(deltaXY[1])
          && (
            (deltaXY[0] < 0 && carousel._activeIndex < items.length - 1)
            || (deltaXY[0] > 0 && carousel._activeIndex > 0)
          )) {
          /* if touch moves significantly horizontally
            * activate prev/next item swipe */
          if (Math.abs(deltaXY[0]) > 74) {
            viewport.ontouchmove = null;
            if (deltaXY[0] < 0) {
              carousel._setActiveItem(items[carousel._activeIndex + 1]);
            } else {
              carousel._setActiveItem(items[carousel._activeIndex - 1]);
            }
          } else {
            /* else just drag */
            carousel.style.setProperty('--items-offset', `${deltaXY[0] - itemsOffset}px`);
            viewport.ontouchend = () => {
              carousel._setActiveItem(items[carousel._activeIndex]);
              viewport.ontouchend = null;
            };
          }
        }
      };
    };

    /* re-centre active item on resize */
    window.addEventListener('resize', () => {
      carousel._setActiveItem(items[carousel._activeIndex]);
    });

    /* initialise carousel control buttons */
    if (ctrls) {
      const ctrlsAboveViewport = (ctrls.compareDocumentPosition(carousel.querySelector('.b-carousel__viewport')) === 4);

      ctrls.classList.add('b-carousel__ctrls--active');

      const prev = ctrls.querySelector('.js-carousel__ctrl--prev');
      const next = ctrls.querySelector('.js-carousel__ctrl--next');

      prev.setAttribute('disabled', 'true');

      /* onClick: focus relevant item */
      ctrls.addEventListener('click', (e) => {
        if (e.target === prev) {
          carousel._setActiveItem(items[carousel._activeIndex - 1]);
        } else if (e.target === next) {
          carousel._setActiveItem(items[carousel._activeIndex + 1]);
          if (ctrlsAboveViewport) {
            /* if last item is now active, the next btn becomes disabled,
            * so move lost focus to the active carousel item */
            if (carousel._activeIndex === items.length - 1) {
              if (items[carousel._activeIndex].tabIndex > -1) {
                items[carousel._activeIndex].focus();
              } else {
                items[carousel._activeIndex].querySelector(tabbableContentQry).focus();
              }
            }
          }
        }
      });

      /* deactivate inapropriate btn based on new state of carousel */
      carousel.addEventListener('itemChange', () => {
        prev.removeAttribute('disabled');
        next.removeAttribute('disabled');
        if (carousel._activeIndex === 0) {
          prev.setAttribute('disabled', 'true');
        } else if (carousel._activeIndex === items.length - 1) {
          next.setAttribute('disabled', 'true');
        }
      });

      if (ctrlsAboveViewport) {
        /* tabbing forward off next btn focusses on whichever item is active */
        next.addEventListener('keydown', (e) => {
          if (e.key === 'Tab' && !e.shiftKey) {
            items[carousel._activeIndex].focus();
          }
        });
      }
    }
  }

  return true;
};

export default carouselInit;
