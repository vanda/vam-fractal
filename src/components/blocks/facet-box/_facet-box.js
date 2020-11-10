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
    <div class="b-facet-box__facet-text">
      Dates
    </div>
    <div class="b-facet-box__facet-term-container b-facet-box__facet-date-container">
      <div class="b-facet-box__facet-date-container-start">
        <label class="b-facet-box__facet-date-label">
          From year:
        </label>
        <input class="b-facet-box__facet-date-input" placeholder="Year" type="number" name="after_year">
      </div>
      <div class="b-facet-box__facet-date-container-end">
        <label class="b-facet-box__facet-date-label">
          To year:
        </label>
        <input class="b-facet-box__facet-date-input" placeholder="Year" type="number" name="before_year">
      </div>
      <div class="b-facet-box__facet-date-container-button">
        <label class="b-facet-box__facet-date-label">
          &nbsp;
        </label>
        <button class="b-facet-box__facet-date-button">
          <svg class="b-facet-box__facet-date-button-icon" aria-label="apply-date-facet" role="img">
            <use xlink:href="/svg/vamicons.svg#search"></use>
          </svg>
        </button>
      </div>
    </div>
`;

const termCheckbox = (facet, paramName, term, value, count) => {
  const checkbox = document.createElement('LI');
  checkbox.className = 'b-facet-box__facet-term-toggle';
  checkbox.dataset.id = `${paramName}-${value}`;
  checkbox.dataset.facet = facet;
  checkbox.dataset.paramName = paramName;
  checkbox.dataset.term = term;
  checkbox.dataset.value = value;
  checkbox.dataset.count = count;

  checkbox.innerHTML = `
    <button class="b-facet-box__facet-term-toggle-checkbox" role="switch" aria-labelledby="${paramName}-${term}-checkbox-label" aria-checked="false">
      <svg class="b-facet-box__facet-term-toggle-tick" aria-hidden="true" role="img">
        <use xlink:href="/svg/vamicons.svg#tick"></use>
      </svg>
    </button>
    <span id="${paramName}-${term}-checkbox-label" class="b-facet-box__facet-term-toggle-text">
      ${term}
    </span>
    <span class="b-facet-box__facet-term-toggle-result">
      (${count})
    </span>
  `;

  const hiddenInput = document.createElement('INPUT');
  hiddenInput.type = 'checkbox';
  hiddenInput.className = 'b-facet-box__hidden-input';
  hiddenInput.name = paramName;
  hiddenInput.value = value;
  hiddenInput.id = `${paramName}=${value}`;

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

    const checked = e.target.querySelector(`.${facetTermTick}`).classList(`${facetTermTick}--active`);

    if (checked) {

    } else {

    }

    e.target.querySelector(`.${facetTermTick}`).classList.toggle(
      `${facetTermTick}--active`
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
    <button data-facet="${facet}" class="b-facet-box__term-more" href="#">See more</button>
  </li>` : ''
}</ul>`;

const revealMoreFacets = (e) => {
  e.preventDefault();
  const linkEl = e.target;
  const facetContainer = e.target.parentNode.parentNode;
  const { terms, index, facet, paramName } = facetsWithIndex[e.target.dataset.facet];
  e.target.remove();
  terms.slice(index, index + 5).forEach(({ term, count, value }) => {
    facetContainer.appendChild(termCheckbox(facet, paramName, term, value, count));
  });
  facetsWithIndex[facet].index += 5;

  if (facetsWithIndex[facet].index !== terms.length) {
    facetContainer.appendChild(linkEl);
  }
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

  Object.values(facetsWithIndex).forEach(({ facet, terms, paramName, index }) => {
    const newFacet = document.createElement('DIV');
    newFacet.className = 'b-facet-box__facet';
    newFacet.innerHTML = facetHTML(facet, terms.length > 5);

    newFacet.addEventListener('click', (e) => {
      if (e.target.classList.contains(facetTextClass)) {
        e.target.classList.toggle(`${e.target.classList[0]}--active`);
        e.target.parentNode.querySelector(`.${facetTermContainerClass}`).classList.toggle(`${facetTermContainerClass}--active`);
      }
    });

    const termValues = terms.map(t => t.value);

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
        newFacet.querySelector(`.${facetTermContainerClass} .b-facet-box__term-more`).onclick = e => revealMoreFacets(e);
      } else {
        newFacet.querySelector(`.${facetTermContainerClass}`).appendChild(newFacet.querySelector('.b-facet-box__term-more-container')).remove();
      }
    }

    facetBoxContainer.appendChild(newFacet);
  });
};

const newTermToggleEvent = (detail, bubbles = true) => new CustomEvent('termToggle', {
  detail,
  bubbles
});

const initialiseFacetOverlay = () => {
  const toggleTerm = ({ id, facet, term, paramName }) => {
    if (id) {
      // if term already exists, get rid of it
      if (document.querySelector(`button[data-id='${id}']`)) {
        Array.from(document.querySelectorAll(`button[data-id='${id}']`)).forEach(el => el.remove());
        if (!document.querySelector('.b-search-form__facets').children.length) {
          document.querySelector('.b-search-form__facet-pane').classList.remove('b-search-form__facet-pane--active');
        }
        window.dispatchEvent(new Event('resize'));
      } else {
        const newTermOnClick = () => {
          Array.from(document.querySelectorAll(`button[data-id='${id}']`)).forEach(el => el.dispatchEvent(newTermToggleEvent({ id, facet, term, paramName })));
          if (document.querySelector(`li[data-id='${id}']`)) {
            document.querySelector(`li[data-id='${id}']`).dispatchEvent(newTermToggleEvent({ id, facet, term, paramName }));
          }
        };

        const newTerm = document.createElement('button');
        newTerm.dataset.id = id;
        newTerm.className = 'b-facet-box__term';
        newTerm.innerHTML = termButtonHTML(facet, term);
        newTerm.onclick = e => newTermOnClick(e);
        termList.appendChild(newTerm);

        const newFormTerm = newTerm.cloneNode(true);
        newFormTerm.onclick = e => newTermOnClick(e);
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
    Object.keys(facetsWithIndex).forEach(facetKey => delete facetsWithIndex[facetKey]);

    const { facets, activeFacets } = e.detail;
    const currentBeforeDate = document.querySelector('input[name="before_year"]') ? document.querySelector('input[name="before_year"]').value : '';
    const currentAfterDate = document.querySelector('input[name="after_year"]') ? document.querySelector('input[name="after_year"]').value : '';

    facets.forEach((facet) => {
      Object.assign(facetsWithIndex, {
        [facet.facet]: Object.assign(facet, { index: 0 })
      });
    });

    Array.from(document.querySelectorAll('.b-facet-box__hidden-input')).forEach(el => el.remove());

    const facetBoxContainer = document.querySelector('.b-facet-box__facet-container');
    facetBoxContainer.innerHTML = '';
    termList.innerHTML = '';

    createFacets(activeFacets);

    const dateFacet = document.createElement('DIV');
    dateFacet.className = 'b-facet-box__facet b-facet-box__facet-date';
    dateFacet.innerHTML = dateFacetHTML();
    dateFacet.addEventListener('click', (ev) => {
      if (ev.target.classList.contains(facetTextClass)) {
        ev.target.classList.toggle(`${ev.target.classList[0]}--active`);
        ev.target.parentNode.querySelector(`.${facetTermContainerClass}`).classList.toggle(`${facetTermContainerClass}--active`);
      }
    });
    dateFacet.querySelector('input[name="before_year"]').value = currentBeforeDate;
    dateFacet.querySelector('input[name="after_year"]').value = currentAfterDate;

    facetBoxContainer.append(dateFacet);

    if (activeFacets) {
      // is a set...
      Array.from(activeFacets).forEach((facetId) => {
        const target = document.querySelector(`li[data-id='${facetId}'`);
        if (target) {
          target.dispatchEvent(newTermToggleEvent(
            Object.assign(target.dataset, { refreshing_page: true }))
          );
          document.querySelector(`.${termListClass}`).dispatchEvent(newTermToggleEvent(target.dataset));
        }
      });
    }

    window.dispatchEvent(new Event('resize'));
  }, true);

  document.onclick = (e) => {
    if (e.target.classList.contains(facetCloseClass)) {
      e.target.dispatchEvent(new Event('closeFacetOverlay', {
        bubbles: true
      }));
    }

    if (e.target.parentElement && e.target.parentElement.classList.contains(facetTerm)) {
      const parent = e.target.closest(facetTerm) || e.target.parentElement;
      termList.dispatchEvent(newTermToggleEvent(parent.dataset, false));
      parent.dispatchEvent(newTermToggleEvent(parent.dataset));
    }
  };
};

(() => {
  if (document.querySelector('.b-facet-box')) {
    initialiseFacetOverlay();

    if (document.querySelector('.b-facet-box__modal-button-open')) {
      document.querySelectorAll('.b-facet-box__modal-button-open').forEach(el => el.addEventListener('click', () => document.querySelector('.b-facet-box').classList.add('b-facet-box--active')));
    }
    if (document.querySelector('.b-facet-box__close-button')) {
      document.querySelector('.b-facet-box__close-button').addEventListener('click', () => document.querySelector('.b-facet-box').classList.remove('b-facet-box--active'));
    }

    window.onresize = () => {
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
          document.querySelector('.b-facet-box__term-text.b-facet-box__term-text--no-cross').innerHTML = `${facetFormTerms.length - 1} filters applied`;
        } else {
          document.querySelector('.b-search-form__facets-mobile').style.display = 'none';
        }
      }
    };
  }
})();
