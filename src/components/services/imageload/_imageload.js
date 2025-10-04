const handleImageError = (el) => {
  if (el.classList.contains('s-imageload--error-hide')) {
    /* In special cases, a failed img can be told to hide */
    el.classList.add('s-imageload--error-hidden');
  } else {
    /* Replace failed img with a div in order to apply styled pseudo elements
      * (otherwise not strictly possible for elements like IMG) */
    const imgFiller = el.parentNode.insertBefore(document.createElement('div'), el);
    imgFiller.classList.add(...Array.from(el.classList.values()), 's-imageload--error');
    imgFiller.dataset.imageFail = el.src;
    imgFiller.setAttribute('aria-label', 'No image available');
    el.remove();
  }
};

/* Catch any image load errors as they occur */
window.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG') {
    handleImageError(e.target);
  }
}, true);

/* Fix any images which have already failed */
Array.from(document.querySelectorAll('img'), (img) => {
  if (img.complete) {
    if (!img.naturalWidth || !img.naturalHeight) {
      handleImageError(img);
    }
  }
  return true;
});
