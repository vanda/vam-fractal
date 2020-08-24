const warningHTML = `
    <div class="b-search-results__offensive-warning-text">
      This record uses a term that has since fallen from usage and is now considered offensive. The term is repeated in this record in its original historical context.
    </div>
    <button class="b-search-results__offensive-warning-button">
      View record
    </button>
`;

const offensiveWarningInitializer = () => {
  Array.from(document.querySelectorAll('.b-search-results__body-row')).forEach((el, i) => {
    if (el.classList.contains('b-search-results__body-row--offensive')) {
      const warningEl = document.createElement('DIV');
      warningEl.className = "b-search-results__offensive-warning";
      warningEl.innerHTML = warningHTML;
      warningEl.style.top = `${el.offsetTop + (el.offsetHeight / 4) }px`;
      warningEl.style.left = `${el.getBoundingClientRect().left}px`;
      warningEl.setAttribute('data-row-index', i);
      warningEl.onclick = e => {
        Array.from(document.querySelectorAll('.b-search-results__body-row'))[e.target.parentElement.getAttribute('data-row-index')].classList.remove('b-search-results__body-row--offensive');
        e.target.parentElement.remove();
      }
      document.querySelector('.b-search-results').appendChild(warningEl);
    }
  });
  window.addEventListener('resize', e => {
    Array.from(document.querySelectorAll('.b-search-results__offensive-warning')).forEach(el => {
       const row = Array.from(document.querySelectorAll('.b-search-results__body-row'))[el.getAttribute('data-row-index')];
       el.style.top = `${row.offsetTop + (row.offsetHeight / 4) }px`;
       if (window.outerWidth < 1200) {
         el.style.left = `${row.getBoundingClientRect().left}px`;
       }
    })
  });
};

offensiveWarningInitializer();
