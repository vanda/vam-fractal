const facet_class = 'facet-overlay__facet';
const facet_term = `${facet_class}-term-toggle`;
const facet_term_tick =`${facet_term}-tick`;
const facet_text_class = `${facet_class}-text`;
const facet_term_container_class = `${facet_class}-term-container`;


const term_class = "facet-overlay__term";
const term_list_class = `${term_class}-list`;
const term_list = document.querySelector(`.${term_list_class}`);
const term_checkbox_class = `${facet_class}-term-toggle-checkbox`;
const term_tick_class = `${facet_class}-term-toggle-tick`;

const facet_close_class = ""

const termHTML = (id, facet, term) => `
  <div data-id="${id}" data-facet="${facet}" data-term="${term}" class="facet-overlay__term">
    <span class="facet-overlay__term-text">
        ${facet}: ${term}
    </span>
  </div>
`;

/* fire event that contains new search criteria... might
change when search is actually implemented. */

const updatedSearch = () => {
  const detail = Array.from(document.querySelectorAll(`.${term_class}`)).map(el => JSON.parse(JSON.stringify(el.dataset)));
  document.querySelector(`.facet-overlay`).dispatchEvent(
    new CustomEvent('updatedSearch', {
      detail,
      bubbles: true
    })
  )
  console.log(detail);
}

const newtermToggleEvent = detail => new CustomEvent('termToggle', {
  detail,
  bubbles: true
});

const initialiseFacetOverlay = () => {
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

  document.onclick = e => {
    if (e.target.classList.contains(`facet-overlay__close-button`)) {
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
};

(() => initialiseFacetOverlay())();
