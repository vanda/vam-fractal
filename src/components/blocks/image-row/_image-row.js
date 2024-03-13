document.addEventListener('DOMContentLoaded', () => {
  let rowId = 0;
  Array.from(document.querySelectorAll('.b-image-row'), (imgRow) => {
    rowId += 1;
    imgRow.classList.add(`b-image-row-${rowId}`);
    imgRow._imageRowId = rowId;

    /* use a style tag so we have media-queries */
    const imgRowStyle = imgRow.parentNode.insertBefore(document.createElement('style'), imgRow);

    const styleImgRow = () => {
      const rowAspectRatios = [];
      const rowCS = getComputedStyle(imgRow);
      const rowWidth = imgRow.getBoundingClientRect().width
                        - parseInt(rowCS.paddingLeft, 10)
                        - parseInt(rowCS.paddingRight, 10);
      let imgRowStyleMobile = '';
      let imgId = 0;
      Array.from(imgRow.querySelectorAll('.b-image-row__img'), (img) => {
        if (img.naturalWidth) {
          /* add images that have loaded successfully */
          rowAspectRatios.push(img.naturalWidth / img.naturalHeight);
        } else {
          /* handle any failed images that have been replaced with a styled div by s-imageload */
          rowAspectRatios.push(1);
          img.closest('.b-image-row__item').classList.add('b-image-row__item--failed');
        }
        imgId += 1;
        if (imgId % 2 === 0) {
          /* apply the same height calculation for mobile as the general rule below,
           * but in batches of 2 images, and with rounding plus a tiny reduction to
           * ensure no pair is wider than a wrapped row */
          imgRowStyleMobile += `
            .b-image-row-${imgRow._imageRowId} .b-image-row__item:nth-child(${imgId - 1}), 
            .b-image-row-${imgRow._imageRowId} .b-image-row__item:nth-child(${imgId}) {
              height: ${Math.round((rowWidth / (rowAspectRatios[imgId - 2] + rowAspectRatios[imgId - 1])) - 1.5)}px;
            }
          `;
        }
        return true;
      });

      imgRowStyle.innerHTML = `
        @media screen and (max-width: 768px) {
          .b-image-row-${imgRow._imageRowId} { 
            flex-wrap: wrap;
          }
          ${imgRowStyleMobile}
        }
        .b-image-row-${imgRow._imageRowId} .b-image-row__item {
          height: ${rowWidth / rowAspectRatios.reduce((a, b) => a + b)}px;
        }
      `;
    };

    /* Iterate all the row's images and set a trigger
     * to style the row once the final image has loaded */
    const imgRowImgs = imgRow.querySelectorAll('.b-image-row__img');
    const imgRowImagesLoaded = [];

    const addLoadedImg = (loadedImg) => {
      imgRowImagesLoaded.push(loadedImg);
      /* if this is the final img, style the row */
      if (imgRowImagesLoaded.length === imgRowImgs.length) {
        styleImgRow();
      }
    };

    Array.from(imgRowImgs, (img) => {
      if (img.complete || img.tagName !== 'IMG') {
        /* add imgs which have already loaded,
         * and imgs already failed and replaced by s-imageload) */
        addLoadedImg(img);
      } else {
        /* wait for imgs yet to load or fail */
        img.addEventListener('load', () => {
          addLoadedImg(img);
        });
        img.addEventListener('error', () => {
          addLoadedImg(img);
        });
      }
      return true;
    });

    window.addEventListener('resize', styleImgRow, false);
    return true;
  });
});
