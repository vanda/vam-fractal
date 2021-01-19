export default (() => {
  Array.from(document.querySelectorAll('.b-object-card__warning'), (card) => {
    card.innerHTML = `
      <div class="b-object-card__warning__banner">
        <div class="b-object-card__warning__banner__text">
          This object, or the text that describes it, is deemed offensive and discriminatory. We are committed to improving our records, and work is ongoing.
        </div>
        <div class="b-object-card__warning__banner__dismiss">
          View record
        </div>
      </div>
      ${card.innerHTML}
    `;
    return true;
  });
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
