import { rovingTabindex } from '../../services/js_utility_functions/js_utility_functions';

/* MediaViewer initialiser fn */
const mediaViewerInit = (mediaViewer) => {
  const menu = mediaViewer.querySelector('.js-media-viewer-thumbs');
  const thumbs = Array.from(menu.querySelectorAll('.js-media-viewer-link-thumb'));
  const prevBtn = mediaViewer.querySelector('.js-media-viewer-prev');
  const nextBtn = mediaViewer.querySelector('.js-media-viewer-next');
  let index = 0;

  /* fn to set Prev/Next button states */
  const setPrevNext = () => {
    prevBtn.toggleAttribute('disabled', index === 0);
    nextBtn.toggleAttribute('disabled', index === thumbs.length - 1);

    /* ensure correct thumb is in view */
    thumbs[index].scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  /* fn to populate main preview img from selected img thumb el data */
  const previewImage = () => {
    const seed = thumbs[index];
    const imgLinkMain = mediaViewer.querySelector('.js-media-viewer-link');
    const imgMain = imgLinkMain.querySelector('img');
    const imgMainNew = imgMain.cloneNode(true);
    imgMainNew.srcset = imgMain.srcset.replaceAll(imgLinkMain.dataset.imageId, seed.dataset.imageId); // eslint-disable-line max-len
    imgMainNew.src = imgMain.src.replace(imgLinkMain.dataset.imageId, seed.dataset.imageId);
    imgLinkMain.dataset.imageId = seed.dataset.imageId;
    imgLinkMain.prepend(imgMainNew);
  };

  /* apply rovingTabIndex alternative keyboard navigation to viewer thumbnail list */
  rovingTabindex(menu);

  /* set initial prev/next btn states */
  setPrevNext();

  /* handle image viewer thumbnail menu focus */
  menu.addEventListener('focusin', (e) => {
    /* if refocussing on menu from another mediaViewer el
     * switch rovingTabindex and focus to current thumb index */
    if (mediaViewer.contains(e.relatedTarget)) {
      menu.querySelector('[tabindex="0"]').setAttribute('tabindex', -1);
      thumbs[index].setAttribute('tabindex', 0);
      thumbs[index].focus();
    }

    /* switch the main img preview in case this focus event is between thumbnails */
    index = thumbs.indexOf(document.activeElement);
    previewImage();

    /* update prev/next btns in case this focus event is between thumbnails */
    setPrevNext();
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.js-media-viewer-link-thumb')) {
      e.preventDefault();
    } else
    if (e.target.closest('.js-media-viewer-prev')) {
      index -= 1;
      setPrevNext();
      previewImage();
    } else
    if (e.target.closest('.js-media-viewer-next')) {
      index += 1;
      setPrevNext();
      previewImage();
    } else
    if (e.target.closest('.js-media-viewer-link')) {
      /* handle main img click
       * to open into a fullscreen UV */
      e.preventDefault();
      // const imgLink = e.target.closest('.js-media-viewer-link');
      // const iiifManifest = imgLink.dataset.iiifManifest;
      // if (iiifManifest) {
      //   const imagesUV = document.querySelector('#js-uv-primary');
      //   const uv = UV.init(imagesUV, {
      //     manifest: iiifManifest,
      //     canvasIndex: index,
      //   });
      //   /* UV config */
      //   uv.on('configure', ({ cb }) => {
      //     cb({ options: { headerPanelEnabled: false } });
      //   });
      //   imagesUV.requestFullscreen();
      // }
    }
  });

  /* handle UV ExitFullscreen click.
    * temporary hack until UV can be made to be aware of its own native fullscreen state.
    * useCapture required to override UV's own FullScreen click handler */
  // document.addEventListener('click', (e) => {
  //   if (e.target.closest('.exitFullscreen, .fullScreen')) {
  //     const uvExit = e.target.closest('.exitFullscreen, .fullScreen');
  //     if (uvExit && document.fullscreenElement) {
  //       e.stopImmediatePropagation();
  //       document.exitFullscreen();
  //     }
  //   }
  // }, true);
};

export default mediaViewerInit;
