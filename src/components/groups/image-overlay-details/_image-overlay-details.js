function updateCounter () {
  document.querySelector('.b-image-overlay-detail__current-image').innerHTML =
    parseInt(document.querySelector('.b-image-carousel__image-preview-container--selected').getAttribute('data-image-index'), 10) + 1;
  document.querySelector('.b-image-overlay-detail__total-number-of-images').innerHTML =
    document.querySelectorAll('.b-image-carousel__image-preview-container').length;
}

function createUpdateEvent (opr) {
  return new CustomEvent('updateimageandcounter', { detail: { opr }, bubbles: true });
}

function updateImageAndCounter (e) {
  const opr = e && e.detail && e.detail.opr;
  const setIndex = e && e.detail && e.detail.index;
  let newIndex = setIndex;

  const classActive = 'b-image-overlay__image--active';
  const currentSelect = document.querySelector(`.${classActive}`);

  if (opr) {
    newIndex = parseInt(currentSelect.getAttribute('data-image-index'), 10);
  }

  if (opr === '+') {
    newIndex += 1;
  } else if (opr === '-') {
    newIndex -= 1;
  }

  console.log('is this not firing');

  if (document.querySelector(`img[data-image-index="${String(newIndex)}"]`)) {
    if (currentSelect) {
      currentSelect.classList.remove(classActive);
    }

    const classSelected = 'image-carousel__image-preview-container--selected';
    const selectedEl = document.querySelector(`.${classSelected}`);

    if (selectedEl) {
      selectedEl.classList.remove(classSelected);
    }

    document.querySelector(`div[data-image-index='${String(newIndex)}']`).classList.add(classSelected);

    const imageDetailNext = document.querySelector('.b-image-overlay-detail__next');
    const imageDetailPrev = document.querySelector('.b-image-overlay-detail__prev');

    if (newIndex === document.querySelectorAll('.b-image-carousel__image-preview-container').length - 1) {
      imageDetailNext.classList.remove('image-overlay-detail__next--enabled');
    } else {
      imageDetailNext.classList.add('image-overlay-detail__next--enabled');
    }

    if (newIndex === 0) {
      imageDetailPrev.classList.remove('image-overlay-detail__prev--enabled');
    } else {
      imageDetailPrev.classList.add('image-overlay-detail__prev--enabled');
    }

    document.querySelector(`img[data-image-index='${String(newIndex)}']`).classList.add(classActive);

    updateCounter();
  }
}

function initImageOverlay () {
  const imageDetailNext = document.querySelector('.b-image-overlay-detail__next');
  const imageDetailPrev = document.querySelector('.b-image-overlay-detail__prev');

  const updateEvent = opr => createUpdateEvent(opr);

  if (document.querySelector('.b-image-overlay-detail')) {
    imageDetailPrev.onclick = e => e.target.dispatchEvent(updateEvent('-'));
    imageDetailNext.onclick = e => e.target.dispatchEvent(updateEvent('+'));
    document.querySelector('.b-image-overlay-detail').addEventListener('updateimageandcounter', updateImageAndCounter);
  }

  document.querySelector('.b-image-overlay-detail').dispatchEvent(updateEvent(''));
}

document.querySelector('.b-image-overlay-detail') && initImageOverlay();
