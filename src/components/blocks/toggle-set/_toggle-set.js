import carouselInit from '../carousel/_carousel';

document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.b-toggle-set__button');
  if (toggle) {
    const toggleSet = toggle.closest('.b-toggle-set');
    const toggleNav = toggleSet.querySelector('.b-toggle-set__nav');

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

      /* activate any b-carousel components that might be revealed within this toggle target
       * asycnhronously, once toggle target takes space in the doc */
      Array.from(toggleTarget.querySelectorAll('.b-carousel'), (carousel) => {
        setTimeout(() => { carouselInit(carousel); }, 0);
        return true;
      });
      return true;
    });
  }
});

/* initialise toggleSets */
document.addEventListener('DOMContentLoaded', () => {
  const toggleSets = Array.from(document.querySelectorAll('.b-toggle-set'));

  /* activate each toogleNav by clicking its default toggle
  * supplied as its data-toggle-set-default-type attribute else default to its first toggle */
  toggleSets.forEach((toggleSet) => {
    const toggleTypeDefault = toggleSet.querySelector('[data-toggle-set-default-type]') || toggleSet.querySelector('.b-toggle-set__button');
    toggleTypeDefault.click();
  });

  /* Pre-load remaining inactive tabs on intersection with the viewport
   * enabling visibility transitions on switching between tabs */
  const onIntersectionObserved = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const toggleSet = entry.target;
        Array.from(toggleSet.querySelectorAll('.b-toggle-set__target'), (toggleSetTarget) => {
          toggleSetTarget.classList.add('b-toggle-set__target--pre-loaded');
          return true;
        });
      }
    });
  };
  /* create an observer
   * and observe each toggleSet */
  const observer = new IntersectionObserver(onIntersectionObserved, { threshold: 0.5 });
  toggleSets.forEach((toggleSet) => observer.observe(toggleSet));
});
