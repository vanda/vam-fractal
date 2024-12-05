document.addEventListener('DOMContentLoaded', () => {
  /* function for setting an item as the only active item */
  const setActive = (item) => {
    item.parentNode.querySelector('.b-events-featured__item--active').classList.remove('b-events-featured__item--active');
    item.classList.add('b-events-featured__item--active');
  };

  /* event handling */
  Array.from(document.querySelectorAll('.b-events-featured'), (block) => {
    /* on Hover: set active item
     * this has to be for mouse hover only, NOT the hover event which preceeds a touch event
     * (in which case the preceeding hover event would activate the item before the touch event,
     *  which would then be allowed to click straight through on the item's hyperlink - we want
     * the first touch to just activate an item, not activate + follow link in one go) */
    block.addEventListener('pointerover', (e) => {
      if (e.pointerType !== 'touch' && e.target.closest('.b-events-featured__item')) {
        setActive(e.target.closest('.b-events-featured__item'));
      }
    });

    /* on Focus: set active item
     * using key handler since the container element is not focussable itself */
    block.addEventListener('keyup', (e) => {
      if (e.key === 'Tab') {
        setActive(e.target.closest('.b-events-featured__item'));
      }
    });

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

    /* click (all devices):
     * set active item & scroll it into view
     * else default hyperlink click is allowed through */
    block.addEventListener('click', (e) => {
      if (e.target.closest('.b-events-featured__item')) {
        const el = e.target.closest('.b-events-featured__item');
        if (!el.classList.contains('b-events-featured__item--active')) {
          e.preventDefault();
          setActive(el);
          el.scrollIntoView();
        }
      }
    });

    return true;
  });
});
