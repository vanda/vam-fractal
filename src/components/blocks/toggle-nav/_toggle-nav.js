document.addEventListener('click', (e) => {
  const toggleNav = e.target.closest('.b-toggle-nav');
  if (toggleNav) {
    const tog = e.target;

    /* scroll button to centre */
    toggleNav.scrollLeft = tog.offsetLeft
      - ((toggleNav.getBoundingClientRect().width - tog.getBoundingClientRect().width) / 2);

    /* show/hide related toggleable element */
    const togType = tog.dataset.toggleType;
    const togees = document.querySelectorAll(tog.dataset.togeesSelector);
    Array.from(togees, (el) => {
      el.style.display = 'none';
      if (el.dataset.toggleType === togType) {
        el.style.display = 'block';
      }
      return true;
    });

    const toggleNavBtns = toggleNav.querySelectorAll('.js-toggle-nav-btn');
    const isDarkVariation = tog.classList.contains('u-btn--pill-dark');
    Array.from(toggleNavBtns, (el) => {
      if (isDarkVariation) {
        el.classList.add('u-btn--pill-dark');
      } else {
        el.classList.add('u-btn--pill-light');
        el.classList.remove('u-btn--pill-darkest');
      }
      return true;
    });
    if (isDarkVariation) {
      tog.classList.remove('u-btn--pill-dark');
    } else {
      tog.classList.remove('u-btn--pill-light');
      tog.classList.add('u-btn--pill-darkest');
    }
  }
});

/* auto click any toogleNav's default toggle, if set */
Array.from(document.querySelectorAll('.js-toggle-nav[data-toggle-type-default]'), (toggleNav) => {
  toggleNav.querySelector(`[data-toggle-type=${toggleNav.dataset.toggleTypeDefault}]`).click();
  return true;
});
