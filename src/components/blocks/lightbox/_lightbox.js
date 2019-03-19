(() => {
  const lightboxSeeds = Array.from(document.querySelectorAll('.js-lightbox-item'));

  if (lightboxSeeds.length) {
    const lightbox = document.querySelector('.b-lightbox') || document.createElement('div');
    document.body.appendChild(lightbox);
    lightbox.classList.add('b-lightbox');
    lightbox.innerHTML = `
      <a class="b-lightbox__dismiss" title="Close" aria-label="Close"></a>
      <div class="b-lightbox__items">
      </div>
    `;
    const items = lightbox.querySelector('.b-lightbox__items');

    lightbox.addItem = (seed, prepend = false) => {
      const data = seed.dataset.lightbox ?
        JSON.parse(seed.dataset.lightbox.replace(/`/g, '"'))
        : null;
      const credit = data && data.credit ?
        `Museum number: <span itemprop="identifier">${data.credit}</span>`
        : '';
      const copyright = data && data.copyright ?
        `<br/><span itemprop="copyrightHolder">${data.copyright}</span>`
        : '';
      const creditcopyright = credit || copyright ?
        `<div class="b-lightbox__creditcopyright">
          ${credit}
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
              ${creditcopyright}
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
        items.insertBefore(item, items.firstChild);
      } else {
        items.appendChild(item);
      }

      const index = lightbox.index(seed);
      const seedPrev = lightboxSeeds[index - 2] || seed;
      const seedNext = lightboxSeeds[index + 2] || seed;
      const itemPrev = item.querySelector('.b-lightbox__prev');
      const itemNext = item.querySelector('.b-lightbox__next');
      itemPrev.lightboxSeed = seedPrev;
      itemNext.lightboxSeed = seedNext;
      if (index > 0) {
        itemPrev.classList.remove('b-lightbox__prev--disabled');
      }
      if (index < lightboxSeeds.length - 1) {
        itemNext.classList.remove('b-lightbox__next--disabled');
      }
    };

    lightbox.index = (seed) => {
      const index = lightboxSeeds.findIndex((el) => {
        const match = (el === seed);
        return match;
      });
      return index;
    };

    lightbox.clipItem = (last = false) => {
      if (last) {
        lightbox.querySelector('.b-lightbox__item:last-child').remove();
      } else {
        lightbox.querySelector('.b-lightbox__item:first-child').remove();
      }
    };

    document.addEventListener('click', (e) => {
      if (e.target.closest('.js-lightbox-item')) {
        e.preventDefault();
        const seed = e.target.closest('.js-lightbox-item');
        lightbox.classList.add('b-lightbox--active');
        lightbox.addItem(seed);
        lightbox.addItem(lightboxSeeds[lightbox.index(seed) + 1] || seed);
        lightbox.addItem(lightboxSeeds[lightbox.index(seed) - 1] || seed, true);

        lightbox.addEventListener('click', (e) => {
          if (e.target.matches('.b-lightbox__dismiss')) {
            e.preventDefault();
            lightbox.classList.remove('b-lightbox--active');
            items.innerHTML = '';
            items.classList.remove('b-lightbox__items--reverse');
          } else if (e.target.matches('.b-lightbox__prev')) {
            e.preventDefault();
            lightbox.clipItem(true);
            lightbox.addItem(e.target.lightboxSeed, true);
          } else if (e.target.matches('.b-lightbox__next')) {
            e.preventDefault();
            lightbox.clipItem();
            lightbox.addItem(e.target.lightboxSeed);
          }
        });
      }
    }, false);
  }
})();
