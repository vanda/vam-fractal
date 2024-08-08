export default (() => {
  Array.from(document.querySelectorAll('.b-object-card-warning'), (card, i) => {
    const cardId = `object-card-${i}`;
    card.id = cardId;
    card.setAttribute('aria-hidden', 'true');
    Array.from(card.querySelectorAll('a, button'), (el) => el.setAttribute('tabindex', '-1'));
    card.innerHTML = `
    <button class="b-object-card-warning__banner" aria-expanded="false" aria-controls="${cardId}">
      <div class="b-object-card-warning__banner-text">
        This object, or the text that describes it, is deemed offensive and discriminatory. We are committed to improving our records, and work is ongoing.
      </div>
      <div class="b-object-card-warning__banner-dismiss">
        View record
      </div>
    </button>
    ${card.innerHTML}
    `;
    return true;
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.b-object-card-warning')) {
      const card = e.target.closest('.b-object-card-warning');
      card.classList.remove('b-object-card-warning');
      Array.from(card.querySelectorAll('[tabindex="-1"]'), (el) => el.removeAttribute('tabindex'));
      card.removeAttribute('aria-hidden');
      card.firstElementChild.remove();
      card.querySelector('a').focus();
    }
  });
});
