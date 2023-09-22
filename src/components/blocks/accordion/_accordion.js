const accordionInit = () => {
  /* Accordion section toggle logic */
  const toggleSection = (accordionSection) => {
    accordionSection.classList.toggle('b-accordion__section--shut');

    const accordionContent = accordionSection.querySelector('.b-accordion__section-content');
    if (accordionContent.hasAttribute('hidden')) {
      accordionContent.removeAttribute('hidden');
    } else {
      accordionContent.setAttribute('hidden', 'until-found');
    }

    const accordionToggle = accordionSection.querySelector('.b-accordion__section-toggle');
    accordionToggle.setAttribute('aria-expanded', String(!(accordionToggle.getAttribute('aria-expanded') === 'true')));
  };

  /* Accordion markup can only be tranformed into an initially collapsed
   * Accordion UI here, knowing that JS is enabled
   */
  let n = 0;
  Array.from(document.querySelectorAll('.b-accordion__section'), (section) => {
    n += 1;

    section.classList.add('b-accordion__section--shut');

    const sectionHeader = section.querySelector('.b-accordion__section-header');
    const sectionToggle = sectionHeader.appendChild(document.createElement('button'));
    sectionToggle.appendChild(sectionHeader.firstChild);
    sectionToggle.className = 'b-accordion__section-toggle';
    sectionToggle.setAttribute('aria-controls', `b-accordion__section-content-${n}`);
    sectionToggle.setAttribute('aria-expanded', 'false');

    const sectionContent = section.querySelector('.b-accordion__section-content');
    sectionContent.setAttribute('hidden', 'until-found');
    sectionContent.id = `b-accordion__section-content-${n}`;

    /* Handle Accordion section toggle clicks */
    sectionToggle.addEventListener('click', () => {
      toggleSection(section);
    });

    /* Open Accordion section when its content is found by a text-search.
    * https://developer.mozilla.org/en-US/docs/Web/API/Element/beforematch_event */
    sectionContent.addEventListener('beforematch', () => {
      toggleSection(section);
    });

    return true;
  });
};

accordionInit();

export default accordionInit;
