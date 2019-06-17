/* eslint-disable no-underscore-dangle */
(() => {
  const lightboxSeeds = Array.from(document.querySelectorAll('.js-lightbox-item'));

  if (lightboxSeeds.length) {
    const lightbox = document.querySelector('.b-lightbox') || document.createElement('div');
    document.body.appendChild(lightbox);
    lightbox.classList.add('b-lightbox');
    lightbox.innerHTML = `
      <a class="b-lightbox__dismiss" title="Close" aria-label="Close"></a>
      <div class="b-lightbox__items"></div>
    `;
    const items = lightbox.querySelector('.b-lightbox__items');

    lightbox.addItem = (index, prepend = false) => {
      const seed = lightboxSeeds[index] || lightboxSeeds[0];
      const data = seed.dataset.lightbox ?
        JSON.parse(seed.dataset.lightbox)
        : null;
      const museumNumber = data && data.museumNumber ?
        `Museum number: <span itemprop="identifier">${data.museumNumber}</span>`
        : '';
      const copyright = data && data.copyright ?
        `<br/><span itemprop="copyrightHolder">${data.copyright}</span>`
        : '';
      const numberCopyright = museumNumber || copyright ?
        `<div class="b-lightbox__numbercopyright">
          ${museumNumber}
          ${copyright}
        </div>`
        : '';
      const onDisplay = data && data.onDisplay ?
        '<div class="b-lightbox__location-status">On display</div>'
        : '';
      const location = data && (data.locationSite || data.locationRoom) ?
        `<div class="b-lightbox__location">
          ${onDisplay}
          <div class="b-lightbox__location-site">${data.locationSite}</div>
          <div class="b-lightbox__location-room">${data.locationRoom}</div>
        </div>
        ` : '';
      const hyperlink = seed.querySelector('a').href.length > 1 ?
        `<br/><a class="b-lightbox__link" href="${seed.querySelector('a').href}">Explore object in more depth</a>`
        : '';
      const item = document.createElement('div');
      item.classList.add('b-lightbox__item');
      item.innerHTML += `
        <div class="b-lightbox__content">
          <figure class="b-lightbox__figure">
            <img class="b-lightbox__image"
                 itemprop="contentUrl"
                 alt="${seed.querySelector('img').alt}"
                 sizes="(max-width: 991px) calc(100vw - 20px),
                        (min-width: 992px) calc(70vw - 145px),
                        (min-width: 1200px) 710px"
                 srcset="${seed.querySelector('img').srcset}"
                 src="${seed.querySelector('img').src}">
            <figcaption class="b-lightbox__figcaption">
              ${numberCopyright}
              <div class="b-lightbox__prevnext">
                <a class="b-lightbox__prev b-lightbox__prev--disabled" title="Previous" aria-label="Previous"></a>
                <a class="b-lightbox__next b-lightbox__next--disabled" title="Next" aria-label="Next"></a>
              </div>
            </figcaption>
          </figure>
          <div class="b-lightbox__details">
            <div class="b-lightbox__caption">
              ${seed.querySelector('figcaption').textContent}
              ${hyperlink}
            </div>
            ${location}
          </div>
        </div>
      `;

      if (prepend) {
        items.insertBefore(item, items.firstElementChild);
      } else {
        items.appendChild(item);
      }

      const itemPrev = item.querySelector('.b-lightbox__prev');
      const itemNext = item.querySelector('.b-lightbox__next');
      if (index > 0) {
        itemPrev.classList.remove('b-lightbox__prev--disabled');
      }
      if (index < lightboxSeeds.length - 1) {
        itemNext.classList.remove('b-lightbox__next--disabled');
      }
    };

    lightbox.getIndex = (seed) => {
      const index = lightboxSeeds.findIndex((el) => {
        const match = (el === seed);
        return match;
      });
      return index;
    };

    lightbox.clipItem = (last = false) => {
      if (last) {
        items.lastElementChild.remove();
      } else {
        items.firstElementChild.remove();
      }
    };

    lightbox.advance = (rewind = false) => {
      lightbox.clipItem(rewind);
      lightbox.addItem(lightbox._index + (2 * (rewind ? -1 : 1)), rewind);
      lightbox._index += (1 * (rewind ? -1 : 1));
    };

    document.addEventListener('click', (e) => {
      if (e.target.closest('.js-lightbox-item')) {
        e.preventDefault();
        const seed = e.target.closest('.js-lightbox-item');
        lightbox._index = lightbox.getIndex(seed);
        lightbox.addItem(lightbox._index);
        lightbox.classList.add('b-lightbox--active');
        lightbox.addItem(lightbox._index + 1);
        lightbox.addItem(lightbox._index - 1, true);
        lightbox._width = lightbox.getBoundingClientRect().width;

        lightbox.onclick = (e2) => {
          if (e2.target.matches('.b-lightbox__dismiss')) {
            e2.preventDefault();
            lightbox.classList.remove('b-lightbox--active');
            items.innerHTML = '';
            lightbox.onclick = null;
          } else if (e2.target.matches('.b-lightbox__next')) {
            e2.preventDefault();
            lightbox.advance();
          } else if (e2.target.matches('.b-lightbox__prev')) {
            e2.preventDefault();
            lightbox.advance(true);
          }
        };

        lightbox.ontouchstart = (e2) => {
          const startX = e2.touches[0].pageX;
          lightbox.ontouchmove = (e3) => {
            const deltaX = e3.touches[0].pageX - startX;
            if ((deltaX < 0 && lightbox._index < lightboxSeeds.length - 1)
              || (deltaX > 0 && lightbox._index > 0)) {
              if (Math.abs(deltaX) < 0.2 * lightbox._width) {
                window.requestAnimationFrame(() => {
                  items.style.marginLeft = `${deltaX}px`;
                  items.style.transition = null;
                });
              } else {
                window.requestAnimationFrame(() => {
                  items.style.marginLeft = 0;
                  items.style.transition = 'all .35s';
                });
                lightbox.ontouchmove = null;
                if (deltaX < 0) {
                  lightbox.advance();
                } else {
                  lightbox.advance(true);
                }
              }
            }
          };
          lightbox.ontouchend = () => {
            window.requestAnimationFrame(() => {
              items.style.marginLeft = 0;
              items.style.transition = 'all .35s';
            });
          };
        };
      }
    }, false);
  }
})();
/* eslint-enable no-underscore-dangle */
