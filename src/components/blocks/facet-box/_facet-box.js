const facetClass = 'b-facet-box__facet';
const facetTerm = `${facetClass}-term-toggle`;
const facetTermTick = `${facetTerm}-tick`;
const facetTextClass = `${facetClass}-text`;
const facetTermContainerClass = `${facetClass}-term-container`;

const termClass = 'b-facet-box__term';
const termListClass = `${termClass}-list`;
const termList = document.querySelector(`.${termListClass}`);
const termCheckboxClass = `${facetClass}-term-toggle-checkbox`;

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
        <input class="b-facet-box__facet-date-input" placeholder="Year" type="number" name="date-start">
      </div>
      <div class="b-facet-box__facet-date-container-end">
        <label class="b-facet-box__facet-date-label">
          To year:
        </label>
        <input class="b-facet-box__facet-date-input" placeholder="Year" type="number" name="date-end">
      </div>
      <div class="b-facet-box__facet-date-container-button">
        <label class="b-facet-box__facet-date-label">
          &nbsp;
        </label>
        <button class="b-facet-box__facet-date-button">
          <svg class="b-facet-box__facet-date-button-icon" role="img">
            <use xlink:href="/assets/svg/svg-template.svg#search"></use>
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
    <a class="b-facet-box__facet-term-toggle-checkbox" href="javascript:void(0);">
      <svg class="b-facet-box__facet-term-toggle-tick" role="img">
        <use xlink:href="/svg/vamicons.svg#tick"></use>
      </svg>
    </a>
    <span class="b-facet-box__facet-term-toggle-text">
      ${term}
    </span>
    <span class="b-facet-box__facet-term-toggle-result">
      (${count})
    </span>
    <input class="b-facet-box__hidden-input" type="checkbox" name="${paramName}" value="${value}">
  `;

  checkbox.addEventListener('termToggle', (e) => {
    e.target.querySelector('.b-facet-box__hidden-input').checked = !e.target.querySelector('.b-facet-box__hidden-input').checked;
    e.target.querySelector(`.${facetTermTick}`).classList.toggle(
      `${facetTermTick}--active`
    );
    document.querySelector('.b-facet-box').dispatchEvent(new Event('boxChecked', { bubbles: true }));
  });

  return checkbox;
};

const facetHTML = facet => `
  <div class="b-facet-box__facet-text">
    ${facet}
  </div>
  <ul data-facet="${facet}" class="b-facet-box__facet-term-container">
    <a data-facet="${facet}" class="b-facet-box__term-more" href="#">See more</a>
  </ul>
`;

const revealMoreFacets = (e) => {
  e.preventDefault();
  const linkEl = e.target;
  const facetContainer = e.target.parentNode;
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
    newFacet.innerHTML = facetHTML(facet);

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

    newIndex = (Math.ceil(newIndex / 5) * 5) + 5;

    terms.slice(index, newIndex).forEach(({ term, count, value }) => {
      newFacet.querySelector(`.${facetTermContainerClass}`).appendChild(termCheckbox(facet, paramName, term, value, count));
    });

    facetsWithIndex[facet].index += (5 + newIndex);

    if (facetsWithIndex[facet].index !== terms.length) {
      newFacet.querySelector(`.${facetTermContainerClass}`).appendChild(newFacet.querySelector('.b-facet-box__term-more'));
      newFacet.querySelector(`.${facetTermContainerClass} .b-facet-box__term-more`).onclick = e => revealMoreFacets(e);
    }

    facetBoxContainer.appendChild(newFacet);
  })
};

const newTermToggleEvent = (detail, bubbles = true) => new CustomEvent('termToggle', {
  detail,
  bubbles
});

const initialiseFacetOverlay = () => {
  const toggleTerm = ({ id, facet, term, paramName }) => {
    if (id) {
      // if term already exists, get rid of it
      if (document.querySelector(`div[data-id='${id}']`)) {
        Array.from(document.querySelectorAll(`div[data-id='${id}']`)).forEach(el => el.remove());
        if (!document.querySelector('.b-search-form__facets').children.length) {
          document.querySelector('.b-search-form__facet-pane').classList.remove('b-search-form__facet-pane--active');
        }
      } else {
        const newTermOnClick = (e) => {
          Array.from(document.querySelectorAll(`div[data-id='${id}']`)).forEach(el => el.dispatchEvent(newTermToggleEvent({ id, facet, term, paramName })));
          if (document.querySelector(`li[data-id='${id}']`)) {
            document.querySelector(`li[data-id='${id}']`).dispatchEvent(newTermToggleEvent({ id, facet, term, paramName }));
          }
        }

        const newTerm = document.createElement('DIV');
        newTerm.dataset.id = id;
        newTerm.className = 'b-facet-box__term';
        newTerm.innerHTML = termButtonHTML(facet, term);
        newTerm.onclick = (e) => newTermOnClick(e);
        termList.appendChild(newTerm);

        const newFormTerm = newTerm.cloneNode(true);
        newFormTerm.onclick = (e) => newTermOnClick(e);
        newFormTerm.classList.add('b-facet-box__term--form')
        if (document.querySelector('.b-search-form__facets')) {
          document.querySelector('.b-search-form__facets').appendChild(newFormTerm);
        }

        if (!document.querySelector('.b-search-form__facet-pane--active')) {
          document.querySelector('.b-search-form__facet-pane').classList.add('b-search-form__facet-pane--active');
        }
      }
    }
  };

  termList.addEventListener('termToggle', (e) => {
    e.stopPropagation();
    toggleTerm(e.detail);
  });

  document.querySelector('.b-facet-box').addEventListener('newFacets', (e) => {
    const { facets, activeFacets } = e.detail;

    facets.forEach((facet) => {
      Object.assign(facetsWithIndex, {
        [facet.facet]: Object.assign(facet, { index: 0 })
      });
    });

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

    facetBoxContainer.append(dateFacet);

    if (activeFacets) {
      // is a set...
      Array.from(activeFacets).forEach((facetId) => {
        const target = document.querySelector(`li[data-id='${facetId}'`);
        if (target) {
          target.dispatchEvent(newTermToggleEvent(target.dataset));
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

    if (e.target.classList.contains(termCheckboxClass)) {
      const parent = e.target.classList.contains(termCheckboxClass) ?
        e.target.parentElement : e.target.parentElement.parentElement.parentElement;

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
      const facetFormTerms = Array.from(document.querySelectorAll(".b-facet-box__term.b-facet-box__term--form"));
      if (document.querySelector(".b-facet-box__term-text.b-facet-box__term-text--no-cross")) {
        if ((facetFormTerms.length) > 0) {
          document.querySelector(".b-search-form__facets-mobile").style.display = 'block';
        } else {
          document.querySelector(".b-search-form__facets-mobile").style.display = 'none';
        }

        if (window.innerWidth > 499) {
          const facetContainerWidth = document.querySelector(".b-search-form__facets").offsetWidth;
          let cutOffWidth = 0;
          let currentIndex = 1;
          facetFormTerms.forEach(el => {
            cutOffWidth += el.offsetWidth + 10;
            if (cutOffWidth < facetContainerWidth) {
              currentIndex += 1;
            }
          });
          document.querySelector(".b-facet-box__term-text.b-facet-box__term-text--no-cross").innerHTML = `${facetFormTerms.length - currentIndex}+`;
        } else {
          document.querySelector(".b-facet-box__term-text.b-facet-box__term-text--no-cross").innerHTML = `${facetFormTerms.length} filters applied`;
        }
      }
    }
  }
})();
