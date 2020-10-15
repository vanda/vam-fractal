const datasetToInts = dataset => Object.entries(dataset).reduce((total, pair) => {
  const [key, value] = pair;
  return Object.assign(total, {
    [key]: parseInt(value, 10)
  });
}, {});
const currentButtonClass = 'b-search-pagination__page-button--current';

const initPagination = () => {
  // need to stop stacking event listeners...
  const oldSearchPaginationContainer = document.querySelector('.b-search-pagination');
  const searchPaginationContainer = oldSearchPaginationContainer.cloneNode(true);
  oldSearchPaginationContainer.parentNode.replaceChild(
    searchPaginationContainer, oldSearchPaginationContainer
  );

  const buttons = Array.from(document.querySelectorAll('.b-search-pagination__page-button'));
  const searchPrevLink = document.querySelector('.b-search-pagination__prev-link');
  const searchNextLink = document.querySelector('.b-search-pagination__next-link');
  const startSeperator = document.querySelector('.b-search-pagination__page-button-seperator-start');
  const middleSeperator = document.querySelector('.b-search-pagination__page-button-seperator-middle');
  const lastSeperator = document.querySelector('.b-search-pagination__page-button-seperator-last');

  const { totalCount, offset, pages } = datasetToInts(searchPaginationContainer.dataset);

  const makeActive = (elements) => {
    elements.filter(el => el.classList.length === 2).forEach(
      el => el.classList.remove(`${el.classList[0]}--inactive`)
    );
  };

  const makeInactive = (elements) => {
    elements.filter(el => el.classList.length === 1).forEach(
      el => el.classList.add(`${el.classList[0]}--inactive`)
    );
  };

  const checkNavigationLinks = () => {
    if (parseInt(searchPrevLink.dataset.pageIndex, 10) < 1) {
      makeInactive([searchPrevLink]);
    } else {
      makeActive([searchPrevLink]);
    }

    if (parseInt(searchNextLink.dataset.pageIndex, 10) > pages) {
      makeInactive([searchNextLink]);
    } else {
      makeActive([searchNextLink]);
    }
  };

  const makeButtonCurrentlySelected = (index) => {
    document.querySelector(`button[data-page-index="${String(index)}"]`).classList.add(currentButtonClass);
  };

  const onButtonClick = (pageIndex) => {
    searchPaginationContainer.dataset.pageIndex = pageIndex;
    if (document.querySelector(`.${currentButtonClass}`)) {
      document.querySelector(`.${currentButtonClass}`).classList.remove(currentButtonClass);
    }
    searchPrevLink.dataset.pageIndex = pageIndex - 1;
    searchNextLink.dataset.pageIndex = pageIndex + 1;
  };

  const updateDisplayCounter = () => {
    const currentPage = parseInt(searchPaginationContainer.dataset.pageIndex, 10) - 1;
    const startingNumber = (offset * currentPage) + 1;
    const endingNumber = (offset * currentPage) + offset;
    document.querySelector('.b-search-pagination__display-counter').innerHTML = `
      ${startingNumber} - ${endingNumber > totalCount ? totalCount : endingNumber} of ${totalCount}
    `;
  };

  const paginationOver4Pages = ({ target }) => {
    const { pageIndex } = datasetToInts(target.dataset);

    onButtonClick(pageIndex);

    if (pageIndex <= 2) {
      const buttonToHide = buttons[2];
      const buttonToShow = buttons[0];

      makeActive([middleSeperator, buttonToShow]);
      makeInactive([startSeperator, lastSeperator, buttonToHide]);
      makeButtonCurrentlySelected(pageIndex);
      for (let i = 0; i < 3; i += 1) {
        const button = buttons[i];
        const newIndex = i + 2;
        button.dataset.pageIndex = newIndex;
        button.value = newIndex;
        button.innerHTML = `${newIndex < 10 ? 0 : ''}${newIndex}`;
      }
    }

    if (pageIndex > 2 && (pageIndex < (pages - 1))) {
      makeActive([startSeperator, lastSeperator, ...buttons]);
      makeInactive([middleSeperator]);

      const pageIndexBase = pageIndex - 1;

      for (let i = 0; i < 3; i += 1) {
        const button = buttons[i];
        const newIndex = pageIndexBase + i;
        button.dataset.pageIndex = newIndex;
        button.value = newIndex;
        button.innerHTML = `${newIndex < 10 ? 0 : ''}${newIndex}`;
      }
      makeButtonCurrentlySelected(pageIndex);
    }

    if (pageIndex >= (pages - 1)) {
      const buttonToHide = buttons[0];
      const buttonToShow = buttons[2];

      makeActive([startSeperator, buttonToShow]);
      makeInactive([middleSeperator, lastSeperator, buttonToHide]);
      makeButtonCurrentlySelected(pageIndex);

      for (let i = 0; i < 3; i += 1) {
        const button = buttons[i];
        const newIndex = (pages - 3) + i;
        button.dataset.pageIndex = newIndex;
        button.value = newIndex;
        button.innerHTML = `${newIndex < 10 ? 0 : ''}${newIndex}`;
      }
    }
  };

  const pagination4OrLessPages = ({ target }) => {
    const { pageIndex } = datasetToInts(target.dataset);
    onButtonClick(pageIndex);
    makeButtonCurrentlySelected(pageIndex);
  };

  if (pages > 4) {
    document.querySelector('.b-search-pagination').addEventListener('changeSearchPage', (e) => {
      makeActive([document.querySelector('.b-search-pagination__page-button-last')]);
      paginationOver4Pages(e);
      checkNavigationLinks();
      updateDisplayCounter();
      const { pageIndex } = datasetToInts(e.target.dataset);
      if ((document.querySelector('.b-search-pagination__hidden-input') && (document.querySelector('.b-search-pagination__hidden-input').value !== pageIndex))) {
        document.querySelector('.b-search-pagination__hidden-input').value = pageIndex;
      }
    });
  } else {
    makeInactive([startSeperator, middleSeperator, lastSeperator]);
    buttons.forEach((button) => {
      if (parseInt(button.dataset.pageIndex, 10) > pages) {
        makeInactive([button]);
      }
    });
    makeInactive([document.querySelector('.b-search-pagination__page-button-last')]);
    document.querySelector('.b-search-pagination').addEventListener('changeSearchPage', (e) => {
      pagination4OrLessPages(e);
      checkNavigationLinks();
      updateDisplayCounter();
      const { pageIndex } = datasetToInts(e.target.dataset);
      if ((document.querySelector('.b-search-pagination__hidden-input') && (document.querySelector('.b-search-pagination__hidden-input').value !== pageIndex))) {
        document.querySelector('.b-search-pagination__hidden-input').value = pageIndex;
      }
    });
  }


  document.querySelector('.b-search-pagination').addEventListener('click', ({ target }) => {
    const { pageIndex } = datasetToInts(target.dataset);
    if (
      target.closest('.b-search-pagination__page-button') ||
      target.closest('.b-search-pagination__prev-link') ||
      target.closest('.b-search-pagination__next-link') ||
      target.closest('.b-search-pagination__page-button-start') ||
      target.closest('.b-search-pagination__page-button-last')
    ) {
      if ((pageIndex > 0) && (pageIndex <= (pages))) {
        target.dispatchEvent(new Event('changeSearchPage', { bubbles: true }));
      }
    }
    return false;
  });

  document.querySelector('.b-search-pagination').dispatchEvent(new Event('changeSearchPage'));
};

if (document.querySelector('.b-search-pagination')) {
  initPagination();
  document.querySelector('.b-search-pagination').addEventListener('newSearch', () => initPagination());
  document.querySelector('.b-search-pagination').dispatchEvent(new Event('changeSearchPage'));
}
