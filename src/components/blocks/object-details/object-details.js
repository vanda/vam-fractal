const initRevealers = () => {
  const maxHiddenContentHeight = 200;
  const hiddenContentHeightBuffer = 40;
  const classes = [
    'b-object-details__cell-control b-object-details__cell-concealer',
    'b-object-details__cell-control b-object-details__cell-revealer',
  ];
  const html = [
    `<button class="b-object-details__cell-concealer-button" data-tracking-collections="read more" aria-label="Read more">
    <span class="b-object-details__cell-concealer-text">Read more</span>
    </button>`,
    `<button class="b-object-details__cell-concealer-button b-object-details__cell-concealer-button--minus" data-tracking-collections="read less" aria-label="Read less">
    <span class="b-object-details__cell-concealer-text">Read less</span>
    </button>`,
  ];

  Array.from(document.querySelectorAll('.b-object-details__cell-free')).forEach((el) => {
    if (el.offsetHeight > maxHiddenContentHeight) {
      const content = el.querySelector('.b-object-details__cell-free-content');

      if (content) {
        // test for significant hidden text
        el.style.height = `${maxHiddenContentHeight}px`;
        el.style.overflow = 'hidden';

        if (el.scrollHeight >= maxHiddenContentHeight + hiddenContentHeightBuffer) {
          // significant overflow text
          const revealEl = document.createElement('DIV');
          revealEl.className = classes[0];
          revealEl.innerHTML = html[0];

          content.classList.add('b-object-details__cell-free-content--hidden');

          el.removeAttribute('style');
          el.appendChild(revealEl);
        } else {
          // insignificant overflow text
          el.removeAttribute('style');
        }
      }
    }
  });

  if (document.querySelector('.b-object-details__cell-control')) {
    const clickFunction = (e) => {
      const detailsEl = e.target.closest('.b-object-details__cell-free');
      const textEl = detailsEl.querySelector('.b-object-details__cell-free-content');
      const controlEl = detailsEl.querySelector('.b-object-details__cell-control');
      const hiddenClass = 'b-object-details__cell-free-content--hidden';
      const textElConcealed = textEl.classList.contains(hiddenClass);

      controlEl.innerHTML = html[textElConcealed ? 1 : 0];
      controlEl.className = classes[textElConcealed ? 1 : 0];

      if (textElConcealed) {
        textEl.classList.remove(hiddenClass);
        controlEl.querySelector('.b-object-details__cell-concealer-button').setAttribute('data-tracking-collections', 'read less');
      } else {
        textEl.classList.add(hiddenClass);
        controlEl.querySelector('.b-object-details__cell-concealer-button').setAttribute('data-tracking-collections', 'read more');
      }
    };

    document.addEventListener('click', (e) => {
      if (e.target.closest('.b-object-details__cell-concealer-button')) {
        clickFunction(e);
      }
    });
  }
};

initRevealers();
