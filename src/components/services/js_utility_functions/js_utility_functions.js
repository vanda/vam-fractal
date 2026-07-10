/* useful utility functions to be imported where required */

/* scrollIntoViewHorizontally
 * useful when not wanting any vertical scroll that can occur
 * with native scrollIntoView() function */
const scrollIntoViewHorizontally = (el, container = el.parentElement, visualContainer = container) => { // eslint-disable-line no-lonely-if, max-len
  const elRightEdge = el.offsetLeft + el.offsetWidth;
  const containerRightEdge = container.scrollLeft + visualContainer.offsetWidth;
  if (container.scrollLeft > el.offsetLeft) {
    container.scrollTo(el.offsetLeft, 0);
  } else if (containerRightEdge < elRightEdge) {
    const newScrollLeft = container.scrollLeft + elRightEdge - containerRightEdge;
    container.scrollTo(newScrollLeft, 0);
  }
};


/* rovingTabindex
 * To improve keyboard navigation around long lists of Links and avoid Tab navigation traps
 * by switching to Arrow key navigation within long lists of links
 * using a roving tabindex to manage keyboard focus
 * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex */
const rovingTabindex = (el) => {
  /* Remove all links in the list from the tabindex
   * leaving one link tabbable to allow tabbing into the list.
   * the tabbable link will be the first, by default,
   * unless a particular link has already been set as tabbable */
  const defaultTab = el.querySelector('a[tabindex="0"]');
  el._rovingTabindex_links = [...el.querySelectorAll('a')];
  el._rovingTabindex_links.forEach((link) => link.setAttribute('tabindex', -1));
  if (defaultTab) defaultTab.setAttribute('tabindex', 0);
  else el._rovingTabindex_links[0].setAttribute('tabindex', 0);

  /* Add alternative keyboard navigation for traversing within the list,
   * which moves the focus accordingly,
   * and sets the newly focussed link to be the only tabbable el in the list.
   * Ensure listener only added once, even when applied repeatedly to rebuilt lists. */
  if (!el._rovingTabindex_hasListener) {
    el.addEventListener('keydown', (e) => {
      const currentItem = el.querySelector('a[tabindex="0"]');
      const currentIndex = el._rovingTabindex_links.findIndex((link) => link === currentItem);

      const moveFocus = (nextItem) => {
        currentItem.setAttribute('tabindex', -1);
        nextItem.setAttribute('tabindex', 0);
        nextItem.focus();
      };

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          /* Move focus to next link,
          * preventing default scrolling which will happen as necessary with the change of focus */
          e.preventDefault();
          moveFocus(el._rovingTabindex_links[currentIndex + 1] || el._rovingTabindex_links[currentIndex]); // eslint-disable-line max-len
          break;

        case 'ArrowLeft':
        case 'ArrowUp':
          /* Move focus to previous link,
          * preventing default scrolling which will happen as necessary with the change of focus */
          e.preventDefault();
          moveFocus(el._rovingTabindex_links[currentIndex - 1] || el._rovingTabindex_links[currentIndex]); // eslint-disable-line no-lonely-if, max-len
          break;

        case 'Home':
        case 'PageUp':
          /* Move focus to first link,
          * preventing default scrolling which will happen as necessary with the change of focus */
          e.preventDefault();
          moveFocus(el._rovingTabindex_links[0]);
          break;

        case 'End':
        case 'PageDown':
          /* Move focus to last link,
          * preventing default scrolling which will happen as necessary with the change of focus */
          e.preventDefault();
          moveFocus(el._rovingTabindex_links[el._rovingTabindex_links.length - 1]);
          break;
      }
    });
    el._rovingTabindex_hasListener = true;
  }
};


/* export individual utility functions here as they are added.
 * none are default exports */
/* eslint-disable import/prefer-default-export */
export { scrollIntoViewHorizontally, rovingTabindex };
