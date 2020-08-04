const facet_class = 'facet-overlay__facet';
const facet_text_class = `${facet_class}-text`;
const facet_term_container_class = `${facet_class}-term-container`;

const term_list_class = `facet-overlay__term-list`;
const term_list = document.querySelector(`.${term_list_class}`);
const term_checkbox_class = `${facet_class}-term-toggle-checkbox`;
const term_tick_class = `${facet_class}-term-toggle-tick`;


const termHTML = (id, facet, term) => `
  <div data-id="${id}" class="facet-overlay__term">
    <span class="facet-overlay__term-text">
        ${facet}: ${term}
    </span>
  </div>
`;

const newtermToggleEvent = detail => new CustomEvent('termToggle', {
  detail,
  bubbles: true
});

const initialiseFacetOverlay = () => {
  document.querySelector(`.${term_list_class}`).addEventListener('termToggle', e => {
      const { id, facet, term } = e.detail;

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
  });

  Array.from(document.querySelectorAll(`.${facet_class}`)).forEach(el => {
    el.addEventListener('facetToggle', e => {
      Array.from(e.target.children).forEach(el => {
        el.classList.toggle(el.classList[0] + '--active');
      })
    })
  });

  Array.from(document.querySelectorAll('.facet-overlay__facet-term-toggle')).forEach(el => {
    el.addEventListener('termToggle', e => {
      e.target.querySelector('.facet-overlay__facet-term-toggle-tick').classList.toggle(
        'facet-overlay__facet-term-toggle-tick--active'
      );
    })
  })

  document.onclick = e => {
    if (e.target.classList.contains(facet_text_class)) {
      e.target.parentElement.dispatchEvent(new Event('facetToggle'));
    }

    if (e.target.classList.contains(term_checkbox_class) || e.target.getAttribute("xlink:href")) {
      const parent = e.target.classList.contains(term_checkbox_class) ? e.target.parentElement : e.target.parentElement.parentElement.parentElement;
      term_list.dispatchEvent(newtermToggleEvent(parent.dataset));
      parent.dispatchEvent(newtermToggleEvent(parent.dataset));
    }
  };
};

(() => initialiseFacetOverlay())();
