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
  const orderBy = document.querySelector('.b-search-results__hidden-input-order-by');
  const orderSort = document.querySelector('.b-search-results__hidden-input-order-sort');
  const defaultClass = 'b-search-results__head-cell--sort-asc';
  const currentClass = Array.from(el.classList)[2];

  const newSort = {
    'b-search-results__head-cell--sort-asc': 'b-search-results__head-cell--sort-desc',
    'b-search-results__head-cell--sort-desc': 'b-search-results__head-cell--sort-none'
  }[currentClass];

  Array.from(document.querySelectorAll('.b-search-results__head-cell')).forEach((e) => {
    e.classList.remove('b-search-results__head-cell--sort-desc');
    e.classList.remove('b-search-results__head-cell--sort-asc');
    e.classList.remove('b-search-results__head-cell--sort-none');
  });

  if (
    !newSort
  ) {
    el.classList.add(defaultClass);
    orderBy.value = value;
  } else if (newSort == ('b-search-results__head-cell--sort-desc')) {
    orderSort.value = 'desc';
  } else if (newSort == ('b-search-results__head-cell--sort-none')) {
    orderBy.value = '';
    orderSort.value ='asc';
  }

  el.classList.add(newSort || defaultClass);

  el.dispatchEvent(new Event('change', { bubbles: true }))
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

