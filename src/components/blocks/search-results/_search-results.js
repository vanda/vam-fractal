const warningHTML = rowIndex => `
  <div class="b-search-results__offensive-warning" data-row-index="${rowIndex}">
    <div class="b-search-results__offensive-warning-text">
      This record uses a term that has since fallen from usage and is now considered offensive. The term is repeated in this record in its original historical context.
    </div>
    </br>
    <button class="b-search-results__offensive-warning-button">
      View record
    </button>
  </div>
`;

const offensiveWarningInitializer = () => {
  Array.from(document.querySelectorAll('.b-search-results__body-row--offensive')).forEach((el, i) => {
    const warningEl = document.createElement('DIV');
    warningEl.className = "b-search-results__offensive-warning";
    warningEl.innerHTML = warningHTML(i);
    warningEl.style.top = `${el.offsetTop}px`;
    document.querySelector('.b-search-results').appendChild(warningEl);
  });
};

offensiveWarningInitializer();
