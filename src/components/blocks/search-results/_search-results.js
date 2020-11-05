const warningHTML = `
    <div class="b-search-results__offensive-warning-text">
      This record uses a term that has since fallen from usage and is now considered offensive. The term is repeated in this record in its original historical context.
      </br>
      <button class="b-search-results__offensive-warning-button">
        View record
      </button>
    </div>
`;

const toggleSort = (el) => {
  const { value } = el.dataset;
  const orderBy = el.querySelector('.b-search-results__hidden-input-order-by');
  const orderSort = el.querySelector('.b-search-results__hidden-input-order-sort');

  if (
    !el.classList.contains('b-search-results__head-cell--sort-asc') &&
    !el.classList.contains('b-search-results__head-cell--sort-desc')
  ) {
    el.classList.add(`${Array.from(el.classList)[0]}--sort-asc`);
    orderSort.value = value;
    orderBy.value = 'asc';
  } else if (el.classList.contains('b-search-results__head-cell--sort-asc')) {
    el.classList.remove(`${Array.from(el.classList)[0]}--sort-asc`);
    el.classList.add(`${Array.from(el.classList)[0]}--sort-desc`);
    orderBy.value = 'desc';
  } else if (el.classList.contains('b-search-results__head-cell--sort-desc')) {
    el.classList.remove(`${Array.from(el.classList)[0]}--sort-desc`);
    orderSort.value = '';
    orderBy.value ='';
  }
}

const reAdjustWarnings = () => {
  const table = document.querySelector('.b-search-results__table');

  Array.from(document.querySelectorAll('.b-search-results__offensive-warning')).forEach((el) => {
    const row = Array.from(document.querySelectorAll('.b-search-results__body-row'))[el.getAttribute('data-row-index')];
    el.style.top = `${row.offsetTop + (row.offsetHeight / 5)}px`;

    if (table.clientWidth < 769) {
      el.style.left = '5px';
    } else {
      el.style.left = `${el.getBoundingClientRect().left / 5}px`;
    }
  });
};

const offensiveWarningInitializer = () => {
  Array.from(document.querySelectorAll('.b-search-results__body-row')).forEach((el, i) => {
    if (el.classList.contains('b-search-results__body-row--offensive')) {
      const warningEl = document.createElement('DIV');
      warningEl.className = 'b-search-results__offensive-warning';
      warningEl.innerHTML = warningHTML;
      warningEl.style.top = `${el.offsetTop + (el.offsetHeight / 5)}px`;
      warningEl.setAttribute('data-row-index', i);
      warningEl.onclick = (e) => {
        Array.from(document.querySelectorAll('.b-search-results__body-row'))[
          e.target.parentElement.getAttribute('data-row-index')
        ].classList.remove('b-search-results__body-row--offensive');
        e.target.parentElement.remove();
        reAdjustWarnings();
        e.stopPropagation();
        return false;
      };
      el.appendChild(warningEl);
      reAdjustWarnings();
    }
  });

  reAdjustWarnings();
};

window.addEventListener('resize', () => {
  reAdjustWarnings();
});

offensiveWarningInitializer();

if (document.querySelector('.etc-template__results-container')) {
  document.querySelector('.etc-template__results-container').addEventListener('initWarnings', () => {
    offensiveWarningInitializer();
  });
}

Array.from(document.querySelectorAll('.b-search-results__head-cell')).forEach((el) => {
  if (Boolean(parseInt(el.dataset.sortable))) {
    el.onclick = e => toggleSort(e.target);
  }
});

