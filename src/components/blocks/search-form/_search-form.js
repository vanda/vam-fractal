/* eslint-disable no-underscore-dangle */
const loadSuggestions = (searchForm) => {
  searchForm._props.storedSuggestions = JSON.parse(sessionStorage.getItem(`storedSuggestions_${searchForm._props.type}`));
  const now = new Date();
  if (!searchForm._props.storedSuggestions
    || now.getTime() > searchForm._props.storedSuggestions.expires) {
    const promise = fetch(searchForm._props.suggestionsTop, { cache: 'no-cache' })
      .then(response => response.json())
      .then((data) => {
        const suggestions = {
          expires: now.getTime() + (15 * 60000),
          data
        };
        searchForm._props.storedSuggestions = suggestions;
        sessionStorage.setItem(`storedSuggestions_${searchForm._props.type}`, JSON.stringify(searchForm._props.storedSuggestions));
      })
      .catch(e => console.error(e.name, e.message)); // eslint-disable-line no-console
    return promise;
  }
  return Promise.resolve(true);
};

const trackAutosuggest = (e) => {
  window.dataLayer.push({
    event: e.target.tracking.event,
    eventCategory: e.target.tracking.eventCategory,
    eventAction: e.target.tracking.eventAction,
    eventLabel: e.target.tracking.eventLabel
  });
};

Array.from(document.querySelectorAll('.js-search-site, .js-search-etc-gateway'), (searchForm) => {
  const searchInput = searchForm.querySelector('.b-search-form__input');

  if (searchForm.classList.contains('js-search-site')) {
    /* Main site search */
    searchForm._props = {
      type: 'siteSearch'
    };
    const searchUnderscore = searchForm.querySelector('.b-search-form__underscore');
    const searchSubmit = searchForm.querySelector('.b-search-form__submit');
    const searchClear = searchForm.querySelector('.b-search-form__clear');


    const searchDecorate = () => {
      /* underline input field value */
      searchUnderscore.innerHTML = searchInput.value.replace(/\s/g, '&nbsp;');
    };

    const searchActivate = () => {
      searchClear.classList.add('b-search-form__clear--hidden');
      if (searchInput.value.length) {
        searchSubmit.classList.remove('b-search-form__submit--hidden');
      } else {
        searchSubmit.classList.add('b-search-form__submit--hidden');
      }
    };

    const searchReset = () => {
      searchClear.classList.add('b-search-form__clear--hidden');
      searchInput.value = '';
      searchDecorate();
    };

    if (searchInput.value.length) {
      searchClear.classList.remove('b-search-form__clear--hidden');
    } else {
      searchSubmit.classList.add('b-search-form__submit--hidden');
    }
    searchInput.focus();
    searchDecorate();
    searchInput.addEventListener('input', () => {
      searchDecorate();
      searchActivate();
    }, false);
    searchClear.addEventListener('click', searchReset, false);
  } else if (searchForm.classList.contains('js-search-etc-gateway')) {
    /* EtC landing pg search */
    searchForm._props = {
      type: 'etcGatewaySearch',
      suggestionsTop: 'http://vam-etc-test.azureedge.net/assets/data/suggestions.json',
      suggestionsAPI: 'http://vam-etc-test-api.azureedge.net/api/v2/sayt/search'
    };

    const suggestionsEl = searchForm.querySelector('.b-search-form__suggestions');

    const autoSuggest = (term, suggestion) => {
      const suggestEl = document.createElement('a');
      if (suggestionsEl.childElementCount < 10) {
        const title = suggestion.displayName || suggestion.displayTerm;
        const url = `http://vam-etc-test.azureedge.net/search/?id_${suggestion.index.toLowerCase()}=${suggestion.uniqueID}`;
        suggestEl.className = 'b-search-form__suggestion';
        suggestEl.href = url;
        suggestEl.tabindex = 0;
        suggestEl.role = 'option';
        suggestEl.innerHTML = `
          <div class="b-search-form__suggestion-type">
            ${suggestion.index}
          </div>
          ${title}
        `;
        suggestEl.tracking = {
          event: 'autosuggest EtC landing',
          eventCategory: `search - autosuggest - ${suggestion.index}`,
          eventAction: term,
          eventLabel: url
        };
        suggestEl.addEventListener('click', trackAutosuggest);
        suggestionsEl.appendChild(suggestEl);
      }
    };

    loadSuggestions(searchForm)
      .then(() => {
        let aborter = null;
        searchInput.addEventListener('input', () => {
          searchForm.removeAttribute('suggesting');
          suggestionsEl.innerHTML = '';
          if (searchInput.value.length) {
            const term = searchInput.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            /* title (or one of the pipe delimited terms for hot-topics)
             * begins with search term */
            let regExStart = '(^|\\|)';
            if (searchInput.value.length > 2) {
              /* any word in the title begins with search term
               * (all hot-topic terms get tested since pipe delimiters count as word-boundaries) */
              regExStart = '\\b';
            }
            const regEx = new RegExp(`${regExStart}${term}.*`, 'i');
            Array.from(searchForm._props.storedSuggestions.data, (result) => {
              Array.from(result.suggestions, (suggestion) => {
                const name = suggestion.displayName;
                if (regEx.test(name)) {
                  searchForm.setAttribute('suggesting', true);
                  autoSuggest(searchInput.value, suggestion);
                }
                return true;
              });
              return true;
            });
            if (searchInput.value.length > 4) {
              // cancel pending request if any
              if (aborter) aborter.abort();
              // make our request cancellable
              aborter = new window.AbortController();
              setTimeout(() => aborter.abort(), 500);
              fetch(`${searchForm._props.suggestionsAPI}?q=${encodeURI(term)}&page_size=10`, { signal: aborter.signal })
                .then(response => response.json())
                .then((data) => {
                  if (data.info.totalrecords > 0) {
                    searchForm.setAttribute('suggesting', true);
                    Array.from(data.records, (suggestion) => {
                      autoSuggest(searchInput.value, suggestion);
                      return true;
                    });
                  }
                })
                .catch(e => console.error(e.name, e.message)); // eslint-disable-line no-console
            }
          }
        }, false);
      })
      .catch(e => console.error(e.name, e.message)); // eslint-disable-line no-console

    Array.from(searchForm.querySelectorAll('.b-search-form__filter-toggle'), (toggle) => {
      toggle.addEventListener('click', () => {
        toggle.closest('.b-search-form__filter-toggle-set').toggleAttribute('active');
      }, false);
      return true;
    });
  }
  return true;
});
/* eslint-enable no-underscore-dangle */
