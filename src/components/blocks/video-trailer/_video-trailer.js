const videoTrailer = document.querySelector('.js-video-trailer');
console.log(1);
if (videoTrailer) {
  console.log(2)
  const previewImage = videoTrailer.querySelector('.js-video-trailer-preview');
  const popup = document.createElement('div');
  const videoHeightRatio = 0.5625;
  videoTrailer.addEventListener('click', (e) => {
    console.log(3)
    e.preventDefault();
    popup.className = 'b-video-trailer__image';
    popup.innerHTML = `<iframe class="" width="100%" height="100%" src="${videoTrailer.href}"&playsinline=1" frameborder="0" allowfullscreen></iframe>`;
    previewImage.remove();
    videoTrailer.appendChild(popup);
    popup.style.height = `${popup.offsetWidth * videoHeightRatio}px`;
  });

  window.addEventListener('resize', () => {
    console.log(4)
    popup.style.height = `${popup.offsetWidth * videoHeightRatio}px`;
  });
}
