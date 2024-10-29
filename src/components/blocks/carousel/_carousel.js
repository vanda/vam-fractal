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

    /* ensure each item is tabbable for keyboard navigation */
    Array.from(items, (item) => {
      item.setAttribute('tabindex', 0);
      return true;
    });

    /* fn to set size & template alignment params */
    let itemsPerView = 1;
    const setTemplateParams = () => {
      /* set template alignment and max-widths in CSS
      * based on parent element width in the document */
      carousel.style.setProperty('--template-width', `${carousel.offsetWidth}px`);

      /* derive number of items shown per carousel view
      * from the CSS variable set in the styles per breakpoint */
      itemsPerView = parseInt(window.getComputedStyle(carousel).getPropertyValue('--items-per-view'), 10);
    };
    setTemplateParams();

    /* fn for setting the active item
      * and scrolling into view, if required */
    carousel._setActiveItem = (item) => {
      list.querySelector('.js-carousel__item--active').classList.remove('js-carousel__item--active');
      item.classList.add('js-carousel__item--active');

      /* move active item into view */
      carousel._activeIndex = Array.prototype.indexOf.call(items, item);
      const itemSpan = items[1].offsetLeft - items[0].offsetLeft;
      itemsOffset = carousel._activeIndex * itemSpan;
      /* last items need special right-alignment */
      if (carousel._activeIndex >= items.length - itemsPerView) {
        itemsOffset -= ((1 - (item.offsetWidth / carousel.offsetWidth)) * carousel.offsetWidth);
        itemsOffset += (items.length - carousel._activeIndex - 1) * itemSpan;
      }
      carousel.style.setProperty('--items-offset', `-${itemsOffset}px`);

      /* dispatch an event to be heard by the detachable buttons
        * and anything else that needs it */
      carousel.dispatchEvent(new CustomEvent('itemChange', { detail: { activeIndex: Array.prototype.indexOf.call(items, item) } }));

      /* track carousel interaction */
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'Carousel interaction',
        elementId: carousel.dataset.trackingId,
      });
    };

    /* on Tabbing into an item set item active, if not already.
     * requires item to be a tabbable element.
     * can't use focusin listener here, as it would activate the item
     * before the click listener below can do its check */
    viewport.addEventListener('keyup', (e) => {
      if (e.key === 'Tab' && e.target.closest('.b-carousel__item:not(.js-carousel__item--active)')) {
        carousel._setActiveItem(e.target.closest('.b-carousel__item'));
      }
    });

    /* onClick set active item if not fully in view
     * else default click is allowed through */
    viewport.addEventListener('click', (e) => {
      const item = e.target.closest('.b-carousel__item');
      const itemBox = item.getBoundingClientRect();
      const viewBox = carousel.getBoundingClientRect();
      if (itemBox.left < viewBox.left || itemBox.right > viewBox.right) {
        e.preventDefault();
        carousel._setActiveItem(item);
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
              carousel._setActiveItem(items[carousel._activeIndex + itemsPerView] || items[items.length - 1]); // eslint-disable-line max-len
            } else {
              carousel._setActiveItem(items[carousel._activeIndex - itemsPerView] || items[0]);
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

    /* onResize
     * reset template params & re-centre active item */
    window.addEventListener('resize', () => {
      setTemplateParams();
      carousel._setActiveItem(items[carousel._activeIndex]);
    });

    /* on Focussing into the carousel from outside the carousel
     * set focus on the currently active item to improve tab navigation */
    viewport.addEventListener('focusin', (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest('.b-carousel__viewport')) {
        items[carousel._activeIndex].focus();
      }
    });

    /* initialise carousel control buttons */
    if (ctrls) {
      ctrls.classList.add('b-carousel__ctrls--active');

      const prev = ctrls.querySelector('.js-carousel__ctrl--prev');
      const next = ctrls.querySelector('.js-carousel__ctrl--next');

      prev.setAttribute('disabled', 'true');

      /* onClick: focus prev/next item, in steps of number of items per view */
      ctrls.addEventListener('click', (e) => {
        if (e.target === prev) {
          carousel._setActiveItem(items[carousel._activeIndex - itemsPerView] || items[0]);
        } else if (e.target === next) {
          carousel._setActiveItem(items[carousel._activeIndex + itemsPerView] || items[items.length - 1]); // eslint-disable-line max-len
        }
      });

      /* deactivate inapropriate btn based on new state of carousel */
      carousel.addEventListener('itemChange', () => {
        prev.removeAttribute('disabled');
        next.removeAttribute('disabled');
        if (carousel._activeIndex === 0) {
          prev.setAttribute('disabled', 'true');
        } else if (carousel._activeIndex >= items.length - itemsPerView) {
          next.setAttribute('disabled', 'true');
        }
      });
    }
  }

  return true;
};

export default carouselInit;
