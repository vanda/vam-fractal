document.addEventListener('click', (e) => {
  const toggleNav = e.target.closest('.b-toggle-nav');
  if (toggleNav) {
    const toggle = e.target;

    /* move active class to new active toggle */
    const toggleActive = toggleNav.querySelector('.u-btn--pill-active');
    if (toggleActive) toggleActive.classList.remove('u-btn--pill-active');
    toggle.classList.add('u-btn--pill-active');

    /* scroll active toggle to centre */
    toggleNav.scrollLeft = toggle.offsetLeft
      - ((toggleNav.getBoundingClientRect().width - toggle.getBoundingClientRect().width) / 2);

    /* show/hide targeted toggleable element */
    const toggleType = toggle.dataset.toggleType;
    const toggleTargets = document.querySelectorAll(toggle.dataset.toggleTargetsSelector);
    Array.from(toggleTargets, (el) => {
      el.style.display = 'none';
      if (el.dataset.toggleType === toggleType) {
        el.style.display = 'block';
      }
      return true;
    });
  }
});

/* auto click any toogleNav's default toggle, if set */
Array.from(document.querySelectorAll('.js-toggle-nav[data-toggle-type-default]'), (toggleNav) => {
  toggleNav.querySelector(`[data-toggle-type=${toggleNav.dataset.toggleTypeDefault}]`).click();
  return true;
});
