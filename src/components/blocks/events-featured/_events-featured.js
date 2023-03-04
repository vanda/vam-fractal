/* eslint no-underscore-dangle: 0 */
let $_ = '';

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
    const eleFeaturedEvents = evt.currentTarget.eleContainer;

    if (!$_.eleInViewport(ele)) {
      if (evt.type === 'click') {
        // disable anchor behaviour of the partially visible element
        evt.preventDefault();

        // reset carousel events - moved element now has normal anchor behaviour
        $_.buildCarousel(eleFeaturedEvents);
      }

      // move the element completely into the viewport
      ele.scrollIntoView({ behavior: 'smooth' });
    }
  },

  // viewport: under $_.config.bp width
  buildCarousel: (eleFeaturedEvents) => {
    const elesListAnchors = eleFeaturedEvents.querySelectorAll('.b-events-featured__anchor');

    elesListAnchors.forEach((ele) => {
      ele.addEventListener('click', $_.moveCarouselItem);
      ele.addEventListener('focus', $_.moveCarouselItem);
      ele.eleAnchor = ele;
      ele.eleContainer = eleFeaturedEvents;
    });
  },

  resetConcertinaItems: (ele) => {
    if (ele.classList.contains('js-events-featured__item--active')) {
      ele.classList.remove('js-events-featured__item--active');
    }
  },

  activeConcertinaItem: (evt) => {
    const ele = evt.currentTarget.eleAnchor;
    const elesListItems = evt.currentTarget.elesListItems;

    // for touch-screens only as active list item class is added by mouseover event
    // before a click event can be fired
    if (!ele.parentElement.classList.contains('js-events-featured__item--active')) {
      evt.preventDefault();

      elesListItems.forEach((el) => {
        $_.resetConcertinaItems(el);
      });

      ele.parentElement.classList.add('js-events-featured__item--active');
      ele.removeEventListener('click', $_.activeConcertinaItem);
    }
  },

  // viewport: $_.config.bp width or over
  buildConcertina: (eleFeaturedEvents, elesListItems, listItemIndex = $_.config.defActiveLiIdx) => {
    const elesListAnchors = eleFeaturedEvents.querySelectorAll('.b-events-featured__anchor');

    // manage active list item class
    elesListItems.forEach((ele) => {
      $_.resetConcertinaItems(ele);

      // active list item set from args.
      elesListItems[listItemIndex].classList.add('js-events-featured__item--active');

      // active list item set on mouseover event
      ele.addEventListener('mouseover', () => {
        elesListItems.forEach((el) => {
          $_.resetConcertinaItems(el);
        });

        // user selected list item set as active
        ele.classList.add('js-events-featured__item--active');
      });
    });

    // change active list class based on child anchor events
    elesListAnchors.forEach((ele) => {
      // keyboard tab navigation
      ele.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 9) {
          elesListItems.forEach((el) => {
            $_.resetConcertinaItems(el);
          });

          if (evt.shiftKey === false) {
            // tabbing forward - check not run off the last <li> in the list
            if (ele.parentElement.nextElementSibling != null) {
              ele.parentElement.nextElementSibling.classList.add('js-events-featured__item--active');
            } else {
              ele.parentElement.classList.add('js-events-featured__item--active');
            }
          }

          if (evt.shiftKey === true) {
            // tabbing backward - check not run off the first <li> in the list
            if (ele.parentElement.previousElementSibling != null) {
              ele.parentElement.previousElementSibling.classList.add('js-events-featured__item--active');
            } else {
              ele.parentElement.classList.add('js-events-featured__item--active');
            }
          }
        }
      });

      // click event on anchors
      ele.addEventListener('click', $_.activeConcertinaItem);
      ele.eleAnchor = ele;
      ele.elesListItems = elesListItems;
    });

    // add container HTML class for CSS
    eleFeaturedEvents.classList.add('js-events-featured--concertina');
  },

  init: () => {
    const eleFeaturedEvents = document.querySelector('.b-events-featured');
    const mql = window.matchMedia($_.config.bp);

    if (eleFeaturedEvents) {
      const elesListItems = eleFeaturedEvents.querySelectorAll('.b-events-featured__item');

      if (mql.matches) {
        $_.buildConcertina(eleFeaturedEvents, elesListItems);
      } else {
        $_.buildCarousel(eleFeaturedEvents);
      }

      window.onresize = () => {
        if (mql.matches) {
          let listItemIndex = $_.config.defActiveListItemIndex;

          // maintain active list status
          elesListItems.forEach((ele, idx) => {
            if (ele.classList.contains('js-events-featured__item--active')) {
              listItemIndex = idx;
            }
          });

          $_.buildConcertina(eleFeaturedEvents, elesListItems, listItemIndex);
        } else {
          // update any previously set HTML classes
          if (eleFeaturedEvents.classList.contains('js-events-featured--concertina')) {
            eleFeaturedEvents.classList.remove('js-events-featured--concertina');
          }

          elesListItems.forEach((ele) => {
            if (ele.classList.contains('js-events-featured__item--active')) {
              ele.classList.remove('js-events-featured__item--active');
            }
          });

          $_.buildCarousel(eleFeaturedEvents);
        }
      };
    }
  }
};

window.addEventListener('DOMContentLoaded', () => {
  $_ = featuredEventsComponent;
  $_.init();
});
