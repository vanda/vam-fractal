const initFacetOverlayModal = () => {
  document.querySelector('.b-facet-box-modal__button').onclick = (e) => {
    document.querySelector('.b-facet-box-modal__container').classList.toggle('b-facet-box-modal__container--active');
    e.preventDefault();
  };

  document.querySelector('.b-facet-box-modal__container').addEventListener('closeFacetOverlay', () =>
    document.querySelector('.b-facet-box-modal__container').classList.toggle('b-facet-box-modal__container--active')
  );
};

initFacetOverlayModal();
