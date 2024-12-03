const oicInit = () => {
  const oicSeeds = Array.from(document.querySelectorAll('.js-object-image-overlay-item'));

  if (oicSeeds.length) {
    let oic = document.querySelector('.b-object-image-overlay');
    if (!oic) {
      oic = document.createElement('div');
      oic.classList.add('b-object-image-overlay');
      oic.id = 'object-image-overlay';
      oic.setAttribute('role', 'dialog');
      oic.setAttribute('aria-modal', 'true');
      document.body.appendChild(oic);
    }
    const items = document.createElement('div');
    items.classList.add('b-object-image-overlay__items');
    oic.appendChild(items);

    oic.addItem = (index, prepend = false) => {
      const seed = oicSeeds[index] || oicSeeds[0];
      const data = seed.dataset.objectImageOverlay
        ? JSON.parse(seed.dataset.objectImageOverlay)
        : null;
      const objectUrl = seed.querySelector('a').getAttribute('href');
      const objectLink = objectUrl.length > 1
        ? `<a tabindex="-1" class="b-object-image-overlay__cta u-btn u-btn--micro u-btn--outlined-inverse" href="${objectUrl}" data-tracking-oic="explore the object">More info</a>`
        : '';
      const objectImg = seed.querySelector('img');
      const objectImgHTML = objectImg
        ? `<img class="b-object-image-overlay__img"
            itemprop="contentUrl"
            alt="${objectImg.alt}"
            loading="lazy"
            sizes="(min-width: 992px) calc(100vw - 210px),
                  (min-width: 768px) calc(100vw - 80px),
                  (min-width: 500px) calc(100vw - 40px),
                  calc(100vw - 20px)"
            srcset="${objectImg.srcset}"
            src="${objectImg.src}">
        `
        : '<img class="b-object-image-overlay__img" src="">';
      let caption = seed.querySelector('figcaption');
      if (caption) {
        caption = caption.firstElementChild
          ? caption.firstElementChild.textContent
          : caption.textContent;
      } else {
        caption = '';
      }
      const copyright = data && data.copyright ? data.copyright : '';
      const locationType = data && data.locationType
        ? `<div class="b-object-image-overlay__location-type">${data.locationType}</div>`
        : '';
      const locationHTML = () => {
        let html = data && data.locationSite
          ? `<div class="b-object-image-overlay__location" title="Object venue">${data.locationSite}</div>`
          : '';
        if (data && data.locationRoom) {
          let locationRoom = data.locationRoom;
          if (data.visitUrl) {
            locationRoom = `<a class="u-link" href="${data.visitUrl}" tabindex="-1" data-tracking-oic="visit the object">${locationRoom}</a>`;
          }
          html += `
            <div class="b-object-image-overlay__location b-object-image-overlay__location--room" title="Object room">${locationRoom}</div>`;
        }
        return html;
      };
      const item = document.createElement('div');
      item.classList.add('b-object-image-overlay__item');
      item.innerHTML += `
        <div class="b-object-image-overlay__img-pane">
          ${objectImgHTML}
        </div>
        <div class="b-object-image-overlay__content" id="object-image-content-${index}">
          <div class="b-object-image-overlay__details">
            <div class="b-object-image-overlay__header">
              <div class="b-object-image-overlay__caption">
                ${caption}
              </div>
              <button class="b-object-image-overlay__dismiss u-btn-icon u-btn-icon--close">Close</button>
            </div>
            ${locationHTML()}
          </div>
          <div class="b-object-image-overlay__more">
            <div class="b-object-image-overlay__onward">
              ${locationType}
              ${objectLink}
            </div>
            <div class="b-object-image-overlay__footer">
              <div class="b-object-image-overlay__copyright" itemprop="copyrightHolder">
                ${copyright}
              </div>
              <div class="b-object-image-overlay__buttons">
                <button class="js-object-image-overlay-btn--info u-btn-icon u-btn-icon--info" data-tracking-oic="hide info" title="Show/hide information" aria-controls="object-image-content-${index}" aria-expanded="true">Show/hide information</button>
                <button class="js-object-image-overlay-btn--prev u-btn-icon u-btn-icon--point-left" data-tracking-oic="previous object" title="Previous object">Previous object</button>
                <button class="js-object-image-overlay-btn--next u-btn-icon u-btn-icon--point-right" data-tracking-oic="next object" title="Next object">Next object</button>
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

    oic.infoToggle = (btn, toggleOn = false) => {
      if (toggleOn) {
        btn.classList.add('u-btn-icon--active');
      } else {
        btn.classList.toggle('u-btn-icon--active');
      }
      if (btn.classList.contains('u-btn-icon--active')) {
        oic.classList.add('b-object-image-overlay--img-only');
        btn.dataset.trackingOic = 'show info';
        btn.setAttribute('aria-expanded', false);
      } else {
        oic.classList.remove('b-object-image-overlay--img-only');
        btn.dataset.trackingOic = 'hide info';
        btn.setAttribute('aria-expanded', true);
      }
    };

    oic.exit = () => {
      oic.classList.remove('b-object-image-overlay--active');
      document.body.style.overflow = '';
      items.innerHTML = '';
      oic.onclick = null;
    };

    oic.track = (index) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'OIC',
        object: oicSeeds[index].querySelector('figcaption').textContent.trim(),
        museumNumber: JSON.parse(oicSeeds[index].dataset.objectImageOverlay).museumNumber || null,
        status: JSON.parse(oicSeeds[index].dataset.objectImageOverlay).locationType || null,
      });
    };

    oic.buttonInit = (rewind = false) => {
      // disable all buttons and remove all links from tab-index across each of the OIC items
      // then enable buttons and links only for the OIC item currently visible
      Array.from(oic.querySelectorAll('button'), (el) => el.setAttribute('disabled', true));
      Array.from(oic.querySelectorAll('a'), (el) => el.setAttribute('tabindex', '-1'));

      const item = document.querySelectorAll('.b-object-image-overlay__item')[1];

      Array.from(item.querySelectorAll('a'), (el) => el.removeAttribute('tabindex'));
      Array.from(item.querySelectorAll('button'), (el) => el.removeAttribute('disabled'));

      if (oic._index === oicSeeds.length - 1) {
        item.querySelector('.js-object-image-overlay-btn--next').setAttribute('disabled', true);
      }
      if (oic._index === 0) {
        item.querySelector('.js-object-image-overlay-btn--prev').setAttribute('disabled', true);
      }

      // set info toggle
      if (oic.classList.contains('b-object-image-overlay--img-only')) {
        oic.infoToggle(item.querySelector('.js-object-image-overlay-btn--info'), true);
      }

      oic.focusable = item.querySelectorAll('button:enabled, a:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])');

      // set initial focus
      const focusEl = rewind
        ? item.querySelector('.js-object-image-overlay-btn--prev:enabled') || item.querySelector('.js-object-image-overlay-btn--next:enabled') || oic.focusable[0]
        : item.querySelector('.js-object-image-overlay-btn--next:enabled') || item.querySelector('.js-object-image-overlay-btn--prev:enabled') || oic.focusable[0];
      focusEl.focus();
    };

    oic.ontouchstart = (e) => {
      const startXY = [e.touches[0].pageX, e.touches[0].pageY];
      oic.ontouchmove = (e2) => {
        const deltaXY = [e2.touches[0].pageX - startXY[0], e2.touches[0].pageY - startXY[1]];
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

    document.addEventListener('click', (e) => {
      if (e.target.closest('.js-object-image-overlay-item > a')) {
        // open the OIC when a suitable object-card's main link is clicked
        e.preventDefault();

        const seed = e.target.closest('.js-object-image-overlay-item');

        oic._index = oic.getIndex(seed);
        oic.addItem(oic._index);
        oic.classList.add('b-object-image-overlay--active');
        oic.addItem(oic._index + 1);
        oic.addItem(oic._index - 1, true);
        oic.focus();
        oic.buttonInit();
        oic.track(oic._index);
        document.body.style.overflow = 'hidden';
      } else if (e.target.matches('.b-object-image-overlay__item, .b-object-image-overlay__dismiss')) {
        oic.exit();
      } else if (e.target.matches('.js-object-image-overlay-btn--next')) {
        oic.advance();
      } else if (e.target.matches('.js-object-image-overlay-btn--prev')) {
        oic.advance(true);
      } else if (e.target.classList.contains('js-object-image-overlay-btn--info')) {
        oic.infoToggle(e.target);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.target.closest('.b-object-image-overlay')) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          oic.advance(true);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          oic.advance();
        } else if (e.key === 'Escape' || e.key === 'Esc') {
          oic.exit();
        } else if (e.key === 'Tab') {
          // enclose tabbing within the OIC
          const first = oic.focusable[0];
          const last = oic.focusable[oic.focusable.length - 1];
          if (oic.focusable.length) {
            if (e.shiftKey && document.activeElement === first) {
              last.focus();
              e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === last) {
              first.focus();
              e.preventDefault();
            }
          }
        }
      }
    });
  }
};

export default oicInit;
