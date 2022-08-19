/* eslint-disable no-underscore-dangle */
document.addEventListener('DOMContentLoaded', () => {
  const imgRows = document.querySelectorAll('.b-image-row');
  if (imgRows.length) {
    let rowId = 0;
    Array.from(imgRows, (imgRow) => {
      rowId += 1;
      imgRow.classList.add(`b-image-row-${rowId}`);
      imgRow._imageRowId = rowId;

      /* use a style tag so we have media-queries */
      const imgRowStyle = imgRow.parentNode.insertBefore(document.createElement('style'), imgRow);
      const imgs = imgRow.querySelectorAll('.b-image-row__img');

      const rowStyle = () => {
        const aspectRatios = [];
        const parentRow = imgs[0].closest('.b-image-row');
        const parentRowCS = getComputedStyle(parentRow);
        const rowWidth = parentRow.getBoundingClientRect().width
                          - parseInt(parentRowCS.paddingLeft, 10)
                          - parseInt(parentRowCS.paddingRight, 10);
        let imgRowStyleMobile = '';
        let imgId = 0;
        Array.from(imgs, (img) => {
          aspectRatios.push(img.naturalWidth / img.naturalHeight);
          imgId += 1;
          if (imgId % 2 === 0) {
            /* apply the same height calculation for mobile as the general rule below,
             * but in batches of 2 images, and with rounding and a tiny reduction to
             * ensure no pair is wider than a wrapped row */
            imgRowStyleMobile += `
              .b-image-row-${parentRow._imageRowId} .b-image-row__item:nth-child(${imgId - 1}),
              .b-image-row-${parentRow._imageRowId} .b-image-row__item:nth-child(${imgId}) {
                height: ${Math.round((rowWidth / (aspectRatios[imgId - 2] + aspectRatios[imgId - 1])) - 1.5)}px;
              }
            `;
          }
          return true;
        });
        imgRowStyle.innerHTML = `
          @media screen and (max-width: 768px) {
            .b-image-row-${parentRow._imageRowId} {
              flex-wrap: wrap;
            }
            ${imgRowStyleMobile}
          }
          .b-image-row-${parentRow._imageRowId} .b-image-row__item {
            height: ${rowWidth / aspectRatios.reduce((a, b) => a + b)}px;
          }
        `;
      };

      const complete = [];
      const loaded = (anyImg) => {
        complete.push(anyImg);
        if (complete.length === imgs.length) rowStyle();
      };

      Array.from(imgs, (img) => {
        /* wait for LazyLoad to set src attribute for each img */
        const observer = new MutationObserver(() => {
          observer.disconnect();
          /* then wait for each img to load */
          if (img.complete) {
            loaded(img);
          } else {
            img.addEventListener('load', () => { loaded(img); }, false);
          }
        });
        observer.observe(img, { attributes: true });
        return true;
      });

      window.addEventListener('resize', rowStyle, false);
      return true;
    });
  }
}, true);

/* eslint-enable no-underscore-dangle */
