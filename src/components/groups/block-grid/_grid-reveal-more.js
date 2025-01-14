const gridRevealMore = document.querySelectorAll('.js-grid-reveal-more');

if (gridRevealMore.length) {
  let gridRevealMoreId = 0;
  Array.from(gridRevealMore, (gridBlock) => {
    const noOfItemsToShow = gridBlock.dataset.revealMoreCounter || 4;

    if (noOfItemsToShow < gridBlock.childElementCount) {
      gridRevealMoreId += 1;
      const svgURL = gridBlock.dataset.iconUrl;
      const gridItems = [...gridBlock.children];
      const theme = gridBlock.dataset.revealMoreTheme || 'dark';
      const tracking = gridBlock.dataset.revealMoreTracking || '';
      let putAfter = gridBlock;
      if (gridBlock.dataset.revealMorePutAfter) {
        putAfter = document.querySelector(gridBlock.dataset.revealMorePutAfter);
      }
      const ariaControlledId = `js-reveal-more-next-item${gridRevealMoreId}`;

      // Hide all but the first `noOfItemsToShow`
      gridItems.slice(noOfItemsToShow).forEach((el) => el.setAttribute('hidden', 'hidden'));
      gridItems[noOfItemsToShow].id = ariaControlledId;

      // Add in a show more button at the bottom
      const gridFooterMarkup = document.createElement('footer');
      gridFooterMarkup.setAttribute('class', `b-block-grid__footer b-block-grid__footer--${theme}`);
      gridFooterMarkup.innerHTML = `
        <button aria-label="show more" aria-expanded="false" aria-controls="${ariaControlledId}" class="js-reveal-more-btn">
          <div class="b-icon-badge b-icon-badge--small b-icon-badge--${theme}">
            <div class="b-icon-badge__icon s-themed s-themed--background-color s-themed--background-color--hover">
              <svg aria-hidden="true">
                <use xlink:href="${svgURL}#plus"></use>
              </svg>
            </div>
            <small class="b-icon-badge__label">
              Show more
            </small>
          </div>
        </button>
      `;
      putAfter.parentNode.insertBefore(gridFooterMarkup, putAfter.nextSibling);

      // Hook up an event listener on that button
      gridFooterMarkup.querySelector('.js-reveal-more-btn').addEventListener('click', (e) => {
        e.preventDefault();

        // Filter down to just the hidden items
        const hiddenItems = gridItems.filter((el) => el.hasAttribute('hidden'));
        if (hiddenItems.length) {
          hiddenItems[0].id = '';
          // in case of column layout, add a colspan separator to preserve item order
          const columns = window.getComputedStyle(gridBlock).getPropertyValue('column-count');
          if (columns > 1) {
            const separator = hiddenItems[0].parentNode
              .insertBefore(hiddenItems[0].cloneNode(false), hiddenItems[0]);
            separator.removeAttribute('hidden');
            separator.classList.add('b-block-grid__cols-restarter');
          }
          // the big reveal
          hiddenItems.slice(0, noOfItemsToShow).forEach((el) => el.removeAttribute('hidden'));
          // prep the next reveal if applicable
          if (hiddenItems.length > noOfItemsToShow) {
            hiddenItems[noOfItemsToShow].id = ariaControlledId;
          } else {
            // Remove the footer if we're not going to need the button after this
            gridFooterMarkup.remove();
          }
        }

        // track 'show more' button interaction
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'Show more',
          type: tracking,
        });
      }, false);
    }
    return true;
  });
}
