const searchPaginationContainer = 'b-search-pagination';
const searchPrevLinkClass = `${searchPaginationContainer}__prev-link`;
const searchNextLinkClass = `${searchPaginationContainer}__next-link`;
const buttonClass = `${searchPaginationContainer}__page-button`;
const seperatorClass = `${searchPaginationContainer}__page-button-seperator`;
const start = '-start';
const middle = '-middle';
const last = '-last';
const inactive = '--inactive';
const active = '--active';
const current = '--current';
const currentButtonClass = `${buttonClass}${current}`;
const inactiveSearchPrevLinkClass = `${searchPrevLinkClass}${inactive}`;
const inactiveSearchNextLinkClass = `${searchNextLinkClass}${inactive}`;
const numberOfPages = document.querySelectorAll(`.${buttonClass}`).length + 2;

function hideButton (index) {
  document.querySelector(`button[page-index='${index}']`).classList.remove(buttonClass + active);
}

function showButton (index) {
  document.querySelector(`button[page-index='${index}']`).classList.add(buttonClass + active);
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

document.querySelector(`.${buttonClass}${last}`).onclick = (e) => {
  document.querySelector(`.${currentButtonClass}`).classList.remove(currentButtonClass);
  e.target.classList.add(currentButtonClass);
  e.target.dispatchEvent(new Event('changeSearchPage', { bubbles: true }));
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.b-search-pagination').addEventListener('changeSearchPage', () => {
    const currentButton = document.querySelector(`.${currentButtonClass}`);
    const currentButtonIndex = parseInt(currentButton.getAttribute('page-index'), 10);

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
      document.querySelectorAll(`.${buttonClass}${active}`).forEach((e, i) => {
        hideButton(i);
      });

      if (
        (
          numberOfPages - currentButtonIndex >= 3 &&
          currentButtonIndex > 2 &&
          currentButtonIndex < numberOfPages - 1
        ) || currentButtonIndex === numberOfPages - 2
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
        if (currentButtonIndex >= numberOfPages - 1 && currentButtonIndex <= numberOfPages) {
          showButton(numberOfPages - 1);
          showButton(numberOfPages - 2);
          document.querySelector(`.${seperatorClass}${start}`).classList.remove(seperatorClass + start + inactive);
          document.querySelector(`.${seperatorClass}${middle}`).classList.add(seperatorClass + middle + inactive);
          document.querySelector(`.${seperatorClass}${last}`).classList.add(seperatorClass + last + inactive);
        }
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

  function incrementDecrementPage (op) {
    const currentButton = parseInt(document.querySelector(`.${currentButtonClass}`).getAttribute('page-index'), 10);

    if ((currentButton > 1 && op === '-') || (op === '+' && currentButton < numberOfPages)) {
      document.querySelector(`.${currentButtonClass}`).classList.remove(currentButtonClass);
      if (op === '+') {
        document.querySelector(`button[page-index='${currentButton + 1}']`).classList.add(currentButtonClass);
      } else {
        document.querySelector(`button[page-index='${currentButton - 1}']`).classList.add(currentButtonClass);
      }
    }
  }

  document.querySelector(`.${searchPrevLinkClass}`).onclick = (e) => {
    incrementDecrementPage('-');
    e.target.dispatchEvent(new Event('changeSearchPage', { bubbles: true }));
  };

  document.querySelector(`.${searchNextLinkClass}`).onclick = (e) => {
    incrementDecrementPage('+');
    e.target.dispatchEvent(new Event('changeSearchPage', { bubbles: true }));
  };

  document.dispatchEvent(new Event('changeSearchPage', { bubbles: true }));

  const currentButton = parseInt(document.querySelector(`.${currentButtonClass}`).getAttribute('page-index'), 10);
  document.querySelector(`button[page-index='${currentButton}']`).click();
});
