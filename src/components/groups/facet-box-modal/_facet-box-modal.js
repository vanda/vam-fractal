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


  if (document.querySelector('.b-facet-box-modal__button')) {
    document.addEventListener('keydgown', (e) => {
      if (e.keyCode == 27) {
        document.dispatchEvent(new Event('closeFacetOverlay'));
      }
    });
  }
};

initFacetOverlayModal();
