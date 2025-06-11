import cookies from 'browser-cookies';

const siteNav = document.querySelector('.b-site-nav');

if (siteNav) {
  const mobileNavToggle = siteNav.querySelectorAll('.js-site-nav__mobile-toggle');
  const mobileNavToggleIcon = siteNav.querySelector('.js-site-nav__mobile-toggle--icon');
  const navBags = siteNav.querySelectorAll('.js-site-nav-bag');
  const navSearchBtn = siteNav.querySelector('.js-site-nav-search-btn');
  const navSearch = siteNav.querySelector('.js-site-nav-search');
  const navSearchInput = navSearch.querySelector('.b-search-form__input');
  const navSearchContent = navSearch.querySelector('.js-search-content');
  const navSearchSuggest = navSearch.querySelector('.js-search-suggest');
  const shopCookieBagTotal = cookies.get('basketCount');
  const tabletNavToggle = siteNav.querySelector('.js-site-nav__tablet-toggle');

  if (!!shopCookieBagTotal && shopCookieBagTotal > 0) {
    Array.from(navBags, (navBag) => {
      navBag.classList.remove('b-site-nav__bag--hidden');
      navBag.querySelector('.js-site-nav-bag-total').innerHTML = shopCookieBagTotal < 100 ? shopCookieBagTotal : '';
      return true;
    });
  }

  if (mobileNavToggleIcon && window.getComputedStyle(mobileNavToggleIcon).display !== 'none') {
    const mobileNavToggleobserver = new IntersectionObserver(
      (entries) => {
        mobileNavToggleIcon.classList.toggle('b-site-nav__mobile-toggle--solo', !entries[0].isIntersecting);
      },
      {
        rootMargin: '-90px',
      },
    );

    mobileNavToggleobserver.observe(siteNav);
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
    } else {
      navSearch.classList.remove('b-site-nav__core__search--active');
      document.body.style.overflow = '';
    }
  };

  Array.from(mobileNavToggle, (toggle) => {
    const tabFirst = mobileNavToggleIcon;
    const tabLast = siteNav.querySelector('.b-site-nav__core__item:nth-last-child(2)>a');
    const tabListener = (e) => {
      const isTabPressed = e.key === 'Tab';
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
        siteNav.setAttribute('aria-expanded', 'false');
        document.removeEventListener('keydown', tabListener, false);
        navSearchActivate(false);
      } else {
        siteNav.classList.add('b-site-nav--open');
        siteNav.setAttribute('aria-expanded', 'true');
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
      const isTabPressed = e.key === 'Tab';
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
            results: httpRequest.responseText,
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
      eventLabel: this.tracking.eventLabel,
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
          const venue = (result.suggestions[i].venue) ? `
            <div class="b-search-result-auto-suggest-content-type b-search-result-auto-suggest-content-venue">
              ${result.suggestions[i].venue}
            </div>
          ` : '';
          suggestion.innerHTML = `
            <div class="b-search-result-auto-suggest">
              <a class="b-search-result-auto-suggest-content"
                href="${result.suggestions[i].url}">
                <img class="b-search-result-auto-suggest-image"
                    src="${imgSrc}"
                    alt=""
                    aria-hidden="true"
                    loading="lazy">
                <div class="b-search-result-auto-suggest-text">
                  <div class="b-search-result-auto-suggest-content-type">
                    ${result.suggestions[i].type}
                  </div>
                  <div class="b-search-result-auto-suggest-title">
                    ${result.suggestions[i].title}
                  </div>
                  ${venue}
                </div>
              </a>
            </div>
          `;
          suggestion.tracking = {
            eventCategory: `search - autosuggest - ${result.suggestions[i].type}`,
            eventAction: term,
            eventLabel: result.suggestions[i].url,
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
              `https://www.vam.ac.uk/services/search/suggest/popular?q=${encodeURI(navSearchInput.value)}`,
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
