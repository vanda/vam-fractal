const paginationElement = document.querySelector('.b-search-pagination');
const buttons = Array.from(document.querySelectorAll('.b-search-pagination__page-button'));
const seperators = Array.from(document.querySelectorAll('.b-search-pagination__page-button-seperator'));
const searchPrevLink = document.querySelector('.b-search-pagination__prev-link');
const searchNextLink = document.querySelector('.b-search-pagination__next-link');
const startSeperator = document.querySelector('.b-search-pagination__page-button-seperator-start');
const lastSeperator = document.querySelector('.b-search-pagination__page-button-seperator-last');

const currentButtonClass = 'b-search-pagination__page-button--current';

const datasetToInts = dataset => Object.entries(dataset).reduce((total, pair) => {
  const [key, value] = pair;
  return Object.assign(total, {
    [key]: parseInt(value, 10)
  });
}, {});

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
  const { pages } = datasetToInts(paginationElement);

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

const updateDisplayCounter = () => {
  const { pageIndex, offset, totalCount } = datasetToInts(paginationElement.dataset);
  if (totalCount < offset) {
    document.querySelector('.b-search-pagination__display-counter').innerHTML = '';
  } else {
    const currentPage = pageIndex - 1;
    const startingNumber = (offset * currentPage) + 1;
    const endingNumber = (offset * currentPage) + offset;
    document.querySelector('.b-search-pagination__display-counter').innerHTML = `
      ${startingNumber} - ${endingNumber > totalCount ? totalCount : endingNumber} of ${totalCount}
    `;
  }
};

if (paginationElement) {
  const callback = (mutations) => {
    if (mutations.filter(mutation => mutation.attributeName === 'data-pages').length) {
      const { pages } = datasetToInts(paginationElement.dataset);

      buttons.forEach((button, i) => {
        if (i > (pages - 1)) {
          button.setAttribute('disabled', true);
        } else {
          button.removeAttribute('disabled');
        }
        button.dataset.pageIndex = i + 1;
        button.value = i + 1;
        button.innerHTML = `${(i + 1) < 10 ? 0 : ''}${i + 1}`;
      });
      seperators.forEach((seperator) => {
        seperator.setAttribute('disabled', true);
      });

      const lastButton = buttons.slice(
        buttons.filter(button => !button.getAttribute('disabled')).length - 1
      )[0];

      lastButton.dataset.pageIndex = pages;
      lastButton.value = pages;
      lastButton.innerHTML = `${pages < 10 ? 0 : ''}${pages}`;
      paginationElement.dataset.pageIndex = paginationElement.dataset.pageIndex;
    }

    if (mutations.filter(mutation => mutation.attributeName === 'data-page-index').length) {
      const { pageIndex, pages } = datasetToInts(paginationElement.dataset);
      const currentButton = document.querySelector(`.${currentButtonClass}`);

      const dynamicButtonCheck = pageIndex > 2 && (pageIndex < (pages - 1)) && pages > 5;

      if (pageIndex < 3) {
        startSeperator.setAttribute('disabled', 'true');
        buttons.slice(1)[0].removeAttribute('disabled', 'true');
        if (pages < 6) {
          lastSeperator.setAttribute('disabled', 'true');
        } else {
          buttons.slice(3)[0].setAttribute('disabled', 'true');
          lastSeperator.removeAttribute('disabled');
        }
      }

      if ((pageIndex > (pages - 3)) && (pages > 5)) {
        startSeperator.removeAttribute('disabled');
        lastSeperator.setAttribute('disabled', 'true');
        buttons.slice(3)[0].setAttribute('disabled', 'true');
        buttons.slice(1)[0].removeAttribute('disabled');
      }

      if (dynamicButtonCheck) {
        buttons.slice(3)[0].removeAttribute('disabled');
        buttons.slice(1)[0].removeAttribute('disabled');
        startSeperator.removeAttribute('disabled');
        lastSeperator.removeAttribute('disabled');
      }

      if (pages > 5) {
        buttons.slice(1, 4).filter(el => !el.getAttribute('disabled')).forEach((button, i) => {
          const newIndex =
          i + (pageIndex < 3 ? 2 : 0) +
            (dynamicButtonCheck ? pageIndex - 1 : 0) +
              ((pageIndex >= (pages - 1)) ? pages - 2 : 0);

          button.dataset.pageIndex = newIndex;
          button.value = newIndex + 1;
          button.innerHTML = `${newIndex < 10 ? 0 : ''}${newIndex}`;
        });
      }

      currentButton.classList.remove(currentButtonClass);
      buttons.filter(button => parseInt(button.dataset.pageIndex, 10) ===
        pageIndex)[0].classList.add(currentButtonClass);
      updateDisplayCounter();
      checkNavigationLinks();
    }

    if (mutations.filter(mutation => mutation.attributeName === 'data-total-count').length) {
      updateDisplayCounter();
    }
  };

  paginationElement.addEventListener('click', ({ target }) => {
    const { pageIndex } = datasetToInts(target.dataset);
    if (
      target.closest('.b-search-pagination__page-button') ||
      target.closest('.b-search-pagination__prev-link') ||
      target.closest('.b-search-pagination__next-link')
    ) {
      paginationElement.dataset.pageIndex = pageIndex;
    }
    return false;
  });

  const observer = new MutationObserver(callback);
  observer.observe(paginationElement, { attributes: true });
  paginationElement.dataset.pages = paginationElement.dataset.pages;
  paginationElement.dataset.totalCount = paginationElement.dataset.totalCount;
  paginationElement.dataset.pageIndex = paginationElement.dataset.pageIndex;
}
