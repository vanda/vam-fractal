// currently not able to change the offset i guess

if (document.querySelector('.b-search-pagination')) {
  const searchPaginationContainer = document.querySelector('.b-search-pagination');

  const { totalCount, offset } = Object.entries(searchPaginationContainer.dataset).reduce(function (total, pair) {
    const [key, value] = pair;
    return Object.assign(total, {
      [key]: parseInt(value)
    });
  }, {});

  const searchPrevLinkClass = 'b-search-pagination__prev-link';
  const searchNextLinkClass = 'b-search-pagination__next-link';
  const buttonClass = 'b-search-pagination__page-button';
  const seperatorClass = 'b-search-pagination__page-button-seperator';
  const start = '-start';
  const middle = '-middle';
  const last = '-last';
  const inactive = '--inactive';
  const active = '--active';
  const current = '--current';
  const currentButtonClass = buttonClass + current;
  const inactiveSearchPrevLinkClass = searchPrevLinkClass + inactive;
  const inactiveSearchNextLinkClass = searchNextLinkClass + inactive;
  const numberOfPages = Math.ceil(totalCount / offset);

  const showButton = (index) => {
    document.querySelector(`button[page-index="${String(index)}"]`).classList.add(buttonClass + active);
  };

  const incrementDecrementPage = (op) => {
    const currentButton = parseInt(document.querySelector(`.${currentButtonClass}`).getAttribute('page-index'), 10);

    if ((currentButton > 1 && op === '-') || (op === '+' && currentButton < numberOfPages)) {
      document.querySelector(`.${currentButtonClass}`).classList.remove(currentButtonClass);
      if (op === '+') {
        document.querySelector(`button[page-index="${String(currentButton + 1)}"]`).classList.add(currentButtonClass);
      } else {
        document.querySelector(`button[page-index="${String(currentButton - 1)}"]`).classList.add(currentButtonClass);
      }
    }
  };

  document.querySelector('.b-search-pagination').addEventListener('changeSearchPage', () => {
    const currentButton = document.querySelector(`.${currentButtonClass}`);
    const currentButtonIndex = parseInt(currentButton.getAttribute('page-index'), 10);
    searchPaginationContainer.dataset.currentPage = currentButtonIndex;
    document.querySelector('.b-search-pagination__display-counter').dispatchEvent(new Event('updateDisplayCounter'));

    if (currentButtonIndex > 1) {
      document.querySelector(`.${searchPrevLinkClass}`).classList.remove(inactiveSearchPrevLinkClass);
    } else {
      document.querySelector(`.${searchPrevLinkClass}`).classList.add(inactiveSearchPrevLinkClass);
    }

    if (currentButtonIndex < numberOfPages) {
      document.querySelector(`.${searchNextLinkClass}`).classList.remove(inactiveSearchNextLinkClass);
    } else {
      document.querySelector(`.${searchNextLinkClass}`).classList.add(inactiveSearchNextLinkClass);
    }

    if (numberOfPages > 4) {
      // activate this logic...
      document.querySelectorAll(`.${buttonClass}${active}`).forEach((e) => {
        e.classList.remove(`${buttonClass}${active}`);
      });

      if (
        (numberOfPages - currentButtonIndex >= 3 &&
          currentButtonIndex > 2 &&
          currentButtonIndex < numberOfPages - 1) ||
          currentButtonIndex === numberOfPages - 2
      ) {
        document.querySelector(`.${seperatorClass}${start}`).classList.remove(seperatorClass + start + inactive);
        document.querySelector(`.${seperatorClass}${middle}`).classList.add(seperatorClass + middle + inactive);
        document.querySelector(`.${seperatorClass}${last}`).classList.remove(seperatorClass + last + inactive);

        showButton(currentButtonIndex - 1);
        showButton(currentButtonIndex);
        showButton(currentButtonIndex + 1);
      } else {
        if (currentButtonIndex <= 2) {
          showButton(2);
          showButton(3);
          document.querySelector(`.${seperatorClass}${start}`).classList.add(seperatorClass + start + inactive);
          document.querySelector(`.${seperatorClass}${middle}`).classList.add(seperatorClass + middle + inactive);
          document.querySelector(`.${seperatorClass}${last}`).classList.remove(seperatorClass + last + inactive);
        }

        if (
          !(currentButtonIndex <= 2) &&
          (currentButtonIndex >= numberOfPages - 1 && currentButtonIndex <= numberOfPages)
        ) {
          showButton(numberOfPages - 1);
          showButton(numberOfPages - 2);
          document.querySelector(`.${seperatorClass}${start}`).classList.remove(seperatorClass + start + inactive);
          document.querySelector(`.${seperatorClass}${middle}`).classList.add(seperatorClass + middle + inactive);
          document.querySelector(`.${seperatorClass}${last}`).classList.add(seperatorClass + last + inactive);
        }
      }
    } else {
      if (document.querySelector(`.${seperatorClass}${last}`)) {
        document.querySelector(`.${seperatorClass}${last}`).classList.add(seperatorClass + last + inactive);
      }

      showButton(1);

      if (numberOfPages >= 2) {
        showButton(2);
      }
      if (numberOfPages >= 3) {
        showButton(3);
      }

      if (numberOfPages === 4) {
        showButton(4);
      }
    }
  }, true);

  if (numberOfPages > 4) {
    document.querySelector(`.${seperatorClass}${middle}`).classList.remove(seperatorClass + middle + inactive);
    const currentButtonIndex = parseInt(document.querySelector(`.${currentButtonClass}`).getAttribute('page-index'), 10);
    if (currentButtonIndex < 3) {
      Array.from(document.querySelectorAll(`.${buttonClass}`)).slice(3, numberOfPages - 1).forEach((e) => {
        e.classList.add(buttonClass + inactive);
      });
    }
  }

  document.querySelector(`.${searchPrevLinkClass}`).onclick = (e) => {
    incrementDecrementPage('-');
    e.target.dispatchEvent(new Event('changeSearchPage', { bubbles: true }));
  };

  document.querySelector(`.${searchNextLinkClass}`).onclick = (e) => {
    incrementDecrementPage('+');
    e.target.dispatchEvent(new CustomEvent('changeSearchPage', { bubbles: true, detail: true }));
  };

  document.querySelector('.b-search-pagination__display-counter').addEventListener('updateDisplayCounter', (e) => {
    const currentPage = searchPaginationContainer.dataset.currentPage - 1;
    const startingNumber = offset * currentPage + 1;
    const endingNumber = (offset * currentPage) + offset;
    document.querySelector('.b-search-pagination__display-counter').innerHTML = `
      ${offset * currentPage + 1} - ${endingNumber > totalCount ? totalCount : endingNumber} of ${totalCount}
    `;
  });

  if (numberOfPages > 3) {
    for (let i = 3; i < numberOfPages - 1; i += 1) {
      document.querySelector('.b-search-pagination__page-button-container').innerHTML = `
        ${document.querySelector('.b-search-pagination__page-button-container').innerHTML}
        <button page-index='${i + 1}' class='b-search-pagination__page-button'>
            ${i < 9 ? 0 : ''}${i + 1}
        </button>
      `;
    }

    document.querySelector('.b-search-pagination__page-button-container').innerHTML = `
      ${document.querySelector('.b-search-pagination__page-button-container').innerHTML}
      <span class='b-search-pagination__page-button-seperator-last'>
        ...
      </span>
      <button page-index='${numberOfPages}' class='b-search-pagination__page-button-last'>
          ${numberOfPages < 10 ? 0 : ''}${numberOfPages}
      </button>
    `;
  }

  Array.from(document.querySelectorAll(`.${buttonClass}`)).forEach((el) => {
    el.onclick = (e) => {
      document.querySelector(`.${currentButtonClass}`).classList.remove(currentButtonClass);
      e.target.classList.add(currentButtonClass);
      e.target.dispatchEvent(new Event('changeSearchPage', { bubbles: true }));
    };
  });

  document.querySelector(`.${buttonClass}${start}`).onclick = (e) => {
    document.querySelector(`.${currentButtonClass}`).classList.remove(currentButtonClass);
    e.target.classList.add(currentButtonClass);
    e.target.dispatchEvent(new Event('changeSearchPage', { bubbles: true }));
  };

  if (document.querySelector(`.${buttonClass}${last}`)) {
    document.querySelector(`.${buttonClass}${last}`).onclick = (e) => {
      document.querySelector(`.${currentButtonClass}`).classList.remove(currentButtonClass);
      e.target.classList.add(currentButtonClass);
      e.target.dispatchEvent(new Event('changeSearchPage', { bubbles: true }));
    };
  }

  document.querySelector(`button[page-index="${String(searchPaginationContainer.dataset.currentPage)}"]`).click();
}
