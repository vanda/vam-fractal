const facetClass = 'b-facet-box__facet';
const facetTerm = `${facetClass}-term-toggle`;
const facetTermTick = `${facetTerm}-tick`;
const facetTextClass = `${facetClass}-text`;
const facetTermContainerClass = `${facetClass}-term-container`;

const termClass = 'b-facet-box__term';
const termListClass = `${termClass}-list`;
const termList = document.querySelector(`.${termListClass}`);
const termCheckboxClass = `${facetClass}-term-toggle-checkbox`;
// const termTickClass = `${facetClass}-term-toggle-tick`;

const facetCloseClass = 'b-facet-box__close-button';

const termHTML = (id, facet, term) => `
  <div data-id="${id}" data-facet="${facet}" data-term="${term}" class="b-facet-box__term">
    <span class="b-facet-box__term-text">
        ${facet}: ${term}
    </span>
  </div>
`;

const termToggleHTML = (facet, term, count) => `
  <li class="b-facet-box__facet-term-toggle" data-id="${facet.trim()}-${term.trim()}" data-facet="${facet}" data-term="${term}">
    <a class="b-facet-box__facet-term-toggle-checkbox" href="javascript:void(0);">
      <svg class="b-facet-box__facet-term-toggle-tick" role="img">
        <use xlink:href="/assets/svg/svg-template.svg#tick"></use>
      </svg>
    </a>
    <span class="b-facet-box__facet-term-toggle-text">
      ${term}
    </span>
    <span class="b-facet-box__facet-term-toggle-result">
      (${count})
    </span>
  </li>
`;

const facetHTML = facet => `
  <div class="b-facet-box__facet-text">
    ${facet}
  </div>
  <ul class="b-facet-box__facet-term-container"></ul>
`;

const createFacet = ({ facet, terms }) => {
  const newFacet = document.createElement('DIV');
  newFacet.className = 'b-facet-box__facet';
  newFacet.innerHTML = facetHTML(facet);
  terms.forEach(({ term, count }) => {
    newFacet.querySelector(`.${facetTermContainerClass}`).innerHTML =
     newFacet.querySelector(`.${facetTermContainerClass}`).innerHTML + termToggleHTML(facet, term, count);
  });

  return newFacet.outerHTML;
};

const updatedSearch = () => {
  const detail = Array.from(
    document.querySelectorAll(`.${termClass}`)).map(el => JSON.parse(JSON.stringify(el.dataset))
  );
  document.querySelector('.b-facet-box').dispatchEvent(
    new CustomEvent('updatedSearch', {
      detail,
      bubbles: true
    })
  );
};

const initialiseFacetToggle = () => {
  Array.from(document.querySelectorAll(`.${facetClass}`)).forEach((el) => {
    el.addEventListener('facetToggle', (e) => {
      Array.from(e.target.children).forEach((ell) => {
        ell.classList.toggle(`${ell.classList[0]}--active`);
      });
    });
  });

  Array.from(document.querySelectorAll(`.${facetTerm}`)).forEach((el) => {
    el.addEventListener('termToggle', (e) => {
      e.target.querySelector(`.${facetTermTick}`).classList.toggle(
        `${facetTermTick}--active`
      );
    });
  });
};

const newtermToggleEvent = detail => new CustomEvent('termToggle', {
  detail,
  bubbles: true
});

const initialiseFacetOverlay = () => {
  /* might change later but basic implemenation will probably be similar... */
  document.querySelector('.b-facet-box').addEventListener('newFacets', (e) => {
    const { facets } = e.detail;
    const dateFacet = document.querySelector('.b-facet-box__facet-date').outerHTML;
    document.querySelector('.b-facet-box__facet-container').innerHTML = '';
    facets.forEach((facet) => {
      document.querySelector('.b-facet-box__facet-container').innerHTML =
        document.querySelector('.b-facet-box__facet-container').innerHTML + createFacet(facet);
    });
    document.querySelector('.b-facet-box__facet-container').innerHTML =
      document.querySelector('.b-facet-box__facet-container').innerHTML + dateFacet;
    initialiseFacetToggle();
  }, true);

  document.querySelector(`.${termListClass}`).addEventListener('termToggle', (e) => {
    const { id, facet, term } = e.detail;

    if (id) {
      if (document.querySelector(`div[data-id='${id}']`)) {
        Array.from(document.querySelector(`div[data-id='${id}']`)).forEach((el) => {
          el.remove();
        });
      } else {
        const newTerm = document.createElement('DIV');

        newTerm.innerHTML = termHTML(id, facet, term);
        newTerm.onclick = () => {
          document.querySelector(`.${termListClass}`).dispatchEvent(newtermToggleEvent({ id, facet, term }));
          document.querySelector(`li[data-id='${id}']`).dispatchEvent(newtermToggleEvent({ id, facet, term }));
        };

        newTerm.firstElementChild.className = 'b-facet-box__term b-facet-box__term--facet-box';
        e.target.appendChild(newTerm);

        const newTermSearch = newTerm.cloneNode();

        newTermSearch.firstElementChild.className = 'b-facet-box__term b-facet-box__term--search-box';

        document.querySelector('.b-search-results-page').dispatchEvent(new CustomEvent('termToggleSearchBox', {
          detail: {
            newTermSearch
          },
          bubbles: true
        }));
      }
    }
    updatedSearch();
  });

  document.onclick = (e) => {
    if (e.target.classList.contains(facetCloseClass)) {
      e.target.dispatchEvent(new Event('closeFacetOverlay', {
        bubbles: true
      }));
    }

    if (e.target.classList.contains(facetTextClass)) {
      e.target.parentElement.dispatchEvent(new Event('facetToggle', {
        bubbles: true
      }));
    }

    if (e.target.classList.contains(termCheckboxClass)) {
      const parent = e.target.classList.contains(termCheckboxClass) ?
        e.target.parentElement : e.target.parentElement.parentElement.parentElement;
      termList.dispatchEvent(newtermToggleEvent(parent.dataset));
      parent.dispatchEvent(newtermToggleEvent(parent.dataset));
    }
  };

  initialiseFacetToggle();
};


(() => {
  if (document.querySelector('.b-facet-box')) {
    initialiseFacetOverlay();
  }
})();
