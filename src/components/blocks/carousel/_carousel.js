import { scrollIntoViewHorizontally } from '../../services/js_utility_functions/js_utility_functions';

/* Carousel initialiser fn.
 * Separate control buttons can be passed in as optional param,
 * otherwise will check for them nested inside the component */
const carouselInit = (carousel, ctrls = carousel.querySelector('.b-carousel__ctrls')) => {
  const items = Array.from(carousel.querySelectorAll('.b-carousel__item'));

  /* Carousel logic only required for > 1 item */
  if (items.length > 1) {
    carousel._viewport = carousel.querySelector('.b-carousel__viewport');
    carousel._activeIndex = 0;
    carousel._oldActiveIndex = 0;
    let visibleItemIndexes = [];

    /* ensure each item is tabbable for keyboard navigation */
    items.forEach((item) => {
      if (!item.querySelector('a, button')) {
        item.setAttribute('tabindex', 0);
      }
      return true;
    });

    /* fn to set size & template alignment params
     * called on Window resize */
    let carouselEnabled = true;
    let itemsPerView = 1;

    const setTemplateParams = () => {
      /* set template alignment and widths in CSS */

      /* carousel width takes available rendered width in the document */
      carousel.style.setProperty('--carousel-width', `${carousel.offsetWidth}px`);

      /* optionally, carousel outer template width can be set
       * if a container is supplied as a selector via a data-attribute */
      if (carousel.dataset.carouselTemplateParentSelector) {
        const carouselTemplateParent = carousel.closest(carousel.dataset.carouselTemplateParentSelector); // eslint-disable-line max-len
        if (carouselTemplateParent) {
          carousel.style.setProperty('--carousel-template-width', `${carouselTemplateParent.offsetWidth}px`);
        }
      }

      /* derive number of items shown per carousel view
       * from the CSS variable set in the styles per breakpoint */
      itemsPerView = parseInt(window.getComputedStyle(carousel).getPropertyValue('--items-per-view'), 10);

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
      /* move active item into view */
      if (scrollToItem) scrollIntoViewHorizontally(item, carousel._viewport, carousel); // eslint-disable-line no-lonely-if, max-len

      /* dispatch an event to be heard by the detachable buttons
      * and anything else waiting to react */
      carousel.dispatchEvent(new CustomEvent('itemChange', { detail: { activeIndex: items.indexOf(item) } }));

      /* track carousel interaction, if scrolling enough to change active item */
      if (carousel._activeIndex !== carousel._oldActiveIndex) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'Carousel interaction',
          elementId: carousel.dataset.trackingId,
          interactionType: `scroll ${carousel._activeIndex > carousel._oldActiveIndex ? 'forward' : 'back'}`,
        });
      }
    };

    /* when an item intersects the carousel viewport
     * set appropriate item as active
     * can't do this onScrollend due to interaction issues and lack of support (safari)  */
    const onIntersectionObserved = (entries) => {
      entries.forEach((entry) => {
        const intersectingItemIndex = items.indexOf(entry.target);
        if (entry.isIntersecting) {
          visibleItemIndexes = [...visibleItemIndexes, intersectingItemIndex];
        } else {
          visibleItemIndexes = visibleItemIndexes.filter((id) => id !== intersectingItemIndex); // eslint-disable-line max-len
        }
        visibleItemIndexes.sort((a, b) => a - b);
      });
      /* set the first fully visible item in the carousel viewport as the active item
       * without triggering a scroll (since a scroll already triggered this intersection) */
      if (visibleItemIndexes.length) {
        carousel._oldActiveIndex = carousel._activeIndex;
        carousel._activeIndex = visibleItemIndexes[0];
        carousel._setActiveItem(items[visibleItemIndexes[0]], false);
      }
    };
    /* create an observer to observe items intersecting carousel viewport
     * and observe each item */
    const observer = new IntersectionObserver(onIntersectionObserved, { root: carousel, threshold: 0.9 }); // eslint-disable-line max-len
    items.forEach((item) => observer.observe(item));

    /* on Tabbing into an item set item active.
     * requires item to be a tabbable element.
     * can't use focusin listener here, as it would also fire at the start of a click event
     * and activate the item before the click listener below can do its check */
    carousel._viewport.addEventListener('keyup', (e) => {
      if (e.key === 'Tab') {
        const item = e.target.closest('.b-carousel__item');
        if (item) carousel._setActiveItem(item);
      }
    });

    /* onClick set item as active if not fully in view
     * else default click is allowed through */
    carousel._viewport.addEventListener('click', (e) => {
      if (carouselEnabled) {
        const item = e.target.closest('.b-carousel__item');
        if (item && !visibleItemIndexes.includes(items.indexOf(item))) {
          e.preventDefault();
          e.stopImmediatePropagation();
          carousel._setActiveItem(item);
        }
      }
    });

    /* on Focussing into the carousel from outside the carousel
     * set focus on the currently active item to improve tab navigation */
    carousel._viewport.addEventListener('focusin', (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest('.b-carousel__viewport')) {
        if (items[carousel._activeIndex].tabIndex > -1) {
          items[carousel._activeIndex].focus();
        } else {
          items[carousel._activeIndex].querySelector('a, button').focus();
        }
      }
    });

    /* onResize reset template params & re-centre active item */
    window.addEventListener('resize', () => {
      setTemplateParams();
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
        e.stopImmediatePropagation();
        if (e.target === next) {
          carousel._setActiveItem(items[carousel._activeIndex + (2 * itemsPerView) - 1] || items[items.length - 1]); // eslint-disable-line max-len
        } else if (e.target === prev) {
          carousel._setActiveItem(items[carousel._activeIndex - itemsPerView] || items[0]);
        }
      });

      /* onItemChange: activate apropriate prev/next button(s)
       * if there are now items before/after those currently in view */
      carousel.addEventListener('itemChange', () => {
        if (carousel._activeIndex > 0) {
          prev.removeAttribute('disabled');
        } else {
          if (document.activeElement === prev) next.focus();
          prev.setAttribute('disabled', 'true');
        }
        if (carousel._activeIndex < items.length - itemsPerView) {
          next.removeAttribute('disabled');
        } else {
          if (document.activeElement === next) prev.focus();
          next.setAttribute('disabled', 'true');
        }
      });
    }
  }

  return true;
};

export default carouselInit;
