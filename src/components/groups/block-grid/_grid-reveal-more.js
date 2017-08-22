const gridRevealMore = document.querySelectorAll('.js-grid-reveal-more');

if (gridRevealMore) {
  for (let i = 0; i < gridRevealMore.length; i += 1) {
    const gridBlock = gridRevealMore[i];
    const noOfItemsToShow = gridBlock.dataset.revealMoreCounter || 4;

    if (noOfItemsToShow < gridBlock.childElementCount) {
      const svgURL = gridBlock.dataset.iconUrl;
      const gridItems = [...gridBlock.children];
      const theme = gridBlock.dataset.revealMoreTheme || 'dark';
      const tracking = gridBlock.dataset.revealMoreTracking || '';

      // Hide all but the first `noOfItemsToShow`
      gridItems.slice(noOfItemsToShow).forEach(el => el.classList.add('s-visually-hidden'));

      // Add in a show more button at the bottom
      const gridFooterMarkup = document.createElement('footer');
      gridFooterMarkup.setAttribute('class', `b-block-grid__footer b-block-grid__footer--${theme}`);
      gridFooterMarkup.innerHTML = `
        <a href="#" data-tracking-showmorebutton="${tracking}">
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
      gridBlock.parentNode.insertBefore(gridFooterMarkup, gridBlock.nextSibling);

      // Hook up an event listener on that button
      gridFooterMarkup.addEventListener('click', (e) => {
        e.preventDefault();

        // Filter down to just the hidden items
        const hiddenItems = gridItems.filter(el => el.classList.contains('s-visually-hidden'));
        hiddenItems.slice(0, noOfItemsToShow).forEach(el => el.classList.remove('s-visually-hidden'));

        // Remove the footer if we're not going to need the button after this
        if (hiddenItems.length <= noOfItemsToShow) gridFooterMarkup.remove();
      }, false);
    }
  }
}
