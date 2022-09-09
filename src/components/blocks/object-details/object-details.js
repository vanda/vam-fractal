const revealEl = document.createElement('DIV');
const classes = [
  'b-object-details__cell-concealer',
  'b-object-details__cell-revealer'
];
const html = [
  '<span class="b-object-details__cell-concealer-text">Read more</span><button class="b-object-details__cell-concealer-button b-object-details__cell-concealer-button--more"></button>',
  '<span class="b-object-details__cell-concealer-text">Read less</span><button class="b-object-details__cell-concealer-button"></button>'
];

function clickFunction (e) {
  const hiddenClass = 'b-object-details__cell-free-content--hidden';
  const textEl = e.target.parentElement.querySelector('.b-object-details__cell-free-content');
  const textElConcealed = textEl.classList.contains(hiddenClass);

  e.target.innerHTML = html[textElConcealed ? 1 : 0];
  e.target.className = classes[textElConcealed ? 1 : 0];

  if (textElConcealed) {
    textEl.classList.remove(hiddenClass);
    e.target.setAttribute('data-tracking-collections', 'read less');
  } else {
    textEl.classList.add(hiddenClass);
    e.target.setAttribute('data-tracking-collections', 'read more');
  }
}

function initRevealer () {
  revealEl.className = classes[0];
  revealEl.innerHTML = html[0];
  revealEl.setAttribute('data-tracking-collections', 'read more');

  Array.from(document.querySelectorAll('.b-object-details__cell-free')).forEach((e) => {
    if (e.offsetHeight > 200) {
      const content = e.querySelector('.b-object-details__cell-free-content');
      content.classList.add('b-object-details__cell-free-content--hidden');
      const clone = revealEl.cloneNode(true);
      clone.onclick = clickFunction;
      e.appendChild(clone);
    }
  });
}

initRevealer();
