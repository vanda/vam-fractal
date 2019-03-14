import querystring from 'querystring';

const toggleNav = document.querySelector('.js-toggle-nav');

if (toggleNav) {
  const toggleNavBtns = toggleNav.querySelectorAll('.js-toggle-nav-btn');
  const qs = querystring.parse(window.location.search.replace('?', ''));
  const qsToggleType = qs.type;

  Array.from(toggleNavBtns, (tog) => {
    const tnToggees = document.querySelectorAll(tog.dataset.toggeesSelector);

    tog.addEventListener('click', (e) => {
      e.preventDefault();
      const togType = tog.dataset.toggleType;
      toggleNav.scrollLeft = tog.offsetLeft
        - ((toggleNav.getBoundingClientRect().width - tog.getBoundingClientRect().width) / 2);
      if (!tog.preventHistoryPush) {
        window.history.pushState({ toggleNavType: togType }, '', `?type=${togType}`);
      }
      tog.preventHistoryPush = false;
      Array.from(tnToggees, (el) => {
        el.classList.add('s-visually-hidden');
        if (el.dataset.toggleType === togType) {
          el.classList.remove('s-visually-hidden');
        }
        return true;
      });
      Array.from(toggleNavBtns, (el) => {
        el.classList.remove('b-toggle-nav__button--active');
        return true;
      });
      tog.classList.add('b-toggle-nav__button--active');
    }, false);

    if (tog.dataset.toggleType === qsToggleType) {
      tog.preventHistoryPush = true;
      setTimeout(() => { tog.click(); }, 50);
    }

    return true;
  });

  window.addEventListener('popstate', (e) => {
    Array.from(document.querySelectorAll('s-visually-hidden'), (el) => {
      el.classList.remove('s-visually-hidden');
      return true;
    });
    if (e.state && e.state.toggleNavType) {
      Array.from(toggleNavBtns, (tog) => {
        if (e.state.toggleNavType === tog.dataset.toggleType) {
          tog.preventHistoryPush = true;
          tog.click();
        }
        return true;
      });
    }
    return true;
  }, false);

  if (!qsToggleType && typeof toggleNav.dataset.toggleTypeDefault !== 'undefined') {
    document.querySelector(`[data-toggle-type=${toggleNav.dataset.toggleTypeDefault}]`).click();
  }
}
