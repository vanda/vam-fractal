const svgSprite = document.getElementById('vam-svg-sprite-path');
const revealEl = document.createElement('DIV');
const classes = [
  'b-object-details__cell-control b-object-details__cell-concealer',
  'b-object-details__cell-control b-object-details__cell-revealer',
];
const html = [
  `<button class="b-object-details__cell-concealer-button" aria-label="Read more">
    <span class="b-object-details__cell-concealer-text">Read more</span>
    <svg role="presentation" class="b-object-details__cell-concealer-svg">
      <use xlink:href="${svgSprite.href}#plus"></use>
    </svg>
    </button>`,
  `<button class="b-object-details__cell-concealer-button" aria-label="Read less">
    <span class="b-object-details__cell-concealer-text">Read less</span>
    <svg role="presentation" class="b-object-details__cell-concealer-svg">
      <use xlink:href="${svgSprite.href}#minus"></use>
    </svg>
  </button>`,
];

function clickFunction(e) {
  const detailsEl = e.target.closest('.b-object-details__cell-free');
  const textEl = detailsEl.querySelector('.b-object-details__cell-free-content');
  const controlEl = detailsEl.querySelector('.b-object-details__cell-control');
  const hiddenClass = 'b-object-details__cell-free-content--hidden';
  const textElConcealed = textEl.classList.contains(hiddenClass);

  controlEl.innerHTML = html[textElConcealed ? 1 : 0];
  controlEl.className = classes[textElConcealed ? 1 : 0];

  if (textElConcealed) {
    textEl.classList.remove(hiddenClass);
    controlEl.setAttribute('data-tracking-collections', 'read less');
  } else {
    textEl.classList.add(hiddenClass);
    controlEl.setAttribute('data-tracking-collections', 'read more');
  }
}

function initRevealer() {
  const maxHiddenContentHeight = 200;
  const hiddenContentHeightBuffer = 40;

  revealEl.className = classes[0];
  revealEl.innerHTML = html[0];
  revealEl.setAttribute('data-tracking-collections', 'read more');

  Array.from(document.querySelectorAll('.b-object-details__cell-free')).forEach((e) => {
    if (e.offsetHeight > maxHiddenContentHeight) {
      const content = e.querySelector('.b-object-details__cell-free-content');

      // test for significant hidden text
      e.style.height = `${maxHiddenContentHeight}px`;
      e.style.overflow = 'hidden';

      if (e.scrollHeight >= maxHiddenContentHeight + hiddenContentHeightBuffer) {
        // significant overflow text
        const clone = revealEl.cloneNode(true);

        content.classList.add('b-object-details__cell-free-content--hidden');

        e.removeAttribute('style');
        e.appendChild(clone);
      } else {
        // insignificant overflow text
        e.removeAttribute('style');
      }
    }
  });
}

document.addEventListener('click', (e) => {
  if (e.target.closest('.b-object-details__cell-concealer-button')) {
    clickFunction(e);
  }
});

initRevealer();
