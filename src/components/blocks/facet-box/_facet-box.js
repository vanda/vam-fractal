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

const termButtonHTML = (id, facet, term) => `
  <div data-id="${id}" class="b-facet-box__term">
    <span class="b-facet-box__term-text">
        ${facet}: ${term}
    </span>
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
  `;

  checkbox.addEventListener('termToggle', (e) => {
    if (e.target.querySelector(`.${facetTermTick}`).classList.contains(`${facetTermTick}--active`)) {
      e.target.querySelector('.b-facet-box__hidden-input').remove();
    } else {
      const newInput = document.createElement('INPUT');
      newInput.className = 'b-facet-box__hidden-input';
      newInput.type = 'hidden';
      newInput.name = e.target.dataset.paramName;
      newInput.value = e.target.dataset.value;
      e.target.appendChild(newInput);
    }
    e.target.querySelector(`.${facetTermTick}`).classList.toggle(
      `${facetTermTick}--active`
    );
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

const createFacets = () => {
  const facetBoxContainer = document.querySelector('.b-facet-box__facet-container');

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

    terms.slice(index, index + 5).forEach(({ term, count, value }) => {
      newFacet.querySelector(`.${facetTermContainerClass}`).appendChild(termCheckbox(facet, paramName, term, value, count));
    });
    facetsWithIndex[facet].index += 5;
    newFacet.querySelector(`.${facetTermContainerClass}`).appendChild(newFacet.querySelector('.b-facet-box__term-more'));
    newFacet.querySelector(`.${facetTermContainerClass} .b-facet-box__term-more`).onclick = e => revealMoreFacets(e);
    facetBoxContainer.appendChild(newFacet);
  });
};

const revealMoreFacets = (e) => {
  e.preventDefault();
  const linkEl = e.target;
  const facetContainer = e.target.parentNode;
  const { terms, index, facet, paramName } = facetsWithIndex[e.target.dataset['facet']];
  e.target.remove();
  terms.slice(index, index + 5).forEach(({ term, count, value }) => {
    facetContainer.appendChild(termCheckbox(facet, paramName, term, value, count));
  });
  facetsWithIndex[facet].index += 5;
  if (facetsWithIndex[facet].index !== terms.length) {
    facetContainer.appendChild(linkEl);
  }
}

const newTermToggleEvent = (detail, bubbles = true) => new CustomEvent('termToggle', {
  detail,
  bubbles
});

const initialiseFacetOverlay = () => {
  document.querySelector('.b-facet-box').addEventListener('newFacets', (e) => {
    const dispatchUpdatedSearch = (e) => {
      e.target.dispatchEvent(new CustomEvent('updatedSearch', {
        detail: {
          id: e.detail.id
        },
        bubbles: true
      }));
    }

    // stop update search firing until toggled the terms correctly!!!
    e.target.removeEventListener('termToggle', dispatchUpdatedSearch);

    const { facets } = e.detail;

    facets.forEach((facet) => {
      Object.assign(facetsWithIndex, {
        [facet.facet]: Object.assign(facet, { index: 0 })
      });
    });

    const facetBoxContainer = document.querySelector('.b-facet-box__facet-container');
    facetBoxContainer.innerHTML = '';

    createFacets();

    // terms in modal...
    document.querySelector(`.${termListClass}`).addEventListener('termToggle', (e) => {
      e.stopPropagation();
      toggleTerm(e.detail);
    });

    if (window.active_facets) {
      // is a set...
      Array.from(window.active_facets).forEach(facet_id => {
        const target = document.querySelector(`li[data-id='${facet_id}'`);
        target.dispatchEvent(newTermToggleEvent(target.dataset));
        document.querySelector(`.${termListClass}`).dispatchEvent(newTermToggleEvent(target.dataset));
      });
    }

    e.target.addEventListener('termToggle', dispatchUpdatedSearch);
  }, true);

  const toggleTerm = ({ id, facet, term, paramName}) => {
    if (id) {
      // if term already exists, get rid of it
      if (document.querySelector(`div[data-id='${id}']`)) {
        document.querySelector(`div[data-id='${id}']`).remove();
      } else {
        const newTerm = document.createElement('DIV');
        newTerm.innerHTML = termButtonHTML(id, facet, term);
        newTerm.onclick = () => {
          document.querySelector(`div[data-id='${id}']`).dispatchEvent(newTermToggleEvent({ id, facet, term, paramName }));
          document.querySelector(`li[data-id='${id}']`).dispatchEvent(newTermToggleEvent({ id, facet, term, paramName }));
        };
        termList.appendChild(newTerm);
      }
    }
  }

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
  }
})();
