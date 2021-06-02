import cookies from 'browser-cookies';
import smoothScroll from 'smooth-scroll';

const siteNav = document.querySelector('.js-site-nav');

if (siteNav) {
  const winHeight = document.querySelector('html').scrollHeight;
  const mobileNavToggle = document.querySelectorAll('.js-site-nav__mobile-toggle');
  const mobileNavToggleIcon = document.querySelector('.js-site-nav__mobile-toggle--icon');
  const mobileNavToggleText = document.querySelector('.js-site-nav__mobile-toggle-text');
  const mobileNavTop = document.querySelector('.js-site-nav__mobile-top');
  const navBag = document.querySelector('.js-site-nav-bag');
  const navBagTotal = document.querySelector('.js-site-nav-bag-total');
  const navSearchBtn = document.querySelector('.js-site-nav-search-btn');
  const navSearch = document.querySelector('.js-site-nav-search');
  const navSearchInput = document.querySelector('.js-nav-search-input');
  const navSearchContent = document.querySelector('.js-search-content');
  const navSearchSuggest = document.querySelector('.js-search-suggest');
  const shopCookieBagTotal = cookies.get('basketCount');
  const tabletNavToggle = document.querySelector('.js-site-nav__tablet-toggle');

  const scrollMonitor = (callback) => {
    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', (e) => {
      e.preventDefault();
      lastScrollY = window.pageYOffset;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          callback.call(this, lastScrollY);
          ticking = false;
        });
      }
      ticking = true;
      return true;
    }, false);
  };

  if (!!shopCookieBagTotal && shopCookieBagTotal > 0) {
    if (navBag) {
      navBag.classList.remove('b-site-nav__bag--hidden');
    }
    navBagTotal.innerHTML = shopCookieBagTotal < 100 ? shopCookieBagTotal : '';
    if (mobileNavToggleIcon) {
      mobileNavToggleText.classList.add('b-site-nav__mobile-toggle-text--hidden');
    }
  }

  if (mobileNavToggleIcon && window.getComputedStyle(mobileNavToggleIcon).display !== 'none') {
    const scrollReact = (scrollY) => {
      if (scrollY > 60) {
        mobileNavToggleIcon.classList.add('b-site-nav__mobile-toggle--solo');
      } else {
        mobileNavToggleIcon.classList.remove('b-site-nav__mobile-toggle--solo');
      }
      if (scrollY / winHeight > 0.35) {
        mobileNavTop.classList.add('b-site-nav__mobile-top--show');
        mobileNavTop.setAttribute('tabindex', 0);
      } else {
        mobileNavTop.classList.remove('b-site-nav__mobile-top--show');
        mobileNavTop.setAttribute('tabindex', -1);
      }
    };
    scrollMonitor(scrollReact);

    mobileNavTop.addEventListener('click', () => {
      smoothScroll.animateScroll(0);
    });
  }

  if (tabletNavToggle) {
    tabletNavToggle.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.js-site-nav-more').classList.toggle('active');
    }, false);
  }

  const navSearchActivate = (activate) => {
    if (activate) {
      navSearch.classList.add('b-site-nav__core__search--active');
      document.body.style.overflow = 'hidden';
      navSearchInput.focus();
      navSearchInput.setSelectionRange(100, 100);
    } else {
      navSearch.classList.remove('b-site-nav__core__search--active');
      document.body.style.overflow = '';
    }
  };

  Array.from(mobileNavToggle, (toggle) => {
    const tabFirst = mobileNavToggleIcon;
    const tabLast = siteNav.querySelector('.b-site-nav__core__item:nth-last-child(2)>a');
    const tabListener = (e) => {
      const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
      if (isTabPressed) {
        if (document.activeElement === tabFirst && e.shiftKey) {
          e.preventDefault();
          tabLast.focus();
        } else if (document.activeElement === tabLast && !e.shiftKey) {
          e.preventDefault();
          tabFirst.focus();
        }
      }
    };
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (siteNav.classList.contains('b-site-nav--open')) {
        siteNav.classList.remove('b-site-nav--open');
        document.removeEventListener('keydown', tabListener, false);
        navSearchActivate(false);
      } else {
        siteNav.classList.add('b-site-nav--open');
        document.addEventListener('keydown', tabListener, false);
        navSearchActivate(true);
      }
    }, false);
    return true;
  });

  if (navSearchBtn) {
    const tabFirst = navSearchInput;
    const tabLast = navSearchBtn;
    const tabListener = (e) => {
      const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
      if (isTabPressed) {
        if (document.activeElement === tabFirst && e.shiftKey) {
          e.preventDefault();
          tabLast.focus();
        } else if (document.activeElement === tabLast && !e.shiftKey) {
          e.preventDefault();
          tabFirst.focus();
        }
      }
    };
    navSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navSearchBtn.classList.contains('b-site-nav__core__search-btn--active')) {
        navSearchBtn.classList.remove('b-site-nav__core__search-btn--active');
        document.removeEventListener('keydown', tabListener, false);
        navSearchActivate(false);
      } else {
        navSearchBtn.classList.add('b-site-nav__core__search-btn--active');
        document.addEventListener('keydown', tabListener, false);
        navSearchActivate(true);
      }
    }, false);
  }

  let storedSearch = JSON.parse(sessionStorage.getItem('storedSearch'));
  if (!storedSearch || Date.parse(new Date()) > Date.parse(storedSearch.expires)) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://www.vam.ac.uk/services/search/suggest/promoted');
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          const expires = new Date();
          const storedSearchResults = {
            expires: new Date(expires.setMinutes(expires.getMinutes() + 15)),
            results: httpRequest.responseText
          };
          sessionStorage.setItem('storedSearch', JSON.stringify(storedSearchResults));
          storedSearch = JSON.parse(sessionStorage.getItem('storedSearch'));
        }
      }
    };
  }

  const trackAutosuggest = () => {
    window.dataLayer.push({
      event: 'autosuggest search',
      eventCategory: this.tracking.eventCategory,
      eventAction: this.tracking.eventAction,
      eventLabel: this.tracking.eventLabel
    });
  };

  const autoSuggest = (regEx, json, term, liveResult) => {
    let i = null;
    let title = null;
    let imgSrc = null;
    JSON.parse(json).forEach((result) => {
      for (i = 0; i < result.suggestions.length; i += 1) {
        title = result.suggestions[i].title;
        if (result.suggestions[i].terms) {
          title = result.suggestions[i].terms.join('|');
        }
        if (regEx.test(title)) {
          navSearchContent.classList.remove('b-site-nav__core__search__container--hidden');
          if (result.suggestions[i].icon) {
            imgSrc = result.suggestions[i].icon;
          } else {
            imgSrc = 'https://s3-eu-west-1.amazonaws.com/vanda-production-assets/static/search/result_placeholder.jpg';
          }
          const suggestion = document.createElement('li');
          if (liveResult) { suggestion.classList.add('js-live-result'); }
          suggestion.innerHTML = `
            <div class="b-search-result-auto-suggest">
              <a class="b-search-result-auto-suggest-content"
                href="${result.suggestions[i].url}">
                <img class="b-search-result-auto-suggest-image"
                    src="${imgSrc}"
                    alt=""
                    aria-hidden="true">
                <div class="b-search-result-auto-suggest-text">
                  <div class="b-search-result-auto-suggest-content-type">
                    ${result.suggestions[i].type}
                  </div>
                  <div class="b-search-result-auto-suggest-title">
                    ${result.suggestions[i].title}
                  </div>
                </div>
              </a>
            </div>
          `;
          suggestion.tracking = {
            eventCategory: `search - autosuggest - ${result.suggestions[i].type}`,
            eventAction: term,
            eventLabel: result.suggestions[i].url
          };
          suggestion.addEventListener('click', trackAutosuggest);
          navSearchSuggest.appendChild(suggestion);
        }
      }
    });
  };

  if (navSearchInput) {
    navSearchInput.addEventListener('input', () => {
      if (navSearchInput.value.length < 42) {
        navSearchContent.classList.add('b-site-nav__core__search__container--hidden');
        navSearchSuggest.innerHTML = '';
        if (navSearchInput.value.length) {
          /* title (or one of the pipe delimited terms for hot-topics)
           * begins with search term */
          let regExStart = '(^|\\|)';
          if (navSearchInput.value.length > 2) {
            /* any word in the title begins with search term
             * (all hot-topic terms get tested since pipe delimiters count as word-boundaries) */
            regExStart = '\\b';
          }
          const term = navSearchInput.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
          const regEx = new RegExp(`${regExStart}${term}.*`, 'i');
          autoSuggest(regEx, storedSearch.results, navSearchInput.value, false);
          if (navSearchInput.value.length > 4) {
            const httpRequest = new XMLHttpRequest();
            httpRequest.open(
              'GET',
              `https://www.vam.ac.uk/services/search/suggest/popular?q=${encodeURI(navSearchInput.value)}`
            );
            httpRequest.send();
            httpRequest.onreadystatechange = () => {
              if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                  Array.from(navSearchSuggest.querySelectorAll('.js-live-result'), (el) => {
                    el.remove();
                    return true;
                  });
                  autoSuggest(regEx, httpRequest.responseText, navSearchInput.value, true);
                }
              }
            };
          }
        }
      }
    }, false);
  }
}
