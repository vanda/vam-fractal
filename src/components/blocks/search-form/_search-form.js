Array.from(document.querySelectorAll('.js-search-site, .js-search-etc-gateway, .js-search-etc'), (searchForm) => {
  const searchInput = searchForm.querySelector('.b-search-form__input');
  const searchSubmit = searchForm.querySelector('.b-search-form__submit');

  if (searchForm.classList.contains('js-search-site')) {
    /* Main site search */
    searchForm._props = {
      type: 'siteSearch',
    };
    const searchUnderscore = searchForm.querySelector('.b-search-form__underscore');
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
      suggestionsTop: 'https://collections.vam.ac.uk/assets/data/suggestions.json',
      suggestionsAPI: 'https://api.vam.ac.uk/v2/sayt/search',
    };

    const suggestionsEl = searchForm.querySelector('.b-search-form__suggestions');
    const searchSelect = searchForm.querySelector('.b-search-form__filter-select');
    let flagAutoSuggest = true;

    // eslint-disable-next-line consistent-return
    const loadSuggestions = (formEl) => {
      if (formEl) {
        formEl._props.storedSuggestions = JSON.parse(sessionStorage.getItem(`storedSuggestions_${formEl._props.type}`));
        const now = new Date();
        if (!formEl._props.storedSuggestions
          || now.getTime() > formEl._props.storedSuggestions.expires) {
          const promise = fetch(formEl._props.suggestionsTop, { cache: 'no-cache' })
            .then((response) => response.json())
            .then((data) => {
              const suggestions = {
                expires: now.getTime() + (15 * 60000),
                data,
              };
              formEl._props.storedSuggestions = suggestions;
              sessionStorage.setItem(`storedSuggestions_${formEl._props.type}`, JSON.stringify(formEl._props.storedSuggestions));
            })
            .catch((e) => console.error(e.name, e.message)); // eslint-disable-line no-console
          return promise;
        }
        return Promise.resolve(true);
      }
    };

    const trackAutosuggest = (e) => {
      window.dataLayer.push({
        event: e.target.tracking.event,
        eventCategory: e.target.tracking.eventCategory,
        eventAction: e.target.tracking.eventAction,
        eventLabel: e.target.tracking.eventLabel,
      });
    };

    const autoSuggest = (term, suggestion) => {
      if (flagAutoSuggest === true) {
        const suggestEl = document.createElement('a');
        if (suggestionsEl.childElementCount < 10) {
          const title = suggestion.displayName || suggestion.displayTerm;
          const url = `https://collections.vam.ac.uk/search/?id_${suggestion.recordType}=${suggestion.systemNumber}`;

          suggestEl.className = 'b-search-form__suggestion';
          suggestEl.href = url;
          suggestEl.tabindex = 0;
          suggestEl.innerHTML = `
            <div class="b-search-form__suggestion-type">
              ${suggestion.recordType}
            </div>
            ${title}
          `;
          suggestEl.tracking = {
            event: 'autosuggest EtC landing',
            eventCategory: `search - autosuggest - ${suggestion.index}`,
            eventAction: term,
            eventLabel: url,
          };
          suggestEl.addEventListener('click', trackAutosuggest);

          suggestionsEl.appendChild(suggestEl);
        }
      } else {
        searchForm.removeAttribute('suggesting');
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
                .then((response) => response.json())
                .then((data) => {
                  if (data.info.record_count > 0) {
                    searchForm.setAttribute('suggesting', true);
                    Array.from(data.records, (suggestion) => {
                      autoSuggest(searchInput.value, suggestion);
                      return true;
                    });
                  }
                })
                .catch((e) => console.error(e.name, e.message)); // eslint-disable-line no-console
            }
          }
        }, false);
      })
      .catch((e) => console.error(e.name, e.message)); // eslint-disable-line no-console

    document.addEventListener('change', (e) => {
      if (e.target.closest('.b-search-form__filter-select')) {
        if (searchSelect.selectedIndex === 0) {
          flagAutoSuggest = true;
        } else {
          flagAutoSuggest = false;
        }

        searchForm.removeAttribute('suggesting');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && document.activeElement.closest('.b-search-form__filter-toggle')) {
        document.activeElement.click();
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.closest('.b-search-form__filter-toggle')) {
        const toggleSet = e.target.closest('.b-search-form__filter-toggle-set');
        toggleSet.toggleAttribute('active');

        // make sure only the visible toggle link is aria visible and focusable
        const toggleLinks = Array.from(document.querySelectorAll('.b-search-form__filter-toggle'));
        const tabIndexIndex = toggleLinks.indexOf(document.querySelector('[tabindex="0"]'));
        toggleLinks[tabIndexIndex].setAttribute('tabindex', -1);
        toggleLinks[tabIndexIndex].setAttribute('aria-hidden', true);
        toggleLinks[([1, 0])[tabIndexIndex]].setAttribute('tabindex', 0);
        toggleLinks[([1, 0])[tabIndexIndex]].removeAttribute('aria-hidden');

        Array.from(toggleSet.querySelectorAll('input'), (input) => {
          input.value = '';
          return true;
        });
      }

      if (e.target.closest('.b-search-form__submit')) {
        const formInputs = searchForm.querySelectorAll('input, select');
        const formData = {};
        let formUrl = '';

        formInputs.forEach((eleOpt) => {
          const key = eleOpt.getAttribute('name');

          if (key) {
            formData[key] = eleOpt.value;
          }
        });

        if (formData.sel_etc === 'all_fields') {
          formUrl = `${searchForm.action}?q=${formData.q_etc}&year_made_from=${formData.year_made_from}&year_made_to=${formData.year_made_to}`;
        } else {
          formUrl = `${searchForm.action}?${formData.sel_etc}=${formData.q_etc}&year_made_from=${formData.year_made_from}&year_made_to=${formData.year_made_to}`;
        }

        window.location.href = formUrl;

        e.preventDefault();
      }
    }, false);
  }
  return true;
});
