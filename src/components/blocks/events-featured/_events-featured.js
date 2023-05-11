let $component = '';

const featuredEventsComponent = {
  config: {
    bp: '(min-width: 500px)',
    defActiveLiIdx: 0
  },

  eleInViewport: (ele) => {
    const rect = ele.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  moveCarouselItem: (evt) => {
    const ele = evt.currentTarget.eleAnchor;
    const targetListItem = evt.currentTarget.targetListItem;
    const listItemIndex = evt.currentTarget.listItemIndex;
    const elesListItems = evt.currentTarget.listItems;
    const eleFeaturedEvents = evt.currentTarget.eleContainer;

    if (!$component.eleInViewport(ele)) {
      if (evt.type === 'click') {
        // disable anchor behaviour of the partially visible element
        evt.preventDefault();

        // clear and reset the active list item
        elesListItems.forEach((eleListItem) => {
          $component.resetListItems(eleListItem);
        });

        targetListItem.classList.add('js-events-featured__item--active');

        // reset carousel events - moved element now has normal anchor behaviour
        $component.buildCarousel(eleFeaturedEvents, elesListItems, listItemIndex);
      }

      // move the element completely into the viewport
      ele.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  },

  // viewport: under $component.config.bp width
  buildCarousel: (eleFeaturedEvents,
    elesListItems,
    listItemIndex = $component.config.defActiveLiIdx
  ) => {
    const elesListAnchors = eleFeaturedEvents.querySelectorAll('.b-events-featured__anchor');

    // set the active list item by index parameter
    elesListItems[listItemIndex].classList.add('js-events-featured__item--active');

    // add events for moving active list item, centred horizontally in viewport
    elesListAnchors.forEach((ele, idx) => {
      ele.eleAnchor = ele;
      ele.targetListItem = ele.parentElement;
      ele.listItemIndex = idx;
      ele.listItems = elesListItems;
      ele.eleContainer = eleFeaturedEvents;

      ele.addEventListener('click', $component.moveCarouselItem);

      // in addition to native tabbing if the viewport on a non-touch enabled device is
      // below the $component.config.bp width then the moveCarouselItem Fn is called in tab
      // navigation to centre the list item
      ele.addEventListener('focus', $component.moveCarouselItem);
    });
  },

  resetListItems: (eleListItem) => {
    if (eleListItem.classList.contains('js-events-featured__item--active')) {
      eleListItem.classList.remove('js-events-featured__item--active');
    }
  },

  activeConcertinaItem: (evt) => {
    const eletargetListItem = evt.currentTarget.targetListItem;
    const elesListItems = evt.currentTarget.elesListItems;

    if (evt.type === 'click') {
      if (!eletargetListItem.classList.contains('js-events-featured__item--active')) {
        evt.preventDefault();

        elesListItems.forEach((eleListItem) => {
          $component.resetListItems(eleListItem);
        });

        eletargetListItem.classList.add('js-events-featured__item--active');
      }
    }

    if (evt.type === 'mouseover') {
      elesListItems.forEach((eleListItem) => {
        $component.resetListItems(eleListItem);
      });

      eletargetListItem.classList.add('js-events-featured__item--active');
    }
  },

  // viewport: $component.config.bp width or over
  buildConcertina: (
    eleFeaturedEvents,
    elesListItems,
    listItemIndex = $component.config.defActiveLiIdx
  ) => {
    const elesListAnchors = eleFeaturedEvents.querySelectorAll('.b-events-featured__anchor');

    elesListItems[listItemIndex].classList.add('js-events-featured__item--active');

    // add events for changing parent <li> classes
    elesListAnchors.forEach((eleAnchor) => {
      eleAnchor.targetListItem = eleAnchor.parentElement;
      eleAnchor.elesListItems = elesListItems;

      if (!window.matchMedia('(pointer: coarse)').matches) {
        // hover navigation
        eleAnchor.addEventListener('mouseover', $component.activeConcertinaItem);

        // keyboard tab navigation
        eleAnchor.addEventListener('keydown', (evt) => {
          if (evt.keyCode === 9) {
            elesListItems.forEach((elListItem) => {
              $component.resetListItems(elListItem);
            });

            if (evt.shiftKey === false) {
              // tabbing forward - check not run off the last <li> in the list
              if (eleAnchor.parentElement.nextElementSibling != null) {
                eleAnchor.parentElement.nextElementSibling.classList.add('js-events-featured__item--active');
              } else {
                eleAnchor.parentElement.classList.add('js-events-featured__item--active');
              }
            }

            if (evt.shiftKey === true) {
              // tabbing backward - check not run off the first <li> in the list
              if (eleAnchor.parentElement.previousElementSibling != null) {
                eleAnchor.parentElement.previousElementSibling.classList.add('js-events-featured__item--active');
              } else {
                eleAnchor.parentElement.classList.add('js-events-featured__item--active');
              }
            }
          }
        });
      } else {
        // touchscreen
        eleAnchor.addEventListener('click', $component.activeConcertinaItem);
      }
    });

    // add container HTML class for CSS
    eleFeaturedEvents.classList.add('js-events-featured--concertina');
  },

  init: () => {
    const eleFeaturedEvents = document.querySelector('.b-events-featured');
    const mql = window.matchMedia($component.config.bp);

    if (eleFeaturedEvents) {
      const elesListItems = eleFeaturedEvents.querySelectorAll('.b-events-featured__item');

      if (mql.matches) {
        $component.buildConcertina(eleFeaturedEvents, elesListItems);
      } else {
        $component.buildCarousel(eleFeaturedEvents, elesListItems);
      }

      window.onresize = () => {
        let listItemIndex = $component.config.defActiveLiIdx;

        elesListItems.forEach((ele, idx) => {
          // maintain active list status if the viewport width is changed
          if (ele.classList.contains('js-events-featured__item--active')) {
            listItemIndex = idx;
          }
        });

        if (mql.matches) {
          $component.buildConcertina(eleFeaturedEvents, elesListItems, listItemIndex);
        } else {
          // update any previously set HTML classes
          if (eleFeaturedEvents.classList.contains('js-events-featured--concertina')) {
            eleFeaturedEvents.classList.remove('js-events-featured--concertina');
          }

          $component.buildCarousel(eleFeaturedEvents, elesListItems, listItemIndex);
        }
      };
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  $component = featuredEventsComponent;
  $component.init();
});
