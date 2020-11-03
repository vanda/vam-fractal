const warningHTML = `
    <div class="b-search-results__offensive-warning-text">
      This record uses a term that has since fallen from usage and is now considered offensive. The term is repeated in this record in its original historical context.
      </br>
      <button class="b-search-results__offensive-warning-button">
        View record
      </button>
    </div>
`;

const offensiveWarningInitializer = () => {
  Array.from(document.querySelectorAll('.b-search-results__body-row')).forEach((el, i) => {
    if (el.classList.contains('b-search-results__body-row--offensive')) {
      const warningEl = document.createElement('DIV');
      warningEl.className = 'b-search-results__offensive-warning';
      warningEl.innerHTML = warningHTML;
      warningEl.style.top = `${el.offsetTop + (el.offsetHeight / 5)}px`;
      warningEl.style.left = `${el.getBoundingClientRect().left / 3}px`;
      warningEl.setAttribute('data-row-index', i);
      warningEl.onclick = (e) => {
        Array.from(document.querySelectorAll('.b-search-results__body-row'))[
          e.target.parentElement.getAttribute('data-row-index')
        ].classList.remove('b-search-results__body-row--offensive');
        e.target.parentElement.remove();
      };
      el.appendChild(warningEl);
      window.dispatchEvent(new Event('resize'));
    }
  });
  window.addEventListener('resize', () => {
    const table = document.querySelector('.b-search-results__table');

    Array.from(document.querySelectorAll('.b-search-results__offensive-warning')).forEach((el) => {
      const row = Array.from(document.querySelectorAll('.b-search-results__body-row'))[el.getAttribute('data-row-index')];
      el.style.top = `${row.offsetTop + (row.offsetHeight / 5)}px`;

      if (table.clientWidth < 769) {
        el.style.left = `5px`;
      } else {
        el.style.left = `${el.getBoundingClientRect().left / 5}px`;
      }
    });
  });
};

offensiveWarningInitializer();
window.dispatchEvent(new Event('resize'));

if (document.querySelector('.etc-template__results-container')) {
  document.querySelector('.etc-template__results-container').addEventListener('initWarnings', () => {
    offensiveWarningInitializer();
  });
}
