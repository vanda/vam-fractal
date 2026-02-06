/* Pagination utility fns */
const addButton = (number, container, prepend = false) => {
  const button = document.createElement('button');
  button.classList.add('u-btn-icon', 'u-btn-icon--numeric', 'u-btn-icon--inverse');
  button.innerText = number;
  button.value = number;
  if (prepend) {
    container.prepend(button);
  } else {
    container.append(button);
  }
};

const addSpacer = (container, prepend = false) => {
  const spacer = document.createElement('span');
  spacer.classList.add('b-pagination__spacer');
  if (prepend) {
    container.prepend(spacer);
  } else {
    container.append(spacer);
  }
};

/* Pagination initialiser fn */
const paginationInit = (pagination) => {
  const total = parseInt(pagination.dataset.total, 10);
  const index = parseInt(pagination.dataset.index, 10); // current page
  const pages = pagination.querySelector('.b-pagination__pages');

  /* update selected page button
   * moving it temporarily out of pages container for reuse after that's wiped */
  const selected = pagination.appendChild(pages.querySelector('button[selected]'));
  selected.innerText = index;
  selected.value = index;

  /* clear old pages buttons out */
  pages.innerHTML = '';

  /* populate pages with new buttons
   * with space for upto maxBtns including bookends and their spacers */
  const maxBtns = 7; // odd number >=3 (to centre the index)
  let pageMin;
  let pageMax;
  let bookendMin;
  let bookendMax;
  /* just show all pages when they total 7 or less */
  if (total <= maxBtns) {
    pageMin = 1;
    pageMax = total;
  } else if (index < maxBtns - 2) {
    /* else for start-range show lower range + upper bookend */
    pageMin = 1;
    pageMax = maxBtns - 2;
    bookendMax = total;
  } else if (index <= total - maxBtns + 2) {
    /* for mid-range show page above/below index page + both bookends */
    pageMin = Math.max(index - 1, 1); // never show page 0
    pageMax = index + 1;
    bookendMin = 1;
    bookendMax = total;
  } else {
    /* for end-range show the final pages + lower bookend */
    pageMin = Math.min(total - maxBtns + 3, total - 1); // ensure at least previous pg always shown
    pageMax = total;
    bookendMin = 1;
  }

  /* populate pages buttons
   * inserting the selected button in its place */
  for (let n = pageMin; n <= pageMax; n += 1) {
    if (n === index) {
      pages.append(selected);
    } else {
      addButton(n, pages);
    }
  }

  /* for mid-ranges of ample size
   * add outer page book-ends with thier spacers */
  if (maxBtns > 5) {
    if (bookendMin) {
      addSpacer(pages, true);
      addButton(bookendMin, pages, true);
    }
  }
  if (maxBtns > 3) {
    if (bookendMax) {
      addSpacer(pages);
      addButton(bookendMax, pages);
    }
  }

  /* set prev/next states */
  const buttons = [...pagination.querySelectorAll('.b-pagination__prevnext')];
  for (let i = 0; i < buttons.length; i += 1) {
    if (total > 1) {
      if (i === 0) {
        /* prev button */
        if (index > 1) {
          buttons[i].value = index - 1;
          buttons[i].removeAttribute('disabled');
        } else {
          buttons[i].setAttribute('disabled', true);
        }
      } else if (index < total) {
        /* next button */
        buttons[i].value = index + 1;
        buttons[i].removeAttribute('disabled');
      } else {
        buttons[i].setAttribute('disabled', true);
      }
    } else {
      buttons[i].setAttribute('disabled', true);
    }
  }

  pagination.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    const button = e.target.closest('button');
    if (button) {
      const oldIndex = selected.value;
      pagination.dataset.index = button.value;
      paginationInit(button.closest('.b-pagination')); // can't just pass in the pagination var here w/o causing a new evenetListener to be added each time paginationInit() is recalled
      /* for numbered page buttons update focus according to direction of travel */
      if (!button.classList.contains('b-pagination__prevnext')) {
        let nextFocus;
        if (button.value - oldIndex > 0) {
          /* clicking forward, focus next sibling of type button */
          nextFocus = pages.querySelector('[selected] ~ button');
        } else {
          /* clicking backwards, focus previous sibling of type button */
          nextFocus = pages.querySelector('button:has( ~ [selected])');
        }
        nextFocus.focus({ preventScroll: true });
      } else if (!document.activeElement.closest('.b-pagination')) {
        /* else replace lost focus when prev/next button became deactivated */
        selected.focus({ preventScroll: true });
      }
    }
  });
};

export default paginationInit;
