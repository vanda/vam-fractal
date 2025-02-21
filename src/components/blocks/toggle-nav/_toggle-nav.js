const toggleNav = document.querySelector('.js-toggle-nav');

if (toggleNav) {
  const toggleNavBtns = toggleNav.querySelectorAll('.js-toggle-nav-btn');
  const urlParams = new URLSearchParams(window.location.search);
  let qsToggleType = '';

  if (urlParams.has('type') === true) {
    qsToggleType = urlParams.get('type');
  }

  Array.from(toggleNavBtns, (tog) => {
    const tnToggees = document.querySelectorAll(tog.dataset.toggeesSelector);
    const isDarkVariation = tog.classList.contains('u-btn--pill-dark');

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

    if (tog.dataset.toggleType === qsToggleType) {
      tog.preventHistoryPush = true;
      setTimeout(() => { tog.click(); }, 50);
    }

    return true;
  });

  window.addEventListener('popstate', (e) => {
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
