Array.from(document.querySelectorAll('.js-search-site, .js-search-etc-gateway'), (searchForm) => {
  const searchInput = searchForm.querySelector('.b-search-form__input');

  if (searchForm.classList.contains('js-search-site')) {
    /* Main site search */
    searchForm._props = {
      type: 'siteSearch',
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

    // eslint-disable-next-line consistent-return
    const loadSuggestions = (formEl) => {
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
    };

    const trackAutosuggest = (e) => {
      window.dataLayer.push({
        event: e.target.tracking.event,
        eventCategory: e.target.tracking.eventCategory,
        eventAction: e.target.tracking.eventAction,
        eventLabel: e.target.tracking.eventLabel,
      });
    };

    const suggestionsEl = searchForm.querySelector('.b-search-form__suggestions');
    const searchFocus = searchForm.querySelector('#sel_etc');

    const autoSuggest = (term, suggestion) => {
      /* Enable Autosuggest only for unfocussed (default) search forms */
      // if (searchFocus.selectedIndex === 0) {
      if (!searchInput.name.startsWith('q_')) {
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

    document.addEventListener('click', (e) => {
      if (e.target.closest('.b-search-form__filter-date-btn-show')) {
        const eleFilterDate = document.querySelector('.b-search-form__filter-date');
        const eleFilterDateCtrl = eleFilterDate.querySelector('.b-search-form__filter-date-btn-show');
        const eleFilterDateContainer = eleFilterDate.querySelector('.b-search-form__filter-date-container');
        const eleFilterDateState = !(eleFilterDateCtrl.getAttribute('aria-expanded') === 'true');
        const elesNumInput = eleFilterDate.querySelectorAll('.b-search-form__filter-input--date');

        if (eleFilterDateContainer.classList.contains('open')) {
          eleFilterDateContainer.classList.remove('open');
        } else {
          eleFilterDateContainer.classList.add('open');
        }

        eleFilterDateCtrl.setAttribute('aria-expanded', eleFilterDateState);

        // clear the date fields
        if (elesNumInput.length) {
          elesNumInput.forEach((eleInput) => {
            eleInput.value = '';
          });
        }
      }
    });

    const searchInputWrapper = searchForm.querySelector('.b-search-form__input-wrapper');
    const searchformInner = searchForm.querySelector('.b-search-form__inner');
    const removeValidationmessage = () => {
      searchInputWrapper.querySelector('input').classList.remove('b-search-form__input--validation-error');
      if (document.querySelector('.b-search-form__input__input-error-label')) {
        document.querySelector('.b-search-form__input__input-error-label').remove();
      }
    };

    const addValidationmessage = () => {
      const loading = document.createElement('label');
      loading.classList.add('b-search-form__input__input-error-label');
      loading.appendChild(document.createTextNode('Enter 3 or more characters'));
      loading.setAttribute('id', 'form-input-error-label');
      loading.setAttribute('role', 'alert');
      loading.setAttribute('aria-live', 'polite');
      return loading;
    };
    const enableSearchSubmit = () => {
      removeValidationmessage();
      if (document.querySelector('.b-search-form__input--validation-error')) {
        searchInputWrapper.querySelector('input').classList.remove('b-search-form__input--validation-error');
      }
      searchformInner.classList.remove('b-search-form__inner--focused-search-validation-error');
    };

    const disableSearchSubmit = (validationMess) => {
      if (document.querySelector('.b-search-form__input__input-error-label') != null) {
        // input error already built. dont need to build again.
        // focus on input
        searchInputWrapper.querySelector('input').focus();
      } else {
        searchInputWrapper.querySelector('input').setAttribute('aria-labeledby', 'form-input-error-label');
        searchformInner.classList.add('b-search-form__inner--focused-search-validation-error');
        searchInputWrapper.querySelector('input').focus();
        searchInputWrapper.querySelector('input').classList.add('b-search-form__input--validation-error');
        searchInputWrapper.insertAdjacentHTML('beforeend', validationMess.outerHTML);
      }
    };

    searchForm.addEventListener('change', (e) => {
      if (e && e.target.name === 'sel_etc') {
        const focusedSearchOption = e.target.value;

        if (focusedSearchOption !== 'all_fields' && e.target.value.startsWith('q_')) {
          searchInput.setAttribute('name', e.target.value);
          searchForm.removeAttribute('suggesting');

          if (searchInput.value.length < 3) {
            const validation = addValidationmessage();
            disableSearchSubmit(validation);
          }
        } else {
          searchInput.setAttribute('name', 'q');
          enableSearchSubmit();
        }
      }
    });

    searchForm.addEventListener('input', (e) => {
      const isFocusedSearch = e.target.name.toString().startsWith('q_');
      if (e.target.value.length < 3) {
        // Value is shorter than 3 chars

        if (isFocusedSearch) {
          const validation = addValidationmessage();
          disableSearchSubmit(validation);
        }
      } else {
        // if textvalue is 3 chars or more
        enableSearchSubmit();
      }
    });

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(searchForm);

      // focused search + 3 or more chars
      // normal search any values.
      const validSearchCriteria = formData.has('q') || (formData.get('sel_etc').toString().startsWith('q_') && searchInput.value.length > 2);

      if (validSearchCriteria) {
        let etcQuery = '';
        Array.from(formData.entries(), (pair) => {
          if (pair[0] === 'sel_etc') return true;
          if (searchFocus.selectedIndex > 0 && pair[0] === 'q') pair[0] = formData.get('sel_etc');
          etcQuery += (etcQuery.length > 1 ? '&' : '') + `${pair[0]}=${pair[1]}`; // eslint-disable-line prefer-template
          return true;
        });

        window.location.href = `${searchForm.action}?${etcQuery}`;
      }
    });
  }
  return true;
});
