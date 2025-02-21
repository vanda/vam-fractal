Array.from(document.querySelectorAll('.js-toggle-nav'), (toggleNav) => {
  const toggleNavBtns = toggleNav.querySelectorAll('.js-toggle-nav-btn');

  Array.from(toggleNavBtns, (tog) => {
    const tnToggees = document.querySelectorAll(tog.dataset.toggeesSelector);
    const isDarkVariation = tog.classList.contains('u-btn--pill-dark');

    tog.addEventListener('click', (e) => {
      e.preventDefault();
      const togType = tog.dataset.toggleType;

      /* scroll button to centre */
      toggleNav.scrollLeft = tog.offsetLeft
        - ((toggleNav.getBoundingClientRect().width - tog.getBoundingClientRect().width) / 2);

      Array.from(tnToggees, (el) => {
        el.style.display = 'none';
        if (el.dataset.toggleType === togType) {
          el.style.display = 'block';
        }
        return true;
      });

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
    });

    return true;
  });

  if ('toggleTypeDefault' in toggleNav.dataset) {
    document.querySelector(`[data-toggle-type=${toggleNav.dataset.toggleTypeDefault}]`).click();
  }

  return true;
});
