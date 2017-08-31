const gridRevealMore = document.querySelectorAll('.js-grid-reveal-more');

if (gridRevealMore.length) {
  Array.from(gridRevealMore, (gridBlock) => {
    const noOfItemsToShow = gridBlock.dataset.revealMoreCounter || 4;

    if (noOfItemsToShow < gridBlock.childElementCount) {
      const svgURL = gridBlock.dataset.iconUrl;
      const gridItems = [...gridBlock.children];
      const theme = gridBlock.dataset.revealMoreTheme || 'dark';
      const tracking = gridBlock.dataset.revealMoreTracking || '';
      let putAfter = gridBlock;
      if (gridBlock.dataset.revealMorePutAfter) {
        putAfter = document.querySelector(gridBlock.dataset.revealMorePutAfter);
      }

      // Hide all but the first `noOfItemsToShow`
      gridItems.slice(noOfItemsToShow).forEach(el => el.classList.add('s-visually-hidden'));

      // Add in a show more button at the bottom
      const gridFooterMarkup = document.createElement('footer');
      gridFooterMarkup.setAttribute('class', `b-block-grid__footer b-block-grid__footer--${theme}`);
      gridFooterMarkup.innerHTML = `
        <a href="#" data-tracking-showmorebutton="${tracking}" class="js-reveal-more-btn">
          <div class="b-icon-badge b-icon-badge--small b-icon-badge--${theme}">
            <div class="b-icon-badge__icon s-themed s-themed--background-color s-themed--background-color--hover">
              <svg role="img">
                <use xlink:href="${svgURL}#plus"></use>
              </svg>
            </div>
            <small class="b-icon-badge__label">
              Show more
            </small>
          </div>
        </a>
      `;
      putAfter.parentNode.insertBefore(gridFooterMarkup, putAfter.nextSibling);

      // Hook up an event listener on that button
      gridBlock.revealMoreClicks = 0;
      gridFooterMarkup.addEventListener('click', (e) => {
        e.preventDefault();
        gridBlock.revealMoreClicks += 1;

        // Filter down to just the hidden items
        const hiddenItems = gridItems.filter(el => el.classList.contains('s-visually-hidden'));
        hiddenItems.slice(0, noOfItemsToShow).forEach(el => el.classList.remove('s-visually-hidden'));

        // Remove the footer if we're not going to need the button after this
        if (hiddenItems.length <= noOfItemsToShow) gridFooterMarkup.remove();
      }, false);
    }
    return true;
  });

  window.addEventListener('beforeunload', () => {
    const revealMoreClicks = [];
    Array.from(gridRevealMore, (gridBlock) => {
      revealMoreClicks.push(gridBlock.revealMoreClicks);
      return true;
    });
    history.replaceState({ revealMoreClicks }, 'revealMoreClicks');
  }, false);

  window.addEventListener('load', () => {
    if (history.state && history.state.revealMoreClicks) {
      const buttons = document.querySelectorAll('.js-reveal-more-btn');
      for (let r = 0; r < history.state.revealMoreClicks.length; r += 1) {
        let c = 0;
        while (c < history.state.revealMoreClicks[r]) {
          buttons[r].click();
          c += 1;
        }
      }
    }
  }, false);
}
