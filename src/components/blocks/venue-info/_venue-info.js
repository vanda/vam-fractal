/* Carousel initialiser fn.
 * Separate control buttons can be passed in as optional param,
 * otherwise will check for them nested inside the component */
const venueInfoInit = (component, ctrls = component.querySelector('.b-venue-info__ctrls')) => {
  const items = component.querySelectorAll('.b-venue-info__item');

  /* Carousel logic only required for > 1 item */
  if (items.length > 1) {
    const carousel = component.querySelector('.b-venue-info__carousel');
    const list = component.querySelector('.b-venue-info__list');
    let index = 0;
    let itemsOffset = 0;
    items[index].classList.add('js-venue-info__item--active');

    /* function for setting the active item
      * and scrolling into view, if required */
    component._setActiveItem = (item) => {
      list.querySelector('.js-venue-info__item--active').classList.remove('js-venue-info__item--active');
      item.classList.add('js-venue-info__item--active');

      /* move active item into view */
      index = Array.prototype.indexOf.call(items, item);
      itemsOffset = index * (items[1].offsetLeft - items[0].offsetLeft);
      /* last item needs special right-alignment */
      if (index === items.length - 1) {
        itemsOffset -= ((1 - (item.offsetWidth / component.offsetWidth)) * component.offsetWidth); // eslint-disable-line max-len
      }
      component.style.setProperty('--items-offset', `-${itemsOffset}px`);

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

    /* add swipe gesture support */
    carousel.ontouchstart = (e) => {
      const startXY = [e.touches[0].pageX, e.touches[0].pageY];
      carousel.ontouchmove = (e2) => {
        const deltaXY = [e2.touches[0].pageX - startXY[0], e2.touches[0].pageY - startXY[1]];
        if (Math.abs(deltaXY[0]) > Math.abs(deltaXY[1])
          && (
            (deltaXY[0] < 0 && index < items.length - 1)
            || (deltaXY[0] > 0 && index > 0)
          )) {
          /* if touch moves significantly horizontally
            * activate prev/next item swipe */
          if (Math.abs(deltaXY[0]) > 74) {
            carousel.ontouchmove = null;
            if (deltaXY[0] < 0) {
              component._setActiveItem(items[index + 1]);
            } else {
              component._setActiveItem(items[index - 1]);
            }
          } else {
            /* else just drag */
            component.style.setProperty('--items-offset', `${deltaXY[0] - itemsOffset}px`);
            carousel.ontouchend = () => {
              component._setActiveItem(items[index]);
              carousel.ontouchend = null;
            };
          }
        }
      };
    };

    /* re-centre active item on resize */
    window.addEventListener('resize', () => {
      component._setActiveItem(items[index]);
    });

    /* initialise carousel control buttons */
    if (ctrls) {
      const ctrlsAboveCarousel = (ctrls.compareDocumentPosition(component.querySelector('.b-venue-info__carousel')) === 4);

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
          if (ctrlsAboveCarousel) {
            /* if last item is now active, the next btn becomes disabled,
            * so move lost focus to the active carousel item */
            if (itemIndex === items.length - 1) {
              items[itemIndex].focus({ preventScroll: true });
            }
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

      if (ctrlsAboveCarousel) {
        /* tabbing forward off next btn focusses on whichever item is active */
        next.addEventListener('keydown', (e) => {
          if (e.key === 'Tab' && !e.shiftKey) {
            items[itemIndex].focus();
          }
        });
      }
    }
  }

  return true;
};

export default venueInfoInit;
