document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.b-search-results')) {
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
      const sortType = el.dataset.sortType;
      const orderBy = document.querySelector('.b-search-results__hidden-input-order-by');
      const orderSort = document.querySelector('.b-search-results__hidden-input-order-sort');
      const defaultClass = 'b-search-results__head-cell--sort-asc';
      const currentClass = Array.from(el.classList).find((cls) => cls.match(/b-search-results__head-cell--sort-(asc|desc)/));

      const newSort = {
        'b-search-results__head-cell--sort-asc': 'b-search-results__head-cell--sort-desc',
        'b-search-results__head-cell--sort-desc': 'b-search-results__head-cell--sort-none',
      }[currentClass];

      Array.from(document.querySelectorAll('.b-search-results__head-cell'), (cell) => {
        cell.classList.remove('b-search-results__head-cell--sort-desc');
        cell.classList.remove('b-search-results__head-cell--sort-asc');
        cell.classList.remove('b-search-results__head-cell--sort-none');
        return true;
      });

      if (!newSort) {
        el.classList.add(defaultClass);
        orderBy.value = sortType;
      } else if (newSort === ('b-search-results__head-cell--sort-desc')) {
        orderSort.value = 'desc';
      } else if (newSort === ('b-search-results__head-cell--sort-none')) {
        orderBy.value = '';
        orderSort.value = 'asc';
      }

      el.classList.add(newSort || defaultClass);
    };

    const reAdjustWarnings = () => {
      Array.from(document.querySelectorAll('.b-search-results__offensive-warning'), (el) => {
        const row = Array.from(document.querySelectorAll('.b-search-results__body-row'))[el.getAttribute('data-row-index')];
        const topOffset = (row.offsetHeight - el.offsetHeight) / 2;
        el.style.top = `${row.offsetTop + topOffset}px`;
        el.style.left = '5px';
        return true;
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
    document.querySelector('.b-search-results').addEventListener('initWarnings', () => {
      offensiveWarningInitializer();
    });
    document.addEventListener('click', (e) => {
      if (e.target.closest('.b-search-results__head-cell--sortable')) {
        toggleSort(e.target);
      }
    }, true);
  }
}, true);
