const warningHTML = `
    <div class="b-search-results__offensive-warning-text">
      This object, or the text that describes it, is deemed offensive and discriminatory. We are committed to improving our records, and work is ongoing.
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
  } else if (newSort === ('b-search-results__head-cell--sort-desc')) {
    orderSort.value = 'desc';
  } else if (newSort === ('b-search-results__head-cell--sort-none')) {
    orderBy.value = '';
    orderSort.value = 'asc';
  }

  el.classList.add(newSort || defaultClass);

  el.dispatchEvent(new Event('change', { bubbles: true }));
};

const reAdjustWarnings = () => {
  Array.from(document.querySelectorAll('.b-search-results__offensive-warning')).forEach((el) => {
    const row = Array.from(document.querySelectorAll('.b-search-results__body-row'))[el.getAttribute('data-row-index')];
    const topOffset = (row.offsetHeight - el.offsetHeight) / 2;
    el.style.top = `${row.offsetTop + topOffset}px`;
    el.style.left = '5px';
  });
};

const offensiveWarningInitializer = () => {
  Array.from(document.querySelectorAll('.b-search-results__body-row')).forEach((el, i) => {
    if (el.classList.contains('b-search-results__body-row--offensive')) {
      const warningEl = document.createElement('DIV');
      warningEl.className = 'b-search-results__offensive-warning';
      warningEl.innerHTML = warningHTML;
      const topOffset = (el.offsetHeight - warningEl.offsetHeight) / 2;
      warningEl.style.top = `${el.offsetTop + topOffset}px`;
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
      el.parentElement.appendChild(warningEl);
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
  document.querySelector('.etc-template__results-container').addEventListener('initSorts', () => {
    Array.from(document.querySelectorAll('.b-search-results__head-cell')).forEach((el) => {
      if (parseInt(el.dataset.sortable, 10)) {
        el.onclick = e => toggleSort(e.target);
      }
    });
  })
  document.querySelector('.etc-template__results-container').dispatchEvent(new Event('initSorts'));
}


// Array.from(document.querySelectorAll('.b-search-results__head-cell')).forEach((el) => {
//   if (parseInt(el.dataset.sortable, 10)) {
//     el.onclick = e => toggleSort(e.target);
//   }
// });

