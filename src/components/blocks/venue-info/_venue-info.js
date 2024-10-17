import { scrollIntoViewHorizontally } from '../../services/js_utility_functions/js_utility_functions';

/* venueInfo controls
 * exported separately in case btns are detached from component */
const venueInfoCtrlsInit = (component, ctrls) => {
  const items = component.querySelectorAll('.b-venue-info__item');

  /* init if multiple items in carousel */
  if (items.length > 1) {
    ctrls.classList.add('b-venue-info__ctrls--active');

    const prev = ctrls.querySelector('.js-venue-info__ctrl--prev');
    const next = ctrls.querySelector('.js-venue-info__ctrl--next');

    prev.setAttribute('disabled', 'true');

    let itemIndex = 0;

    /* onClick: focus relevant item */
    ctrls.addEventListener('click', (e) => {
      if (e.target === prev) {
        itemIndex -= 1;
        component._setActiveItem(items[itemIndex]);
      } else if (e.target === next) {
        itemIndex += 1;
        component._setActiveItem(items[itemIndex]);
        /* if last item is now active, the next btn becomes disabled,
        so move lost focus to the active item */
        if (itemIndex === items.length - 1) {
          items[itemIndex].focus({ preventScroll: true });
        }
      }
    });

    /* deactivate inapropriate btn based on new state of carousel */
    component.addEventListener('itemChange', (e) => {
      itemIndex = e.detail.itemIndex;
      prev.removeAttribute('disabled');
      next.removeAttribute('disabled');
      if (itemIndex === 0) {
        prev.setAttribute('disabled', 'true');
      } else if (itemIndex === items.length - 1) {
        next.setAttribute('disabled', 'true');
      }
    });

    /* tabbing out of next btn focusses on whichever item is active */
    next.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        items[itemIndex].focus();
      }
    });
  }
};
export default venueInfoCtrlsInit;

document.addEventListener('DOMContentLoaded', () => {
  Array.from(document.querySelectorAll('.b-venue-info'), (component) => {
    const items = component.querySelectorAll('.b-venue-info__item');

    /* Carousel logic only relvant for > 1 item */
    if (items.length > 1) {
      const carousel = component.querySelector('.b-venue-info__items');
      items[0].classList.add('js-venue-info__item--active');

      /* function for setting the active item
       * and scrolling into view, if required */
      component._setActiveItem = (item, scrollToItem = true) => {
        carousel.querySelector('.js-venue-info__item--active').classList.remove('js-venue-info__item--active');
        item.classList.add('js-venue-info__item--active');

        /* scroll active item into view */
        if (scrollToItem) {
          const scrollMode = window.getComputedStyle(carousel).getPropertyValue('overflow') !== 'hidden';
          if (scrollMode) {
            /* if native scrolling is enabled by CSS, focus item using native scrolling */
            scrollIntoViewHorizontally(item);
          } else {
            /* else scroll to item using CSS
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

        /* dispatch an event to be heard by the detachable buttons
         * and anything else that needs it */
        component.dispatchEvent(new CustomEvent('itemChange', { detail: { itemIndex: Array.prototype.indexOf.call(items, item) } }));
      };

      /* set active item when it receives focus
      * requires item to be a focusable element
      * only focusin event is delegated to container (focus event doesn't bubble!) */
      carousel.addEventListener('focusin', (e) => {
        if (e.target.closest('.b-venue-info__item:not(.js-venue-info__item--active)')) {
          component._setActiveItem(e.target.closest('.b-venue-info__item'));
        }
      });

      /* on Scroll: set active item */
      carousel.addEventListener('scrollend', () => {
        const viewerLeft = carousel.getBoundingClientRect().left;
        let i = 0;
        while (i < carousel.children.length) {
          if (carousel.children[i].getBoundingClientRect().left >= viewerLeft) {
            /* call function without unnecessary scrolling option */
            component._setActiveItem(carousel.children[i], false);
            break;
          }
          i += 1;
        }
      });

      /* reset native scroll position in case resizing between native/non-native scroll modes */
      window.addEventListener('resize', () => {
        carousel.scrollLeft = 0;
        component.style.setProperty('--items-offset', 0);
        component._setActiveItem(items[0]);
      });

      // init carousel controls
      Array.from(component.querySelectorAll('.b-venue-info__ctrls'), (ctrls) => {
        venueInfoCtrlsInit(component, ctrls);
        return true;
      });
    }

    return true;
  });
});
