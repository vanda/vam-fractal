/* eslint-disable no-underscore-dangle */
(() => {
  const shuffler = {
    init: (el) => {
      const shufflerData = JSON.parse(el.dataset.objectShuffler);
      const deckTemplate = el.querySelector('.js-object-shuffler__deck');
      const itemTemplate = deckTemplate.firstElementChild.firstElementChild;
      const imgTemplate = itemTemplate.firstElementChild;
      const slideSize = shuffler.setSize(itemTemplate);
      const transitionDurationItem = parseFloat(window.getComputedStyle(itemTemplate).getPropertyValue('transition-duration'));
      const transitionDurationImg = parseFloat(window.getComputedStyle(imgTemplate).getPropertyValue('transition-duration'));
      const deckTabs = el.querySelector('.js-object-shuffler__tabs');

      // clone initial html markup into a full set of decks
      for (let i = 1; i < shufflerData.length; i += 1) {
        const deck = deckTemplate.parentNode.appendChild(deckTemplate.cloneNode(true));
        deck.removeAttribute('active');
      }
      // populate each deck with slides of items
      let i = 0;
      Array.from(el.querySelectorAll('.js-object-shuffler__deck'), (deck) => {
        deck._props = {
          slideSize,
          itemsData: shufflerData[i].data || [],
          itemsDataFeed: shufflerData[i].feed,
          itemsIndex: 0,
          transitionDurationItem,
          transitionDurationImg
        };
        // create deck tab link
        const tabLink = deckTabs.appendChild(document.createElement('a'));
        tabLink.className = 'b-object-shuffler__tab-link';
        tabLink.innerHTML = shufflerData[i].title;
        tabLink.title = `filter by ${shufflerData[i].title}`;
        if (i === 0) { tabLink.setAttribute('active', true); }
        tabLink.onclick = () => {
          deckTabs.querySelector('[active]').removeAttribute('active');
          tabLink.setAttribute('active', true);
          el.querySelector('.js-object-shuffler__deck[active]').removeAttribute('active');
          deck.setAttribute('active', true);
        };
        shuffler.getData(deck)
          .then(() => {
            const slide = deck.firstElementChild;
            // clone initial html markup for an item to make a whole slide
            for (let j = 1; j < slideSize; j += 1) {
              slide.appendChild(itemTemplate.cloneNode(true));
            }
            // next slide transitions require an activating/deactivating pair of slides,
            // plus a next slide ready and waiting (= 3 slides)
            slide.removeAttribute('active');
            const activeSlide = shuffler.newSlide(deck);
            activeSlide.setAttribute('active', true);
            shuffler.newSlide(deck);
          });
        i += 1;
        return true;
      });

      document.addEventListener('click', (e) => {
        if (e.target.closest('.js-object-shuffler__more')) {
          e.preventDefault();
          shuffler.nextSlide(el.querySelector('.js-object-shuffler__deck[active]'));
        }
      }, false);
    },
    setSize: (item) => {
      // number of columns determined by item width * 2 rows
      const cols = Math.floor(
        item.parentNode.getBoundingClientRect().width / item.getBoundingClientRect().width);
      return cols * 2;
    },
    getData: (deck) => {
      // append more data from search API
      if (deck._props.itemsData.length < deck._props.itemsIndex + (2 * deck._props.slideSize)) {
        const dataURI = deck._props.itemsDataFeed.replace(/offset=[^&]+/, `offset=${deck._props.itemsData.length}`);
        const promise = fetch(dataURI)
          .then(response => response.json())
          .then((data) => {
          // deck._props.itemsData = [...deck._props.itemsData, ...data];
            Array.from(data.records, (record) => {
              const imgPath = `https://media.vam.ac.uk/media/thira/collection_images/${record._primaryImageId.substring(0, 6)}/${record._primaryImageId}.jpg`;
              deck._props.itemsData.push(
                {
                  img: {
                    srcset: `${imgPath} 320w, ${imgPath} 640w, ${imgPath} 960w`,
                    src: imgPath,
                    alt: record._primaryTitle
                  },
                  title: record._primaryTitle,
                  href: `http://vam-etc-test.azureedge.net/item/${record.systemNumber}/index.html`
                }
              );
              return true;
            });
          })
          .catch(e => console.error(e.name, e.message)); // eslint-disable-line no-console
        return promise;
      }
      return Promise.resolve(true);
    },
    newSlide: (deck) => {
      // append a new slide by cloning the first and populate with new data
      const slide = deck.appendChild(deck.firstElementChild.cloneNode(true));
      Array.from(slide.children, (item) => {
        const dataIndex = deck._props.itemsIndex % deck._props.itemsData.length;
        const img = item.querySelector('img');
        item.title = deck._props.itemsData[dataIndex].title;
        item.href = deck._props.itemsData[dataIndex].href;
        img.srcset = deck._props.itemsData[dataIndex].img.srcset;
        img.src = deck._props.itemsData[dataIndex].img.src;
        img.alt = deck._props.itemsData[dataIndex].img.alt;
        // scatter effect
        const scaler = Math.random() * 0.1;
        const scale = 1 + ((deck._props.itemsIndex % 2 > 0 ? 1 : -1) * scaler);
        // shift items towards centre to remain in shot
        const slot = (deck._props.itemsIndex % deck._props.slideSize);
        const yDir = slot > (deck._props.slideSize / 2) - 1 ? -1 : 1;
        let xDir = Math.random() > 0.5 ? 1 : -1;
        if (slot === 0 || slot === deck._props.slideSize / 2) {
          // left-hand col
          xDir = 1;
        } else if (slot === (deck._props.slideSize / 2) - 1 || slot === deck._props.slideSize - 1) {
          // right-hand col
          xDir = -1;
        }
        const x = (slot % (deck._props.slideSize / 2)) * (100 / (deck._props.slideSize / 2));
        const y = slot < deck._props.slideSize / 2 ? 0 : 50;
        const aspect = 1 || img.naturalHeight / img.naturalWidth;
        const jitterX = xDir * scaler * 34 * aspect;
        const jitterY = (yDir * scaler * 74) / aspect;
        item.style.width = 'auto';
        item.style.height = `${(scale / aspect) * 50}%`;
        item.style.position = 'absolute';
        item.style.left = `${x + jitterX}%`;
        item.style.top = `${y + jitterY}%`;
        item.style.transitionDuration = `${deck._props.transitionDurationItem * scale * scale}s`;
        img.style.transitionDuration = `${deck._props.transitionDurationImg * scale * scale}s`;
        deck._props.itemsIndex += 1;
        return true;
      });
      shuffler.getData(deck);
      return slide;
    },
    nextSlide: (deck) => {
      shuffler.newSlide(deck);
      deck.firstElementChild.remove();
      const active = deck.querySelector('[active]');
      active.removeAttribute('active');
      active.nextSibling.setAttribute('active', true);
    }
  };

  let observer = null;
  if ('IntersectionObserver' in window) {
    const lazyLoad = ([e]) => {
      if (e.intersectionRatio > 0) {
        const myComponent = e.target;
        observer.unobserve(myComponent);
        if (!myComponent.initialised) {
          shuffler.init(myComponent);
          myComponent.initialised = true;
        }
      }
    };
    observer = new IntersectionObserver(lazyLoad, { rootMargin: '0px 0px 1000px 0px' });
  }

  // lazy load component if possible
  document.addEventListener('DOMContentLoaded', () => {
    Array.from(document.querySelectorAll('.js-object-shuffler'), (myComponent) => {
      try {
        observer.observe(myComponent);
      } catch (e) {
        shuffler.init(myComponent);
      }
      return true;
    });
  }, true);
})();
/* eslint-enable no-underscore-dangle */
