const contentWarningsInit = () => {
  Array.from(document.querySelectorAll('.b-object-card__warning'), (card) => {
    card.innerHTML = `
      <div class="b-object-card__warning__banner">
        <div class="b-object-card__warning__banner__text">
          This record uses a term that has since fallen from usage and is now considered offensive. The term is repeated in this record in its original historical context.
        </div>
        <div class="b-object-card__warning__banner__dismiss">
          View record
        </div>
      </div>
      ${card.innerHTML}
    `;
    return true;
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.b-object-card__warning')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.target.closest('.b-object-card__warning').classList.remove('b-object-card__warning');
      return false;
    }
    return true;
  }, false);
};
contentWarningsInit();

export default contentWarningsInit;
