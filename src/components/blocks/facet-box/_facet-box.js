const facetClass = 'b-facet-box__facet';
const facetTerm = `${facetClass}-term-toggle`;
const facetTermTick = `${facetTerm}-tick`;
const facetTextClass = `${facetClass}-text`;
const facetTermContainerClass = `${facetClass}-term-container`;

const termClass = 'b-facet-box__term';
const termListClass = `${termClass}-list`;
const termList = document.querySelector(`.${termListClass}`);

const facetCloseClass = 'b-facet-box__close-button';

const facetsWithIndex = {};

const termButtonHTML = (facet, term) => `
    <span class="b-facet-box__term-text">
        ${facet}: ${term}
    </span>
`;

const dateFacetHTML = () => `
    <button tabindex="0" class="b-facet-box__facet-text" data-facet-text="dates">
      Dates
    </button>
    <div class="b-facet-box__facet-term-container">
      <span class="b-facet-box__facet-term-container-text">
        Use a hyphen to indicate dates BC. For example -800 is 800 BC.
      </span>
      <form class="b-facet-box__facet-date-container">
        <div class="b-facet-box__facet-date-container-start">
          <label class="b-facet-box__facet-term-container-text">
            From year:
          </label>
          <input class="b-facet-box__facet-date-input" placeholder="-800" type="number" name="year_made_from">
        </div>
        <div class="b-facet-box__facet-date-container-end">
          <label class="b-facet-box__facet-term-container-text">
            To year:
          </label>
          <input class="b-facet-box__facet-date-input" placeholder="2000" type="number" name="year_made_to">
        </div>
        <div class="b-facet-box__facet-date-container-button">
          <label class="b-facet-box__facet-term-container-text">
            &nbsp;
          </label>
          <button class="b-facet-box__facet-date-button">
            <svg class="b-facet-box__facet-date-button-icon" aria-label="apply-date-facet" role="img">
              <use xlink:href="/assets/svg/vamicons.svg#search"></use>
            </svg>
          </button>
        </div>
      </form>
      <span disabled="false" class="b-facet-box__facet-term-container-text b-facet-box__facet-term-container-text--warning">
        Please enter both a start and end year.
      </span>
    </div>
`;

const termCheckbox = (facet, paramName, term, value, count) => {
  const checkbox = document.createElement('LI');
  checkbox.className = 'b-facet-box__facet-term-toggle';

  checkbox.innerHTML = `
    <button class="b-facet-box__facet-term-toggle-button">
      <div class="b-facet-box__facet-term-toggle-checkbox">
        <svg class="b-facet-box__facet-term-toggle-tick" aria-hidden="true" role="img">
          <use xlink:href="/assets/svg/vamicons.svg#tick"></use>
        </svg>
      </div>
      <span id="${paramName.replace(' ', '')}-${term.replace(' ', '')}-checkbox-label" class="b-facet-box__facet-term-toggle-text">
        ${term}
      </span>
      <span class="b-facet-box__facet-term-toggle-result">
        (${count})
      </span>
    </button>
  `;

  const button = checkbox.querySelector('button');
  button.dataset.id = `${paramName.replace(' ', '')}-${value}`;
  button.dataset.facet = facet;
  button.dataset.paramName = paramName;
  button.dataset.term = term;
  button.dataset.value = value;
  button.dataset.count = count;
  button.setAttribute('aria-labelledby', `${paramName.replace(' ', '')}-${term.replace(' ', '')}-checkbox-label`);
  button.setAttribute('role', 'switch');
  button.setAttribute('aria-checked', 'false');

  const hiddenInput = document.createElement('INPUT');
  hiddenInput.type = 'checkbox';
  hiddenInput.className = 'b-facet-box__hidden-input';
  hiddenInput.name = paramName;
  hiddenInput.value = value;
  hiddenInput.id = `${paramName}=${value}`;
  hiddenInput.setAttribute('aria-hidden', 'true');

  checkbox.addEventListener('termToggle', (e) => {
    const existingHiddenInput = document.querySelector(`input[id="${`${paramName}=${value}`}"]`);
    // GOTTA ASSUME THERE'S A FORM ON THE PAGE FOR THIS TO WORK!!!
    // this is because formData has an order which is annoying to change

    if (existingHiddenInput) {
      // remove hidden input
      existingHiddenInput.click();
      existingHiddenInput.remove();
    } else {
      document.querySelector('#vam-etc-search').appendChild(hiddenInput);
      document.querySelector(`input[id="${`${paramName}=${value}`}"]`).checked = true;
    }

    const checked = e.target.querySelector(`.${facetTermTick}`).classList.contains(`${facetTermTick}--active`);

    if (checked) {
      e.target.setAttribute('aria-checked', 'false');
    } else {
      e.target.setAttribute('aria-checked', 'true');
    }

    e.target.querySelector(`.${facetTermTick}`).classList.toggle(
      `${facetTermTick}--active`,
    );

    if (!e.detail.refreshing_page) {
      document.querySelector('.b-facet-box').dispatchEvent(new Event('boxChecked', { bubbles: true }));
    }
  });

  return checkbox;
};

const facetHTML = (facet, seeMore) => `
  <button class="b-facet-box__facet-text" data-facet-text="${facet}">
    ${facet}
  </button>
  <ul data-facet="${facet}" class="b-facet-box__facet-term-container">${
  seeMore ? `<li class="b-facet-box__term-more-container">
    <button data-facet="${facet}" class="b-facet-box__term-more" aria-label="see more terms of facet ${facet}">See more</button>
  </li>` : ''
}</ul>`;

const revealMoreFacets = (e) => {
  e.preventDefault();
  const linkEl = e.target.parentNode;
  const facetContainer = e.target.parentNode.parentNode;
  const {
    terms, index, facet, paramName,
  } = facetsWithIndex[e.target.dataset.facet];

  terms.slice(index, index + 5).forEach(({ term, count, value }) => {
    facetContainer.appendChild(termCheckbox(facet, paramName, term, value, count));
  });
  facetsWithIndex[facet].index += 5;

  if ((facetsWithIndex[facet].index) < terms.length) {
    facetContainer.appendChild(linkEl);
  } else {
    linkEl.remove();
  }

  Array.from(facetContainer.querySelectorAll('.b-facet-box__facet-term-toggle-button')).slice(-1)[0].focus();
};

const createFacets = (activeFacets) => {
  const facetBoxContainer = document.querySelector('.b-facet-box__facet-container');
  const facetToTerm = Array.from(activeFacets).reduce((res, termfacet) => {
    const facet = termfacet.split('-')[0];
    const term = termfacet.split('-')[1];

    if (res[facet]) {
      res[facet].push(term);
    } else {
      res[facet] = [term];
    }

    return res;
  }, {});

  Object.values(facetsWithIndex).forEach(({
    facet, terms, paramName, index,
  }) => {
    const newFacet = document.createElement('DIV');
    newFacet.className = 'b-facet-box__facet';
    newFacet.setAttribute('data-param-name', paramName);
    newFacet.innerHTML = facetHTML(facet, terms.length > 5);
    newFacet.setAttribute('aria-haspopup', 'true');
    newFacet.setAttribute('aria-expanded', 'false');

    newFacet.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains(facetTextClass)) {
        e.target.parentNode.setAttribute('aria-expanded', String(!(e.target.parentNode.getAttribute('aria-expanded') === 'true')));
        e.target.classList.toggle(`${e.target.classList[0]}--active`);
        e.target.parentNode.querySelector(`.${facetTermContainerClass}`).classList.toggle(`${facetTermContainerClass}--active`);
      }
    });

    const termValues = terms.map((t) => t.value);

    let newIndex = (facetToTerm[paramName] && facetToTerm[paramName].reduce((current, term) => {
      const test = termValues.indexOf(term);
      return (current > test ? current : test);
    }, 5)) || 0;

    newIndex = ((Math.ceil(newIndex / 5) * 5));

    newIndex = newIndex > terms.length ? terms.length : (newIndex || 5);

    terms.slice(index, newIndex).forEach(({ term, count, value }) => {
      newFacet.querySelector(`.${facetTermContainerClass}`).appendChild(termCheckbox(facet, paramName, term, value, count));
    });

    facetsWithIndex[facet].index += (newIndex);

    if (terms.length > 5) {
      if (facetsWithIndex[facet].index < terms.length) {
        newFacet.querySelector(`.${facetTermContainerClass}`).appendChild(newFacet.querySelector('.b-facet-box__term-more-container'));
        newFacet.querySelector(`.${facetTermContainerClass} .b-facet-box__term-more`).onclick = (e) => {
          e.preventDefault();
          revealMoreFacets(e);
        };
      } else {
        newFacet.querySelector(`.${facetTermContainerClass}`).appendChild(newFacet.querySelector('.b-facet-box__term-more-container')).remove();
      }
    }

    facetBoxContainer.appendChild(newFacet);
  });
};

const newTermToggleEvent = (detail, bubbles = true) => new CustomEvent('termToggle', {
  detail,
  bubbles,
});

const initialiseFacetOverlay = () => {
  const toggleTerm = ({
    id, facet, term, paramName,
  }) => {
    if (id) {
      const termButtons = Array.from(document.querySelectorAll(`button[data-id='${id}']`)).filter(
        (el) => !el.classList.contains('b-facet-box__facet-term-toggle-button'),
      );
      // if term already exists, get rid of it

      if (termButtons.length) {
        termButtons.forEach((el) => el.remove());
        if (!document.querySelector('.b-search-form__facets').children.length) {
          document.querySelector('.b-search-form__facet-pane').classList.remove('b-search-form__facet-pane--active');
        }
        window.dispatchEvent(new Event('resize'));
      } else {
        const newTermOnClick = () => {
          Array.from(document.querySelectorAll(`button[data-id='${id}']`)).forEach((el) => el.dispatchEvent(newTermToggleEvent({
            id, facet, term, paramName,
          })));
        };

        const newTerm = document.createElement('button');
        newTerm.dataset.id = id;
        newTerm.className = 'b-facet-box__term';
        newTerm.innerHTML = termButtonHTML(facet, term);
        newTerm.onclick = (e) => {
          const button = e.target.closest('.b-facet-box__term');
          if (button.dataset.id === 'date_terms') {
            const inputs = Array.from(document.querySelectorAll('.b-facet-box__facet-date-container input'));
            inputs.forEach((input) => { input.value = ''; });
          }
          newTermOnClick(e);
        };
        newTerm.classList.add('b-facet-box__term--mobile');
        termList.appendChild(newTerm);

        const newFormTerm = newTerm.cloneNode(true);
        newFormTerm.classList.remove('b-facet-box__term--mobile');
        newFormTerm.onclick = (e) => {
          const button = e.target.closest('.b-facet-box__term');
          if (button.dataset.id === 'date_terms') {
            const inputs = Array.from(document.querySelectorAll('.b-facet-box__facet-date-container input'));
            inputs.forEach((input) => { input.value = ''; });
          }
          e.preventDefault();
          newTermOnClick(e);
        };
        newFormTerm.classList.add('b-facet-box__term--form');
        if (document.querySelector('.b-search-form__facets')) {
          document.querySelector('.b-search-form__facets').appendChild(newFormTerm);
        }

        if (!document.querySelector('.b-search-form__facet-pane--active')) {
          document.querySelector('.b-search-form__facet-pane').classList.add('b-search-form__facet-pane--active');
        }

        window.dispatchEvent(new Event('resize'));
      }
    }
  };

  termList.addEventListener('termToggle', (e) => {
    e.stopPropagation();
    toggleTerm(e.detail);
  });

  document.querySelector('.b-facet-box').addEventListener('newFacets', (e) => {
    // need this step to prevent keeping in memory some facets...
    Object.keys(facetsWithIndex).forEach((facetKey) => delete facetsWithIndex[facetKey]);

    const { facets, activeFacets } = e.detail;
    facets.forEach((facet) => {
      Object.assign(facetsWithIndex, {
        [facet.facet]: Object.assign(facet, { index: 0 }),
      });
    });

    Array.from(document.querySelectorAll('.b-facet-box__hidden-input')).forEach((el) => el.remove());

    const facetBoxContainer = document.querySelector('.b-facet-box__facet-container');
    facetBoxContainer.innerHTML = '';
    termList.innerHTML = '';

    createFacets(activeFacets);

    const dateFacet = document.createElement('DIV');
    dateFacet.className = 'b-facet-box__facet b-facet-box__facet-date';
    dateFacet.setAttribute('aria-haspopup', 'true');
    dateFacet.setAttribute('aria-expanded', 'false');
    dateFacet.innerHTML = dateFacetHTML();
    dateFacet.querySelector('button').addEventListener('click', (ev) => {
      ev.preventDefault();
      if (ev.target.classList.contains(facetTextClass)) {
        const currentExpanded = dateFacet.getAttribute('aria-expanded');
        dateFacet.setAttribute(
          'aria-expanded',
          currentExpanded === 'true' ? 'false' : 'true',
        );
        ev.target.classList.toggle(`${ev.target.classList[0]}--active`);
        ev.target.parentNode.querySelector(`.${facetTermContainerClass}`).classList.toggle(`${facetTermContainerClass}--active`);
      }
    });

    dateFacet.querySelector('form').addEventListener('submit', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      const inputs = Array.from(document.querySelectorAll('.b-facet-box__facet-date-container input'));

      inputs.forEach((input) => input.classList.remove('b-facet-box__facet-date-input--error'));

      const dates = inputs.map((el) => el.value);

      if (dates.filter((value) => value.length).length !== 2) {
        dates.forEach((date, i) => {
          if (!date.length) {
            inputs[i].classList.add('b-facet-box__facet-date-input--error');
          }
        });
        document.querySelector('.b-facet-box__facet-term-container-text--warning').removeAttribute('disabled');
      } else {
        const hiddenDateInput = document.createElement('INPUT');
        hiddenDateInput.type = 'hidden';
        hiddenDateInput.className = 'b-search-results__hidden-date';

        document.querySelectorAll('.b-search-results__hidden-date').forEach((el) => el.remove());

        const isBCDate = (date) => (parseInt(date, 10) < 0 ? `${date * -1} BC` : date);

        if (document.querySelector('button[data-id="date_terms"]')) {
          termList.dispatchEvent(newTermToggleEvent(
            {
              facet: 'dates',
              id: 'date_terms',
              paramName: 'date_terms',
              refreshing_page: false,
              term: `${isBCDate(dates[0])} - ${isBCDate(dates[1])}`,
            },
            true,
          ));
        }
        document.querySelector('.b-facet-box__facet-term-container-text--warning').setAttribute('disabled', 'true');

        const hiddenDateInputBefore = hiddenDateInput.cloneNode(true);
        hiddenDateInputBefore.name = 'year_made_from';
        hiddenDateInputBefore.value = dates[0];

        const hiddenDateInputAfter = hiddenDateInput.cloneNode(true);
        hiddenDateInputAfter.name = 'year_made_to';
        hiddenDateInputAfter.value = dates[1];

        document.querySelector('#vam-etc-search').appendChild(hiddenDateInputBefore);
        document.querySelector('#vam-etc-search').appendChild(hiddenDateInputAfter);

        termList.dispatchEvent(newTermToggleEvent(
          {
            facet: 'dates',
            id: 'date_terms',
            paramName: 'date_terms',
            refreshing_page: false,
            term: `${isBCDate(dates[0])} - ${isBCDate(dates[1])}`,
          },
          true,
        ));
      }
    });

    facetBoxContainer.append(dateFacet);

    const dateFacetInputs = {};

    if (activeFacets) {
      // is a set...
      Array.from(activeFacets).forEach((facetId) => {
        const target = document.querySelector(`button[data-id='${facetId}'`);
        const splitFacetId = facetId.split('-');
        if (target) {
          target.dispatchEvent(newTermToggleEvent(
            Object.assign(target.dataset, { refreshing_page: true }),
          ));
          document.querySelector(`.${termListClass}`).dispatchEvent(newTermToggleEvent(target.dataset));
        } else {
          while (
            !document.querySelector(`button[data-id='${facetId}']`)
            && document.querySelector(`div[data-param-name="${splitFacetId[0]}"] .b-facet-box__term-more`)
          ) {
            document.querySelector(`div[data-param-name="${splitFacetId[0]}"] .b-facet-box__term-more`).click();
            document.querySelector(`button[data-id='${facetId}'`).dispatchEvent(newTermToggleEvent(
              Object.assign(document.querySelector(`button[data-id='${facetId}'`).dataset, { refreshing_page: true }),
            ));
            document.querySelector(`.${termListClass}`).dispatchEvent(newTermToggleEvent(document.querySelector(`button[data-id='${facetId}'`).dataset));
          }
        }

        let key;
        if (
          (splitFacetId[0] === 'year_made_from') || (splitFacetId[0] === 'year_made_to')
        ) {
          key = splitFacetId[0];
          dateFacet.querySelector(`input[name="${key}"]`).value = splitFacetId.length !== 2 ? `-${splitFacetId[2]}` : splitFacetId[1];
          dateFacetInputs[key] = splitFacetId.length !== 2 ? `-${splitFacetId[2]}` : splitFacetId[1];
          if (Object.keys(dateFacetInputs).length === 2) {
            // i am not sure why i have to click here instead of submitting but it works
            dateFacet.querySelector('form button').click();
          }
        }
      });
    }
    window.dispatchEvent(new Event('resize'));
  }, true);

  document.onclick = (e) => {
    if (e.target.classList.contains(facetCloseClass)) {
      e.preventDefault();
      e.target.dispatchEvent(new Event('closeFacetOverlay', {
        bubbles: true,
      }));
    }

    if (e.target.closest(`.${facetTerm}-button`)) {
      e.preventDefault();
      const parent = e.target.closest(`.${facetTerm}-button`);
      termList.dispatchEvent(newTermToggleEvent(parent.dataset, false));
      parent.dispatchEvent(newTermToggleEvent(parent.dataset));
    }
  };
};

const getFocusable = () => {
  let focusable = [];

  // need to calculate this, since not everything focusable will be visible
  focusable = focusable.concat(Array.from(document.querySelectorAll('.b-facet-box__term-list button')));
  Array.from(document.querySelectorAll('.b-facet-box__facet')).forEach((el) => {
    focusable.push(el.querySelector('button'));
    if (el.getAttribute('aria-expanded') === 'true') {
      if (el.classList.contains('b-facet-box__facet-date')) {
        focusable = focusable.concat(Array.from(el.querySelectorAll('form button, form input')));
      } else {
        focusable = focusable.concat(Array.from(el.querySelectorAll('ul button')));
      }
    }
  });

  return focusable;
};

const focusHandler = (e) => {
  const focusable = getFocusable();

  if (e.key === 'Escape') {
    document.querySelector('.b-facet-box').classList.remove('b-facet-box--active');
    window.removeEventListener('keydown', focusHandler);
  }

  if (e.keyCode === 9) {
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const shift = e.shiftKey;
    if (focusable.length) {
      if (shift && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!shift && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }
};

if (document.querySelector('.b-facet-box')) {
  initialiseFacetOverlay();

  const instruction = document.createElement('SPAN');
  instruction.classList.add('b-facet-box__instruction');
  instruction.setAttribute('aria-live', 'polite');
  instruction.innerHTML = 'Use Escape Key to close filters';

  if (document.querySelector('.b-facet-box__modal-button-open')) {
    document.querySelectorAll('.b-facet-box__modal-button-open').forEach((el) => el.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.b-facet-box').classList.add('b-facet-box--active');
      window.addEventListener('keydown', focusHandler);
      document.querySelector('.b-facet-box').appendChild(instruction);
      getFocusable()[0].focus();
    }));
  }
  if (document.querySelector('.b-facet-box__close-button')) {
    document.querySelector('.b-facet-box__close-button').addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.b-facet-box').classList.remove('b-facet-box--active');
      window.removeEventListener('keydown', focusHandler);
      document.querySelector('.b-facet-box').removeChild(instruction);
    });
  }

  window.addEventListener('resize', () => {
    const facetFormTerms = Array.from(document.querySelectorAll('.b-facet-box__term.b-facet-box__term--form'));
    if (document.querySelector('.b-facet-box__term-text.b-facet-box__term-text--no-cross')) {
      if (window.innerWidth > 499 && window.innerWidth < 992) {
        const facetContainerWidth = document.querySelector('.b-search-form__facets').offsetWidth;
        let cutOffWidth = 0;
        let currentIndex = 1;
        facetFormTerms.forEach((el) => {
          cutOffWidth += el.offsetWidth;
          if (cutOffWidth < facetContainerWidth) {
            currentIndex += 1;
          }
        });
        if ((facetFormTerms.length - currentIndex) > 0) {
          document.querySelector('.b-search-form__facets-mobile').style.display = 'block';
        } else {
          document.querySelector('.b-search-form__facets-mobile').style.display = 'none';
        }
        document.querySelector('.b-facet-box__term-text.b-facet-box__term-text--no-cross').innerHTML = `+${facetFormTerms.length - currentIndex}`;
      } else if (window.innerWidth < 500) {
        if ((facetFormTerms.length) > 0) {
          document.querySelector('.b-search-form__facets-mobile').style.display = 'block';
        } else {
          document.querySelector('.b-search-form__facets-mobile').style.display = 'none';
        }
        document.querySelector('.b-facet-box__term-text.b-facet-box__term-text--no-cross').innerHTML = `${facetFormTerms.length - 1} filter${facetFormTerms.length - 1 > 1 ? 's' : ''} applied`;
      } else {
        document.querySelector('.b-search-form__facets-mobile').style.display = 'none';
      }
    }
  });
}
