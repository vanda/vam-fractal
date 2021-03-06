function polyfillObjectFit () {
  const objectFitContainer = document.querySelectorAll('.js-object-fit-container');
  [].forEach.call(objectFitContainer, (els) => {
    if (els.getElementsByTagName('img')[0]) {
      const imgEl = els.getElementsByTagName('img')[0];
      imgEl.addEventListener('load', () => {
        const imgUrl = imgEl.src;
        if (imgUrl) {
          els.classList.add('js-object-fit-container--fallback');
          els.style.backgroundImage = `url('${imgUrl}')`;
        }
      });
    }
  });
}

if (typeof Modernizr !== 'undefined') {
  Modernizr.on('objectfit', (r) => {
    if (!r) polyfillObjectFit();
  });
}
