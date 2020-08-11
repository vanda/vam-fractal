const facet_class = 'b-facet-box__facet';
const facet_term = `${facet_class}-term-toggle`;
const facet_term_tick =`${facet_term}-tick`;
const facet_text_class = `${facet_class}-text`;
const facet_term_container_class = `${facet_class}-term-container`;

const term_class = "b-facet-box__term";
const term_list_class = `${term_class}-list`;
const term_list = document.querySelector(`.${term_list_class}`);
const term_checkbox_class = `${facet_class}-term-toggle-checkbox`;
const term_tick_class = `${facet_class}-term-toggle-tick`;

const facet_close_class = `b-facet-box__close-button`

const termHTML = (id, facet, term) => `
  <div data-id="${id}" data-facet="${facet}" data-term="${term}" class="b-facet-box__term">
    <span class="b-facet-box__term-text">
        ${facet}: ${term}
    </span>
  </div>
`;

const termToggleHTML = (facet, term, count) => `
  <li class="b-facet-box__facet-term-toggle" data-id="${facet}-${term}" data-facet="${facet}" data-term="${term}">
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

const facetHTML = (facet) => `
  <div class="b-facet-box__facet-text">
    ${facet}
  </div>
  <ul class="b-facet-box__facet-term-container"></ul>
`;

const createFacet = ({facet, terms}) => {
  const newFacet = document.createElement("DIV");
  newFacet.className = 'b-facet-box__facet';
  newFacet.innerHTML = facetHTML(facet);
  terms.forEach(({term, count}) => {
    newFacet.querySelector(`.${facet_term_container_class}`).innerHTML =
     newFacet.querySelector(`.${facet_term_container_class}`).innerHTML + termToggleHTML(facet, term, count);
  })

  return newFacet.outerHTML;
}

/* fire event that contains new search criteria... might
change when search is actually implemented. */

const updatedSearch = () => {
  const detail = Array.from(document.querySelectorAll(`.${term_class}`)).map(el => JSON.parse(JSON.stringify(el.dataset)));
  document.querySelector(`.b-facet-box`).dispatchEvent(
    new CustomEvent('updatedSearch', {
      detail,
      bubbles: true
    })
  )
}

const initialiseFacetToggle = () => {
  Array.from(document.querySelectorAll(`.${facet_class}`)).forEach(el => {
    el.addEventListener('facetToggle', e => {
      Array.from(e.target.children).forEach(el => {
        el.classList.toggle(el.classList[0] + '--active');
      })
    })
  });

  Array.from(document.querySelectorAll(`.${facet_term}`)).forEach(el => {
    el.addEventListener('termToggle', e => {
      e.target.querySelector(`.${facet_term_tick}`).classList.toggle(
        `${facet_term_tick}--active`
      );
    })
  })
}

const newtermToggleEvent = detail => new CustomEvent('termToggle', {
  detail,
  bubbles: true
});

const initialiseFacetOverlay = () => {
  /* might change later but basic implemenation will probably be similar... */
  document.querySelector('.b-facet-box').addEventListener('newFacets', e => {
    const { facets } = e.detail;
    document.querySelector('.b-facet-box__facet-container').innerHTML = ``;
    facets.forEach(facet => {
      document.querySelector('.b-facet-box__facet-container').innerHTML =
        document.querySelector('.b-facet-box__facet-container').innerHTML + createFacet(facet);
    })
    initialiseFacetToggle();
  }, true);

  document.querySelector(`.${term_list_class}`).addEventListener('termToggle', e => {
      const { id, facet, term } = e.detail;
      if (id) {
        if (document.querySelector(`div[data-id='${id}']`)) {
          document.querySelector(`div[data-id='${id}']`).remove();
        } else {
          const newTerm = document.createElement("DIV");
          newTerm.innerHTML = termHTML(id, facet, term);
          newTerm.onclick = () => {
            document.querySelector(`div[data-id='${id}']`).dispatchEvent(newtermToggleEvent({id, facet, term}));
            document.querySelector(`li[data-id='${id}']`).dispatchEvent(newtermToggleEvent({id, facet, term}));
          }
          e.target.appendChild(newTerm);
        }
      }
      updatedSearch();
  });

  document.onclick = e => {
    if (e.target.classList.contains(facet_close_class)) {
      e.target.dispatchEvent(new Event('closeFacetOverlay', {
        bubbles: true
      }));
    }

    if (e.target.classList.contains(facet_text_class)) {
      e.target.parentElement.dispatchEvent(new Event('facetToggle', {
        bubbles: true
      }));
    }

    if (e.target.classList.contains(term_checkbox_class)) {
      const parent = e.target.classList.contains(term_checkbox_class) ?
        e.target.parentElement : e.target.parentElement.parentElement.parentElement;
      term_list.dispatchEvent(newtermToggleEvent(parent.dataset));
      parent.dispatchEvent(newtermToggleEvent(parent.dataset));
    }
  };

  initialiseFacetToggle();
};


(() => initialiseFacetOverlay())();
