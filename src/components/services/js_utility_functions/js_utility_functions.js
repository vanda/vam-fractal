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

/* export individual utility functions here as they are added.
 * none are default exports */
export { scrollIntoViewHorizontally }; // eslint-disable-line import/prefer-default-export
