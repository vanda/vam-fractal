import { scrollIntoViewHorizontally } from '../../services/js_utility_functions/js_utility_functions';

/* Carousel initialiser fn.
 * Separate control buttons can be passed in as optional param,
 * otherwise will check for them nested inside the component */
const carouselInit = (carousel, ctrls = carousel.querySelector('.b-carousel__ctrls')) => {
  const items = carousel.querySelectorAll('.b-carousel__item');

  /* Carousel logic only required for > 1 item */
  if (items.length > 1) {
    const carouselUnclipped = carousel.classList.contains('b-carousel--unclipped');
    const viewport = carousel.querySelector('.b-carousel__viewport');
    const list = carousel.querySelector('.b-carousel__list');
    carousel._activeIndex = 0;
    let itemsOffset = 0;

    /* initialise with first item active */
    items[carousel._activeIndex].classList.add('js-carousel__item--active');

    /* ensure each item is tabbable for keyboard navigation */
    Array.from(items, (item) => {
      if (!item.querySelector('a, button')) {
        item.setAttribute('tabindex', 0);
      }
      return true;
    });

    /* fn to set size & template alignment params
     * called on Window resize */
    let carouselEnabled = true;
    let itemsPerView = 1;
    let transitionTime;
    const setTemplateParams = () => {
      /* set template alignment and widths in CSS
      * based on parent element width in the document */
      const containerWidth = carousel.parentElement.offsetWidth
        - parseInt(window.getComputedStyle(carousel.parentElement).paddingLeft, 10)
        - parseInt(window.getComputedStyle(carousel.parentElement).paddingRight, 10);
      const outerContainerWidth = carousel.parentElement.parentElement.offsetWidth
        - parseInt(window.getComputedStyle(carousel.parentElement.parentElement).paddingLeft, 10)
        - parseInt(window.getComputedStyle(carousel.parentElement.parentElement).paddingRight, 10);
      carousel.style.setProperty('--carousel-width', `${containerWidth}px`);
      carousel.style.setProperty('--carousel-max-width', `${outerContainerWidth}px`);

      /* derive number of items shown per carousel view
      * from the CSS variable set in the styles per breakpoint */
      itemsPerView = parseInt(window.getComputedStyle(carousel).getPropertyValue('--items-per-view'), 10);

      /* derive scroll transition time declared in CSS */
      transitionTime = parseInt(window.getComputedStyle(carousel).getPropertyValue('--transition-time'), 10);

      /* disable carousel if not needed (at current breakpoint!)
       * i.e. not enough items to over-fill it */
      if (items.length > itemsPerView) {
        carouselEnabled = true;
        if (ctrls) ctrls.classList.add('b-carousel__ctrls--active');
      } else {
        carouselEnabled = false;
        if (ctrls) ctrls.classList.remove('b-carousel__ctrls--active');
      }
    };
    setTemplateParams();

    /* fn for setting the active item
      * and scrolling into view, if required */
    carousel._setActiveItem = (item, scrollToItem = true) => {
      list.querySelector('.js-carousel__item--active').classList.remove('js-carousel__item--active');
      item.classList.add('js-carousel__item--active');

      carousel._activeIndex = Array.prototype.indexOf.call(items, item);

      /* fn to dispatch an event announcing an item change
       * to be heard by the detachable buttons
       * and anything else waiting to react */
      const announceChange = () => {
        carousel.dispatchEvent(new CustomEvent('itemChange', { detail: { activeIndex: Array.prototype.indexOf.call(items, item) } }));
      };

      /* move active item into view */
      if (carouselUnclipped) {
        const itemSpan = items[1].offsetLeft - items[0].offsetLeft;
        itemsOffset = carousel._activeIndex * itemSpan;
        /* last items need special right-alignment */
        if (carousel._activeIndex >= items.length - itemsPerView) {
          itemsOffset -= ((1 - (item.offsetWidth / carousel.offsetWidth)) * carousel.offsetWidth);
          itemsOffset += (items.length - carousel._activeIndex - 1) * itemSpan;
        }
        carousel.style.setProperty('--items-offset', `-${itemsOffset}px`);
        setTimeout(announceChange, transitionTime);
      } else {
        if (scrollToItem) scrollIntoViewHorizontally(item, viewport); // eslint-disable-line no-lonely-if, max-len
        announceChange();
      }

      /* track carousel interaction */
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'Carousel interaction',
        elementId: carousel.dataset.trackingId,
      });
    };

    /* on Tabbing into an item set item active, if not already.
     * requires item to be a tabbable element.
     * can't use focusin listener here, as it would also fire at the start of a click event
     * and activate the item before the click listener below can do its check */
    viewport.addEventListener('keyup', (e) => {
      if (e.key === 'Tab' && e.target.closest('.b-carousel__item:not(.js-carousel__item--active)')) {
        carousel._setActiveItem(e.target.closest('.b-carousel__item'));
      }
    });

    /* onClick set active item if not fully in view
     * else default click is allowed through */
    viewport.addEventListener('click', (e) => {
      if (carouselEnabled) {
        const item = e.target.closest('.b-carousel__item');
        const itemRect = item.getBoundingClientRect();
        const viewportRect = viewport.getBoundingClientRect();
        if (itemRect.left < viewportRect.left || itemRect.right > viewportRect.right) {
          e.preventDefault();
          carousel._setActiveItem(item);
        }
      }
    });

    if (carouselUnclipped) {
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
    } else {
      /* onScrollend set active item.
       * scroll event will do if scrollend not supported (Safari) */
      viewport.addEventListener(('onscrollend' in window ? 'scrollend' : 'scroll'), () => {
        const viewportRect = viewport.getBoundingClientRect();
        for (let i = 0; i < items.length; i += 1) {
          if (Math.round(items[i].getBoundingClientRect().left) >= Math.round(viewportRect.left)) {
            carousel._setActiveItem(items[i], false);
            break;
          }
        }
      });
    }

    /* onResize reset template params & re-centre active item */
    window.addEventListener('resize', () => {
      setTemplateParams();
      carousel._setActiveItem(items[carousel._activeIndex]);
    });

    /* on Focussing into the carousel from outside the carousel
     * set focus on the currently active item to improve tab navigation */
    viewport.addEventListener('focusin', (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest('.b-carousel__viewport')) {
        if (items[carousel._activeIndex].tabIndex > -1) {
          items[carousel._activeIndex].focus();
        } else {
          items[carousel._activeIndex].querySelector('a, button').focus();
        }
      }
    });

    /* initialise carousel control buttons */
    if (ctrls) {
      if (carouselEnabled) {
        ctrls.classList.add('b-carousel__ctrls--active');
      }

      const prev = ctrls.querySelector('.js-carousel__ctrl--prev');
      const next = ctrls.querySelector('.js-carousel__ctrl--next');

      prev.setAttribute('disabled', 'true');

      /* onClick focus prev/next item, in steps of number of items per view */
      ctrls.addEventListener('click', (e) => {
        if (e.target === prev) {
          carousel._setActiveItem(items[carousel._activeIndex - itemsPerView] || items[0]);
        } else if (e.target === next) {
          carousel._setActiveItem(items[carousel._activeIndex + itemsPerView] || items[items.length - 1]); // eslint-disable-line max-len
        }
      });

      /* onItemChange: activate apropriate prev/next button(s)
       * if there are now items before/after those currently in view */
      carousel.addEventListener('itemChange', () => {
        const viewportRect = viewport.getBoundingClientRect();
        prev.setAttribute('disabled', 'true');
        if (Math.round(items[0].getBoundingClientRect().left) < Math.round(viewportRect.left)) {
          prev.removeAttribute('disabled');
        }
        next.setAttribute('disabled', 'true');
        for (let i = carousel._activeIndex + 1; i < items.length; i += 1) {
          if (Math.round(items[i].getBoundingClientRect().right) > Math.round(viewportRect.right)) {
            next.removeAttribute('disabled');
            break;
          }
        }
      });
    }
  }

  return true;
};

export default carouselInit;
