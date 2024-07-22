export default (() => {
  Array.from(document.querySelectorAll('.b-object-card-warning'), (card) => {
    card.innerHTML = `
      <button class="b-object-card-warning__banner"
        role="comment" id="${card.getAttribute('aria-details')}">
        <div class="b-object-card-warning__banner-text">
          This object, or the text that describes it, is deemed offensive and discriminatory. We are committed to improving our records, and work is ongoing.
        </div>
        <div class="b-object-card-warning__banner-dismiss" aria-hidden="true">
          View record
        </div>
      </button>
      ${card.innerHTML}
    `;
    return true;
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.b-object-card-warning')) {
      e.target.closest('.b-object-card-warning').classList.remove('b-object-card-warning');
      e.target.remove();
    }
  });
});
