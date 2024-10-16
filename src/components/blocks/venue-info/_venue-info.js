import { scrollIntoViewHorizontally } from '../../services/js_utility_functions/js_utility_functions';

document.addEventListener('DOMContentLoaded', () => {
  Array.from(document.querySelectorAll('.b-venue-info'), (component) => {
    const items = component.querySelectorAll('.b-venue-info__item');

    /* Carousel logic only relvant for > 1 item */
    if (items.length > 1) {
      const carousel = component.querySelector('.b-venue-info__items');
      items[0].classList.add('js-venue-info__item--active');

      /* function for setting an item as the only active item */
      const setActive = (item) => {
        carousel.querySelector('.js-venue-info__item--active').classList.remove('js-venue-info__item--active');
        item.classList.add('js-venue-info__item--active');
      };

      /* scroll item into view when it receives focus
      * requires item to be a focusable element
      * only focusin event is delegated to container (focus event doesn't bubble!) */
      carousel.addEventListener('focusin', (e) => {
        if (e.target.closest('.b-venue-info__item:not(.js-venue-info__item--active)')) {
          const item = e.target.closest('.b-venue-info__item');
          setActive(item);
          const scrollMode = window.getComputedStyle(carousel).getPropertyValue('overflow') !== 'hidden';

          if (scrollMode) {
            /* if native scrolling is enabled by CSS, focus item using native scrolling */
            scrollIntoViewHorizontally(item);
          } else {
            /* else focus item using CSS
            * only necessary due to browsers refusing to scroll items already within viewport
            * also affords css control over the animation */
            const index = Array.prototype.indexOf.call(items, item);
            let itemShift = index * (items[1].offsetLeft - items[0].offsetLeft);
            if (index === items.length - 1) {
              itemShift -= ((1 - (item.offsetWidth / component.offsetWidth)) * component.offsetWidth); // eslint-disable-line max-len
            }
            component.style.setProperty('--items-offset', `-${itemShift}px`);
          }
        }
      });

      /* reset native scroll position in case resizing between native/non-native scroll modes */
      window.addEventListener('resize', () => {
        carousel.scrollLeft = 0;
        component.style.setProperty('--items-offset', 0);
        setActive(items[0]);
      });

      /* prev/next buttons */
      const ctrls = component.querySelector('.b-venue-info__ctrls');
      // only active if multiple items
      ctrls.classList.add('b-venue-info__ctrls--active');
    }

    return true;
  });
});
