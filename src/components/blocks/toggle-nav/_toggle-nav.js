import querystring from 'querystring';

const toggleNav = document.querySelector('.js-toggle-nav');

if (toggleNav) {
  const toggleNavBtns = toggleNav.querySelectorAll('.js-toggle-nav-btn');
  const qs = querystring.parse(window.location.search.replace('?', ''));
  const qsToggleType = qs.toggleType;

  Array.from(toggleNavBtns, (tog) => {
    const tnToggees = document.querySelectorAll(tog.dataset.toggeesSelector);

    tog.addEventListener('click', (e) => {
      e.preventDefault();
      const togType = tog.dataset.toggleType;
      toggleNav.scrollLeft = tog.offsetLeft
        - ((toggleNav.getBoundingClientRect().width - tog.getBoundingClientRect().width) / 2);
      if (!tog.preventHistoryPush) {
        window.history.pushState({ toggleNavType: togType }, '', `?toggleType=${togType}`);
      }
      tog.preventHistoryPush = false;
      Array.from(tnToggees, (el) => {
        el.classList.add('b-toggle-nav-target--hidden');
        if (el.dataset.toggleType === togType) {
          el.classList.remove('b-toggle-nav-target--hidden');
        }
        return true;
      });
      Array.from(toggleNavBtns, (el) => {
        el.classList.remove('s-themed--border-color');
        return true;
      });
      tog.classList.add('s-themed--border-color');
    }, false);

    if (tog.dataset.toggleType === qsToggleType) {
      tog.preventHistoryPush = true;
      setTimeout(() => { tog.click(); }, 50);
    }

    return true;
  });

  window.addEventListener('popstate', (e) => {
    Array.from(document.querySelectorAll('b-toggle-nav-target--hidden'), (el) => {
      el.classList.remove('b-toggle-nav-target--hidden');
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
