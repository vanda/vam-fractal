const accordions = document.querySelectorAll('.b-accordion');

if (accordions.length) {
  /* Accordion section toggle animation hack
   * this is to force the CSS animation styling onto the details-content element,
   * which gets slotted into the shadow DOM */
  const accordionToggleSection = (section, sectionContent) => {
    const styles = window.getComputedStyle(sectionContent);

    window.requestAnimationFrame(() => {
      section.classList.toggle('b-accordion__section--open');
      sectionContent.style.transition = styles.getPropertyValue('transition');
    });
  };

  /* Apply toggle animation whenever Accordion section is disclosed/closed
   * by any means, including its content is found by a text-search. */
  const accordionObserver = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      if (mutation.attributeName === 'open') {
        const section = mutation.target;
        const sectionContent = section.firstElementChild.nextElementSibling;
        accordionToggleSection(section, sectionContent);
      }
    });
  });

  /* prep Accordion sections for animation styling */
  Array.from(accordions, (accordion) => {
    accordionObserver.observe(accordion, { attributes: true, subtree: true });
    return true;
  });
}
