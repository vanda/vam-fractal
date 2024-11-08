/* useful utility functions to be imported where required */

/* scrollIntoViewHorizontally
 * useful when not wanting any vertical scroll that can occur
 * with native scrollIntoView() function */
const scrollIntoViewHorizontally = (item, container = item.parentElement) => {
  const itemRight = item.offsetLeft + item.offsetWidth;
  const containerScrollRight = container.scrollLeft + container.offsetWidth;

  if (container.scrollLeft > item.offsetLeft) {
    container.scrollLeft = Math.round(item.offsetLeft);
  } else if (containerScrollRight < itemRight) {
    container.scrollLeft += Math.round(itemRight - containerScrollRight);
  }
};

/* export individual utility functions here as they are added.
 * none are default exports */
export { scrollIntoViewHorizontally }; // eslint-disable-line import/prefer-default-export
