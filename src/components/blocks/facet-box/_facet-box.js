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


const termButtonHTML = (id, facet, term) => `
  <div data-id="${id}" class="b-facet-box__term">
    <span class="b-facet-box__term-text">
        ${facet}: ${term}
    </span>
  </div>
`;

// <use xlink:href="/assets/svg/svg-template.svg#tick"></use>
const termCheckboxHTML = (facet, param_name, term, value, count) => `
  <li class="b-facet-box__facet-term-toggle" data-id="${facet}-${term}" data-facet="${facet}" data-term="${term}" data-value="${value}">
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
   <input class="b-facet-box__hidden-input" type="hidden" name="${param_name}" value="">
  </li>
`;

const facetHTML = facet => `
  <div class="b-facet-box__facet-text">
    ${facet}
  </div>
  <ul class="b-facet-box__facet-term-container"></ul>
`;

const createFacet = ({ facet, param_name, terms }) => {
  const newFacet = document.createElement('DIV');
  newFacet.className = 'b-facet-box__facet';
  newFacet.innerHTML = facetHTML(facet);
  terms.forEach(({ term, count, value }) => {
    newFacet.querySelector(`.${facetTermContainerClass}`).innerHTML =
     newFacet.querySelector(`.${facetTermContainerClass}`).innerHTML + termCheckboxHTML(facet, param_name, term, value, count);
  });

  return newFacet.outerHTML;
};

// obsolete i think because of new search form...
// const updatedSearch = () => {
//   const detail = Array.from(
//     document.querySelectorAll(`.${termClass}`)).map(el => JSON.parse(JSON.stringify(el.dataset))
//   );
//   document.querySelector('.b-facet-box').dispatchEvent(
//     new CustomEvent('updatedSearch', {
//       detail,
//       bubbles: true
//     })
//   );
// };

const initialiseFacetToggle = () => {
  // this just opens and closes each facet list... not very complicated
  Array.from(document.querySelectorAll(`.${facetClass}`)).forEach((el) => {
    el.addEventListener('facetToggle', (e) => {
      Array.from(e.target.children).forEach((ell) => {
        ell.classList.toggle(`${ell.classList[0]}--active`);
      });
    });
  });

  // this triggers checkmarks for each term and also changes value
  Array.from(document.querySelectorAll(`.${facetTerm}`)).forEach((el) => {
    el.addEventListener('termToggle', (e) => {
      if (e.target.querySelector(`.${facetTermTick}`).classList.contains(`${facetTermTick}--active`)) {
        e.target.querySelector('.b-facet-box__hidden-input').value = '';
      } else {
        e.target.querySelector('.b-facet-box__hidden-input').value = e.target.dataset.value;
      }
      e.target.querySelector(`.${facetTermTick}`).classList.toggle(
        `${facetTermTick}--active`
      );
    });
  });
};

const newTermToggleEvent = detail => new CustomEvent('termToggle', {
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


  // terms in modal...
  document.querySelector(`.${termListClass}`).addEventListener('termToggle', (e) => {
    const { id, facet, term, param_name } = e.detail;
    // if (id) {
      // if term already exists, get rid of it
      if (document.querySelector(`div[data-id='${id}']`)) {
        document.querySelector(`div[data-id='${id}']`).remove();
      } else {
        const newTerm = document.createElement('DIV');
        newTerm.innerHTML = termButtonHTML(id, facet, term);
        newTerm.onclick = () => {
          document.querySelector(`div[data-id='${id}']`).dispatchEvent(newTermToggleEvent({ id, facet, term, param_name }));
          document.querySelector(`li[data-id='${id}']`).dispatchEvent(newTermToggleEvent({ id, facet, term, param_name }));
        };
        e.target.appendChild(newTerm);
      }
    // }
    // updatedSearch();
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
      termList.dispatchEvent(newTermToggleEvent(parent.dataset));
      parent.dispatchEvent(newTermToggleEvent(parent.dataset));
    }
  };

  initialiseFacetToggle();
};


(() => {
  if (document.querySelector('.b-facet-box')) {
    initialiseFacetOverlay();
  }
})();
