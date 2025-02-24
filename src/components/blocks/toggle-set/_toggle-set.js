document.addEventListener('click', (e) => {
  const toggleNav = e.target.closest('.b-toggle-set__nav');
  if (toggleNav) {
    const toggle = e.target;
    const toggleSet = toggleNav.closest('.b-toggle-set');

    /* move active class to new active toggle */
    const toggleActive = toggleNav.querySelector('.u-btn--pill-active');
    if (toggleActive) {
      toggleActive.classList.remove('u-btn--pill-active');
      toggleActive.setAttribute('aria-expanded', false);
      toggleActive.setAttribute('aria-selected', false);
    }
    toggle.classList.add('u-btn--pill-active');
    toggle.setAttribute('aria-expanded', true);
    toggle.setAttribute('aria-selected', true);

    /* scroll active toggle to centre */
    toggleNav.scrollLeft = toggle.offsetLeft
      - ((toggleNav.getBoundingClientRect().width - toggle.getBoundingClientRect().width) / 2);

    /* deactive any active toggle target elements belonging to this toggle set */
    Array.from(toggleSet.querySelectorAll('.b-toggle-set__target--active'), (toggleTarget) => {
      toggleTarget.classList.remove('b-toggle-set__target--active');
      return true;
    });

    /* activate toggle target elements aria-controlled by this toggle
     * note! aria-controls can take a space delimited set of target IDs */
    const toggleTargetIds = toggle.getAttribute('aria-controls').split(' ').map((id) => `#${id}`);
    Array.from(toggleSet.querySelectorAll(...toggleTargetIds), (toggleTarget) => {
      toggleTarget.classList.add('b-toggle-set__target--active');
      return true;
    });
  }
});

/* activate each toogleNav by clicking its default toggle
 * either supplied as its data-toggle-set-default-type attribute
 * else default to its first toggle */
Array.from(document.querySelectorAll('.b-toggle-set__nav'), (toggleNav) => {
  const toggleTypeDefault = toggleNav.querySelector('[data-toggle-set-default-type]') || toggleNav.querySelector('.b-toggle-set__button');
  toggleTypeDefault.click();
  return true;
});
