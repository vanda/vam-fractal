import { scrollIntoViewHorizontally } from '../../services/js_utility_functions/js_utility_functions';

document.addEventListener('DOMContentLoaded', () => {
  Array.from(document.querySelectorAll('.b-venue-info'), (component) => {
    Array.from(component.querySelectorAll('.b-venue-info__items'), (carousel) => {
      const items = carousel.querySelectorAll('.b-venue-info__item');

      /* Carousel logic only relvant for > 1 item */
      if (items.length > 1) {
        /* scroll item into view when it receives focus
        * requires item to be a focusable element
        * only focusin event is delegated to container (focus event doesn't bubble!) */
        carousel.addEventListener('focusin', (e) => {
          if (e.target.closest('.b-venue-info__item')) {
            const item = e.target.closest('.b-venue-info__item');
            const scrollMode = window.getComputedStyle(carousel).getPropertyValue('overflow') !== 'hidden';

            if (scrollMode) {
              /* if native scrolling is enabled by CSS, focus item using native scrolling */
              scrollIntoViewHorizontally(item);
            } else {
              /* else focus item using CSS
              * only necessary due to browsers refusing to scroll items already within viewport
              * also affords css control over the animation */
              const index = Array.prototype.indexOf.call(items, item);
              const itemShift = index * (items[1].offsetLeft - (carousel.getBoundingClientRect().right - items[1].getBoundingClientRect().left)); // eslint-disable-line max-len
              component.style.setProperty('--items-offset', `-${itemShift}px`); console.log(component.style.getPropertyValue('--items-offset'));
            }
          }
        });

        /* reset native scroll position in case resizing between native/non-native scroll modes */
        window.addEventListener('resize', () => {
          if (window.getComputedStyle(carousel).getPropertyValue('overflow') === 'hidden') {
            carousel.scrollLeft = 0;
          }
        });

        /* prev/next buttons */
        const ctrls = component.querySelector('.b-venue-info__ctrls');
        // only active if multiple items
        ctrls.classList.add('b-venue-info__ctrls--active');
      }

      return true;
    });

    return true;
  });
});
