const initFacetOverlayModal = () => {
  if (document.querySelector('.b-facet-box-modal__button')) {
    document.querySelector('.b-facet-box-modal__button').onclick = (e) => {
      document.querySelector('.b-facet-box-modal__container').classList.toggle('b-facet-box-modal__container--active');
      e.preventDefault();
    };
  }

  if (document.querySelector('.b-facet-box-modal__button')) {
    document.addEventListener('closeFacetOverlay', () =>
      document.querySelector('.b-facet-box-modal__container').classList.toggle('b-facet-box-modal__container--active')
    );
  }
};

initFacetOverlayModal();
