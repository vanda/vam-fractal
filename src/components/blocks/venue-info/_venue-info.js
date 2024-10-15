import { scrollIntoViewHorizontally } from '../../services/js_utility_functions/js_utility_functions';

document.addEventListener('DOMContentLoaded', () => {
  Array.from(document.querySelectorAll('.b-venue-info'), (container) => {
    const items = container.querySelectorAll('.b-venue-info__item');

    /* Carousel logic only relvant to containers of > 1 item */
    if (items.length > 1) {
      /* scroll item into view when it receives focus
      * requires item to be a focusable element
      * only focusin event is delegated to container (focus event doesn't bubble!) */
      container.addEventListener('focusin', (e) => {
        if (e.target.closest('.b-venue-info__item')) {
          const item = e.target.closest('.b-venue-info__item');
          const scrollMode = window.getComputedStyle(container).getPropertyValue('overflow') !== 'hidden';

          if (scrollMode) {
            /* if native scrolling is enabled by CSS, focus item using native scrolling */
            scrollIntoViewHorizontally(item);
          } else {
            /* else focus item using CSS
            * only necessary due to browsers refusing to scroll items already within viewport
            * also affords css control over the animation */
            const index = Array.prototype.indexOf.call(items, item);
            const itemShift = index * (items[1].offsetLeft - (container.getBoundingClientRect().right - items[1].getBoundingClientRect().left)); // eslint-disable-line max-len
            container.style.setProperty('--items-offset', `-${itemShift}px`);
          }
        }
      });

      /* reset native scroll position in case resizing between native/non-native scroll modes */
      window.addEventListener('resize', () => {
        if (window.getComputedStyle(container).getPropertyValue('overflow') === 'hidden') {
          container.scrollLeft = 0;
        }
      });

      /* prev/next buttons */
      const ctrls = container.querySelector('.b-venue-info__ctrls');
      // only active if multiple items
      ctrls.classList.add('b-venue-info__ctrls--active');
    }

    return true;
  });
});
