const revealEl = document.createElement('div');
const classes = [
  'etc-details__cell-concealer',
  'etc-details__cell-revealer',
];
const html = [
  '<span class="etc-details__cell-concealer-text">Read More</span><button class="etc-details__cell-concealer-button">+</button>',
  '<span class="etc-details__cell-concealer-text">Read Less</span><button class="etc-details__cell-concealer-button">-</button>',
];

function clickFunction(e) {
  const hiddenClass = 'etc-details__cell-free-content--hidden';
  const textEl = e.target.parentElement.querySelector('.etc-details__cell-free-content');
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

function initRevealer() {
  revealEl.className = classes[0];
  revealEl.innerHTML = html[0];
  revealEl.setAttribute('data-tracking-collections', 'read more');

  Array.from(document.querySelectorAll('.etc-details__cell-free')).forEach((e) => {
    if (e.offsetHeight > 200) {
      const content = e.querySelector('.etc-details__cell-free-content');
      content.classList.add('etc-details__cell-free-content--hidden');
      const clone = revealEl.cloneNode(true);
      clone.onclick = clickFunction;
      e.appendChild(clone);
    }
  });
}

initRevealer();
