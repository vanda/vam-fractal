document.addEventListener('DOMContentLoaded', () => {
  /* function only required because native scrollIntoView() affects vertical scroll too */
  const scrollIntoViewHorizontally = (container, child) => {
    const childRight = child.offsetLeft + child.offsetWidth;
    const containerScrollRight = container.scrollLeft + container.offsetWidth;

    if (container.scrollLeft > child.offsetLeft) {
      container.scrollLeft = child.offsetLeft;
    } else if (containerScrollRight < childRight) {
      container.scrollLeft += childRight - containerScrollRight;
    }
  };

  /* function for setting an item as the only active item */
  const setActive = (item) => {
    Array.from(item.parentNode.querySelectorAll('.js-venue-info__item--active'), (active) => active.classList.remove('js-venue-info__item--active'));
    item.classList.add('js-venue-info__item--active');
    scrollIntoViewHorizontally(item.parentNode, item);
  };

  /* event handling */
  Array.from(document.querySelectorAll('.b-venue-info'), (block) => {
    /* on Scroll: set active item */
    block.addEventListener('scrollend', () => {
      const viewerLeft = block.getBoundingClientRect().left;
      let i = 0;
      while (i < block.children.length) {
        if (block.children[i].getBoundingClientRect().left >= viewerLeft) {
          setActive(block.children[i]);
          break;
        }
        i += 1;
      }
    });

    /* on Focus: set active item
     * using key handler since the container element is not focussable itself */
    block.addEventListener('keyup', (e) => {
      if (e.key === 'Tab') {
        setActive(e.target.closest('.b-venue-info__item'));
      }
    });

    /* click (all devices):
     * set active item & scroll it into view
     * else default hyperlink click is allowed through */
    block.addEventListener('click', (e) => {
      if (e.target.closest('.b-venue-info__item')) {
        const el = e.target.closest('.b-venue-info__item');
        if (!el.classList.contains('js-venue-info__item--active')) {
          e.preventDefault();
          setActive(el);
        }
      }
    });

    return true;
  });
});
