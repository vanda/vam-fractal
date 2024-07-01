const oicInit = () => {
  const oicSeeds = Array.from(document.querySelectorAll('.js-object-image-overlay-item'));

  if (oicSeeds.length) {
    const oic = document.querySelector('.b-object-image-overlay') || document.createElement('div');
    document.body.appendChild(oic);
    oic.classList.add('b-object-image-overlay');
    oic.innerHTML = `
      <button class="b-object-image-overlay__dismiss" title="Close" aria-label="Close"></button>
      <div class="b-object-image-overlay__items"></div>
    `;
    const items = oic.querySelector('.b-object-image-overlay__items');

    oic.addItem = (index, prepend = false) => {
      const seed = oicSeeds[index] || oicSeeds[0];
      const data = seed.dataset.objectImageOverlay
        ? JSON.parse(seed.dataset.objectImageOverlay)
        : null;
      const copyright = data && data.copyright
        ? `<span itemprop="copyrightHolder">${data.copyright}</span>`
        : '';
      const locationType = data && data.locationType
        ? `<div class="b-object-image-overlay__location-type">${data.locationType}</div>`
        : '';
      const locationSite = data && data.locationSite ? data.locationSite : null;
      const locationRoom = () => {
        if (data && data.locationRoom) {
          if (data.visitUrl) {
            return `<a tabindex="-1" class="b-object-image-overlay__visit" href="${data.visitUrl}" data-tracking-oic="visit the object">${data.locationRoom}</a>`;
          }
          return data.locationRoom;
        }
        return '';
      };
      const objectImg = seed.querySelector('img');
      const objectImgHTML = objectImg
        ? `<img class="b-object-image-overlay__image"
           itemprop="contentUrl"
           alt="${objectImg.alt}"
           sizes="(max-width: 991px) calc(100vw - 20px),
                  (min-width: 992px) calc(70vw - 145px),
                  (min-width: 1200px) 710px"
           srcset="${objectImg.srcset}"
           src="${objectImg.src}"
           loading="lazy">
        `
        : '<div class="s-lazyload--error"></div>';
      const objectUrl = seed.querySelector('a').getAttribute('href');
      const objectLink = objectUrl.length
        ? `<a tabindex="-1" class="b-object-image-overlay__cta u-btn u-btn--micro u-btn--outlined-inverse" href="${objectUrl}" data-tracking-oic="explore the object">More info</a>`
        : '';
      const item = document.createElement('div');
      item.classList.add('b-object-image-overlay__item');
      item.innerHTML += `
        ${objectImgHTML}
        <div class="b-object-image-overlay__details">
          ${seed.querySelector('figcaption').textContent}
          ${locationSite}
          ${locationRoom()}
          <div class="b-object-image-overlay__more">
            ${locationType}
            ${objectLink}
          </div>
          <div class="b-object-image-overlay__footer">
            <div class="b-object-image-overlay__copyright">
              ${copyright}
            </div>
            <div class="b-object-image-overlay__buttons">
              <div class="b-object-image-overlay__prevnext">
                <button disabled class="b-object-image-overlay__prev b-object-image-overlay__prev--disabled" title="Previous object" data-tracking-oic="previous object">
                  <svg aria-hidden="true" viewBox="0 0 100 100">
                    <path fill="none" d="M-1-1h582v402H-1z"/>
                    <path d="M70.173 12.294L57.446.174l-47.62 50 47.62 50 12.727-12.122-36.075-37.879z" fill="currentColor"/>
                  </svg>
                </button>
                <button disabled class="b-object-image-overlay__next b-object-image-overlay__next--disabled" title="Next object" data-tracking-oic="next object">
                  <svg aria-hidden="true" viewBox="0 0 100 100">
                    <path fill="none" d="M-1-1h582v402H-1z"/>
                    <path d="M20 88.052l12.727 12.121 47.62-50-47.62-50L20 12.294l36.075 37.88z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      if (prepend) {
        items.insertBefore(item, items.firstElementChild);
      } else {
        items.appendChild(item);
      }
    };

    oic.getIndex = (seed) => {
      const index = oicSeeds.findIndex((el) => {
        const match = (el === seed);
        return match;
      });
      return index;
    };

    oic.clipItem = (last = false) => {
      if (last) {
        items.lastElementChild.remove();
      } else {
        items.firstElementChild.remove();
      }
    };

    oic.buttonInit = () => {
      // need to disable all buttons and links on screen first then re-enable
      // buttons that are on screen
      oic.querySelectorAll('button').forEach((el) => el.setAttribute('disabled', true));

      oic.querySelectorAll('a').forEach((el) => el.setAttribute('tabindex', '-1'));

      oic.querySelector('.b-object-image-overlay__dismiss').removeAttribute('disabled');

      // this logic needs to be here because otherwise the buttons off screen
      // will be focused by tabbing
      const item = document.querySelectorAll('.b-object-image-overlay__item')[1];
      const itemPrev = item.querySelector('.b-object-image-overlay__prev');
      const itemNext = item.querySelector('.b-object-image-overlay__next');

      if (oic._index > 0) {
        itemPrev.classList.add('b-object-image-overlay__prev--enabled');
        itemPrev.removeAttribute('disabled');
      }
      if (oic._index < oicSeeds.length - 1) {
        itemNext.classList.add('b-object-image-overlay__next--enabled');
        itemNext.removeAttribute('disabled');
      }

      item.querySelectorAll('a').forEach((el) => el.removeAttribute('tabindex'));

      oic.focusable = [
        document.querySelector('.b-object-image-overlay__dismiss'),
      ].concat(Array.from(
        item.querySelectorAll(
          'button:not([disabled]), a:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
        ),
      ));

      const focusHierarchy = (first, second, last) => {
        if (first) {
          first.focus();
        } else if (second) {
          second.focus();
        } else {
          last.focus();
        }
      };

      focusHierarchy(
        item.querySelector('.b-object-image-overlay__next:not([disabled]'),
        item.querySelector('.b-object-image-overlay__prev:not([disabled]'),
        oic.focusable[0],
      );
    };

    oic.advance = (rewind = false) => {
      if ((!rewind && oic._index < oicSeeds.length - 1)
        || (rewind && oic._index > 0)) {
        oic.clipItem(rewind);
        oic.addItem(oic._index + (2 * (rewind ? -1 : 1)), rewind);
        oic._index += (1 * (rewind ? -1 : 1));
        oic.track(oic._index);
      }

      oic.buttonInit(rewind);
    };

    oic.track = (index) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'OIC',
        object: oicSeeds[index].querySelector('figcaption').textContent.trim(),
        museumNumber: JSON.parse(oicSeeds[index].dataset.objectImageOverlay).museumNumber,
      });
    };

    document.addEventListener('click', (e) => {
      if (e.target.closest('.js-object-image-overlay-item')) {
        e.preventDefault();

        const seed = e.target.closest('.js-object-image-overlay-item');

        oic._index = oic.getIndex(seed);
        oic.addItem(oic._index);
        oic.classList.add('b-object-image-overlay--active');
        oic.addItem(oic._index + 1);
        oic.addItem(oic._index - 1, true);
        oic.focus();
        oic.track(oic._index);
        oic.buttonInit();
        document.body.style.overflow = 'hidden';

        const keyHandle = (e3) => {
          if (e3.key === 'ArrowLeft') {
            e3.preventDefault();
            oic.advance(true);
          } else if (e3.key === 'ArrowRight') {
            e3.preventDefault();
            oic.advance();
          } else if (e3.key === 'Escape' || e3.key === 'Esc') {
            /* eslint-disable no-use-before-define */
            closeModal();
            /* eslint-enable no-use-before-define */
          } else if (e3.keyCode === 9) {
            const first = oic.focusable[0];
            const last = oic.focusable[oic.focusable.length - 1];
            const shift = e3.shiftKey;

            if (oic.focusable.length) {
              if (shift && document.activeElement === first) {
                last.focus();
                e3.preventDefault();
              } else if (!shift && document.activeElement === last) {
                first.focus();
                e3.preventDefault();
              }
            }
          }
        };

        const closeModal = () => {
          oic.classList.remove('b-object-image-overlay--active');
          document.body.style.overflow = '';
          items.innerHTML = '';
          oic.onclick = null;
          document.removeEventListener('keydown', keyHandle, false);
        };

        document.addEventListener('keydown', keyHandle, false);

        oic.onclick = (e2) => {
          if (e2.target.matches('.b-object-image-overlay__item, .b-object-image-overlay__dismiss')) {
            e2.preventDefault();
            closeModal();
          } else if (e2.target.closest('.b-object-image-overlay__next--enabled')) {
            e2.preventDefault();
            oic.advance();
          } else if (e2.target.closest('.b-object-image-overlay__prev--enabled')) {
            e2.preventDefault();
            oic.advance(true);
          }
        };

        oic.ontouchstart = (e4) => {
          const startXY = [e4.touches[0].pageX, e4.touches[0].pageY];
          oic.ontouchmove = (e5) => {
            const deltaXY = [e5.touches[0].pageX - startXY[0], e5.touches[0].pageY - startXY[1]];
            if (Math.abs(deltaXY[0]) > Math.abs(deltaXY[1])
              && (
                (deltaXY[0] < 0 && oic._index < oicSeeds.length - 1)
                || (deltaXY[0] > 0 && oic._index > 0)
              )) {
              if (Math.abs(deltaXY[0]) < 74) {
                window.requestAnimationFrame(() => {
                  items.style.marginLeft = `${deltaXY[0]}px`;
                });
              } else {
                oic.ontouchmove = null;
                if (deltaXY[0] < 0) {
                  oic.advance();
                } else {
                  oic.advance(true);
                }
              }
            }
          };
          oic.ontouchend = () => {
            window.requestAnimationFrame(() => {
              items.style.marginLeft = 0;
              items.style.transition = 'all .35s';
            });
          };
        };
      }
    }, false);
  }
};

export default oicInit;
