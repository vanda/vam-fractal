const initFacetOverlayModal = () => {
  document.querySelector('.facet-overlay-modal__button').onclick = (e) => {
    document.querySelector('.facet-overlay-modal__container').classList.toggle('facet-overlay-modal__container--active');
    e.preventDefault();
  };

  document.querySelector('.facet-overlay-modal__container').addEventListener('closeFacetOverlay', () =>
    document.querySelector('.facet-overlay-modal__container').classList.toggle('facet-overlay-modal__container--active')
  );
};

initFacetOverlayModal();
