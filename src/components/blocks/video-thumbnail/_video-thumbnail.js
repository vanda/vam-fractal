const videoThumbs = document.querySelectorAll('.js-video-thumbnail');

Array.from(videoThumbs, (vidThumb) => {
  vidThumb.addEventListener('click', (e) => {
    e.preventDefault();
    const popup = document.createElement('div');
    const popupClose = document.createElement('div');
    popup.className = 'b-video-thumbnail__popup';
    popup.innerHTML = `<iframe class="b-video-thumbnail__popup-iframe" width="90%" height="90%" src="${vidThumb.href}"&playsinline=1" frameborder="0" allowfullscreen></iframe>`;
    popup.addEventListener('click', () => {
      popup.remove();
    });
    popupClose.className = 'b-video-thumbnail__popup-close';
    popupClose.innerHTML = `
      <svg role="img">
        <use xlink:href="/assets/svg/svg-template.svg#close"></use>
      </svg>`;
    popup.appendChild(popupClose);
    document.body.appendChild(popup);
  });
  return true;
});
