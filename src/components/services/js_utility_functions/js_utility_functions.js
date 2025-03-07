/* useful utility functions to be imported where required */

/* scrollIntoViewHorizontally
 * useful when not wanting any vertical scroll that can occur
 * with native scrollIntoView() function */
const scrollIntoViewHorizontally = (item, container = item.parentElement) => {
  const itemRightEdge = item.offsetLeft + item.offsetWidth;
  const containerRightEdge = container.scrollLeft + container.offsetWidth;

  if (container.scrollLeft > item.offsetLeft) {
    container.scrollTo(item.offsetLeft, 0);
  } else if (containerRightEdge < itemRightEdge) {
    const scrollLeft = Math.min(
      container.scrollLeft + itemRightEdge - containerRightEdge,
      container.scrollWidth - container.offsetWidth);
    container.scrollTo(scrollLeft, 0);
  }
};

/* export individual utility functions here as they are added.
 * none are default exports */
export { scrollIntoViewHorizontally }; // eslint-disable-line import/prefer-default-export
