/* eslint-disable no-underscore-dangle */
(() => {
  const oicSeeds = Array.from(document.querySelectorAll('.js-object-image-overlay-item'));

  if (oicSeeds.length) {
    const oic = document.querySelector('.b-object-image-overlay') || document.createElement('div');
    document.body.appendChild(oic);
    oic.classList.add('b-object-image-overlay');
    oic.setAttribute('tabindex', 0);
    oic.innerHTML = `
      <a class="b-object-image-overlay__dismiss" title="Close" aria-label="Close"></a>
      <div class="b-object-image-overlay__items"></div>
    `;
    const items = oic.querySelector('.b-object-image-overlay__items');

    oic.addItem = (index, prepend = false) => {
      const seed = oicSeeds[index] || oicSeeds[0];
      const data = seed.dataset.objectImageOverlay ?
        JSON.parse(seed.dataset.objectImageOverlay)
        : null;
      const museumNumber = data && data.museumNumber ?
        `Museum number: <span itemprop="identifier">${data.museumNumber}</span>`
        : '';
      const copyright = data && data.copyright ?
        `<br/><span itemprop="copyrightHolder">${data.copyright}</span>`
        : '';
      const numberCopyright = museumNumber || copyright ?
        `<div class="b-object-image-overlay__numbercopyright">
          ${museumNumber}
          ${copyright}
        </div>`
        : '';
      const onDisplay = data && data.onDisplay ?
        `<div class="b-object-image-overlay__location-status">
          <svg role="img">
            <use xlink:href="/assets/svg/svg-template.svg#on-display"></use>
          </svg>
          On display
        </div>`
        : '';
      let locationCopy = '';
      if (data && data.onDisplay) {
        locationCopy = data.displayOverride;
        if (!locationCopy) {
          const locationSite = data.locationSite ?
            `<div class="b-object-image-overlay__location-site">${data.locationSite}</div>`
            : '';
          const locationRoom = data.locationRoom ?
            data.locationRoom
            : '';
          locationCopy = locationSite + locationRoom;
        }
      } else if (data && data.onDisplay !== null && !data.onDisplay) {
        locationCopy = data.storageOverride || 'This object is currently not on display';
      }
      const visitLink = data && data.visitUrl ?
        `<a class="b-object-image-overlay__visit" href="${data.visitUrl}" data-tracking-oic="visit the object">Find out how to visit this object</a>`
        : '';
      const location = locationCopy || visitLink ?
        `<div class="b-object-image-overlay__location">
          ${onDisplay}
          <div class="b-object-image-overlay__location-copy">${locationCopy}</div>
          ${visitLink}
        </div>
        ` : '';
      const objectUrl = seed.querySelector('a').href;
      const ctaScreen = objectUrl.length > 1 ?
        `<br/><a class="b-object-image-overlay__cta b-object-image-overlay__cta--screen" href="${objectUrl}" data-tracking-oic="explore the object">Explore object in more depth</a>`
        : '';
      const ctaMobile = objectUrl.length > 1 ?
        `<a class="b-object-image-overlay__cta b-object-image-overlay__cta--mobile" href="${objectUrl}" data-tracking-oic="explore the object">Explore object in more depth</a>`
        : '';
      const item = document.createElement('div');
      item.classList.add('b-object-image-overlay__item');
      item.innerHTML += `
        <div class="b-object-image-overlay__content">
          <figure class="b-object-image-overlay__figure">
            <img class="b-object-image-overlay__image"
                 itemprop="contentUrl"
                 alt="${seed.querySelector('img').alt}"
                 sizes="(max-width: 991px) calc(100vw - 20px),
                        (min-width: 992px) calc(70vw - 145px),
                        (min-width: 1200px) 710px"
                 srcset="${seed.querySelector('img').srcset}"
                 src="${seed.querySelector('img').src}">
            <figcaption class="b-object-image-overlay__figcaption">
              ${numberCopyright}
              <div class="b-object-image-overlay__prevnext">
                <a class="b-object-image-overlay__prev b-object-image-overlay__prev--disabled" href="#" title="Previous" aria-label="Previous" data-tracking="previous object">
                  <svg role="img">
                    <use xlink:href="/assets/svg/svg-template.svg#point-left"></use>
                  </svg>
                </a>
                <a class="b-object-image-overlay__next b-object-image-overlay__next--disabled" href="#" title="Next" aria-label="Next" data-tracking="next object">
                  <svg role="img">
                    <use xlink:href="/assets/svg/svg-template.svg#point-right"></use>
                  </svg>
                </a>
              </div>
            </figcaption>
          </figure>
          <div class="b-object-image-overlay__details">
            <div class="b-object-image-overlay__caption">
              ${seed.querySelector('figcaption').textContent}
              ${ctaScreen}
            </div>
            ${location}
            ${ctaMobile}
          </div>
        </div>
      `;

      if (prepend) {
        items.insertBefore(item, items.firstElementChild);
      } else {
        items.appendChild(item);
      }

      const itemPrev = item.querySelector('.b-object-image-overlay__prev');
      const itemNext = item.querySelector('.b-object-image-overlay__next');
      if (index > 0) {
        itemPrev.classList.add('b-object-image-overlay__prev--enabled');
      }
      if (index < oicSeeds.length - 1) {
        itemNext.classList.add('b-object-image-overlay__next--enabled');
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
    };

    oic.track = (index) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'OIC',
        object: oicSeeds[index].querySelector('figcaption').textContent,
        museumNumber: JSON.parse(oicSeeds[index].dataset.objectImageOverlay).museumNumber
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

        const keyHandle = (e3) => {
          if (e3.key === 'ArrowLeft') {
            e3.preventDefault();
            oic.advance(true);
          } else if (e3.key === 'ArrowRight') {
            e3.preventDefault();
            oic.advance();
          }
        };
        document.addEventListener('keydown', keyHandle, false);

        oic.onclick = (e2) => {
          if (e2.target.matches('.b-object-image-overlay__item, .b-object-image-overlay__dismiss')) {
            e2.preventDefault();
            oic.classList.remove('b-object-image-overlay--active');
            items.innerHTML = '';
            oic.onclick = null;
            document.removeEventListener('keydown', keyHandle, false);
          } else if (e2.target.closest('.b-object-image-overlay__next--enabled')) {
            e2.preventDefault();
            oic.advance();
          } else if (e2.target.closest('.b-object-image-overlay__prev--enabled')) {
            e2.preventDefault();
            oic.advance(true);
          }
        };
      }
    }, false);
  }
})();
/* eslint-enable no-underscore-dangle */
