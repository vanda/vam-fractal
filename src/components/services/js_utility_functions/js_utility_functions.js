/* useful utility functions to be imported where required */

/* scrollIntoViewHorizontally
 * useful when not wanting any vertical scroll that can occur
 * with native scrollIntoView() function */
const scrollIntoViewHorizontally = (item) => {
  const itemRight = item.offsetLeft + item.offsetWidth;
  const container = item.parentElement;
  const containerScrollRight = container.scrollLeft + container.offsetWidth;

  if (container.scrollLeft > item.offsetLeft) {
    container.scrollLeft = item.offsetLeft;
  } else if (containerScrollRight < itemRight) {
    container.scrollLeft += itemRight - containerScrollRight;
  }
};

/* export individual utility functions here as they are added.
 * none are default */
export { scrollIntoViewHorizontally }; // eslint-disable-line import/prefer-default-export
