document.addEventListener('DOMContentLoaded', () => {
  /* utility function
   * only required because native scrollIntoView() affects vertical scroll too */
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

  Array.from(document.querySelectorAll('.b-venue-info'), (container) => {
    /* scroll item into view when it receives focus
     * requires item to be a focusable element
     * only focusin event is delegated to container (focus event doesn't bubble!) */
    container.addEventListener('focusin', (e) => {
      scrollIntoViewHorizontally(e.target.closest('.b-venue-info__item'));
    });

    return true;
  });
});
