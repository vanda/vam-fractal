/* eslint-disable no-underscore-dangle */
(() => {
  const shuffler = {
    init: (el) => {
      const shufflerData = JSON.parse(el.dataset.objectShuffler);
      const deckTabs = el.querySelector('.b-object-shuffler__tabs');
      const tabTemplate = deckTabs.removeChild(deckTabs.querySelector('.b-object-shuffler__tab'));
      const deckTemplate = el.querySelector('.b-object-shuffler__deck');
      const itemTemplate = deckTemplate.firstElementChild.firstElementChild;
      const imgTemplate = itemTemplate.firstElementChild;
      const slideSize = shuffler.setSize(itemTemplate);
      const transitionDurationItem = parseFloat(window.getComputedStyle(itemTemplate).getPropertyValue('transition-duration'));
      const transitionDurationImg = parseFloat(window.getComputedStyle(imgTemplate).getPropertyValue('transition-duration'));

      // clone initial html markup into a full set of decks
      for (let i = 1; i < shufflerData.length; i += 1) {
        deckTemplate.parentNode.appendChild(deckTemplate.cloneNode(true));
      }
      let i = 0;
      Array.from(el.querySelectorAll('.b-object-shuffler__deck'), (deck) => {
        // store deck data
        deck._props = {
          deckTitle: shufflerData[i].title,
          slideSize,
          itemsData: shufflerData[i].data || [],
          itemsDataFeed: shufflerData[i].feed,
          itemsIndex: 0,
          transitionDurationItem,
          transitionDurationImg
        };

        // setup each deck
        shuffler.getData(deck)
          .then(() => {
            // abandon deck if there weren't enough results
            if (deck._props.itemsData.length < slideSize * 1.5) {
              deck.parentNode.removeChild(deck);
              return false;
            }
            // create deck tab
            const deckTab = deckTabs.appendChild(tabTemplate.cloneNode(true));
            deckTab.className = 'b-object-shuffler__tab';
            deckTab.innerHTML = deck._props.deckTitle;
            deckTab.title = `filter by ${deck._props.deckTitle}`;
            deckTab.setAttribute('tabindex', '0');
            deckTab._deck = deck;
            if (deckTab === deckTab.parentNode.firstElementChild) {
              deckTab.setAttribute('active', true);
              deckTab._deck.setAttribute('active', true);
            }
            // populate each deck with slides of items
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
            // allow visible elements into the tabindex
            if (activeSlide.closest('.b-object-shuffler__deck[active]')) {
              shuffler.tabIndexSlide(activeSlide, '0');
            }
          });
        i += 1;
        return true;
      });

      document.addEventListener('click', (e) => {
        if (e.target.closest('.b-object-shuffler__tab')) {
          const deckTab = e.target;
          const activeTab = deckTabs.querySelector('[active]');
          if (activeTab) {
            activeTab.removeAttribute('active');
            activeTab._deck.removeAttribute('active');
            shuffler.tabIndexSlide(activeTab._deck.querySelector('.b-object-shuffler__slide[active]'), '-1');
          }
          deckTab.setAttribute('active', true);
          deckTab._deck.setAttribute('active', true);
          shuffler.tabIndexSlide(deckTab._deck.querySelector('.b-object-shuffler__slide[active]'), '0');
        } else if (e.target.closest('.b-object-shuffler__more')) {
          e.preventDefault();
          shuffler.nextSlide(el.querySelector('.b-object-shuffler__deck[active]'));
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
      const dataSize = 2 * deck._props.slideSize;
      if (deck._props.itemsData.length < deck._props.itemsIndex + dataSize) {
        const dataURI = `${deck._props.itemsDataFeed}&page_size=${dataSize}&page=${deck._props.itemsData.length / dataSize}`;
        const promise = fetch(dataURI)
          .then(response => response.json())
          .then((data) => {
          // deck._props.itemsData = [...deck._props.itemsData, ...data];
            Array.from(data.records, (record) => {
              const imgPath = `https://media.vam.ac.uk/media/thira/collection_images/${record._primaryImageId.substring(0, 6)}/${record._primaryImageId}.jpg`;
              const title = record._primaryTitle || `untitled ${record.objectType}`;
              deck._props.itemsData.push(
                {
                  img: {
                    srcset: `${imgPath} 320w, ${imgPath} 640w, ${imgPath} 960w`,
                    src: imgPath,
                    alt: title
                  },
                  title,
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
        item.tabindex = '-1';
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
        item.style.setProperty('--js-rotation', `${Math.sin((Math.random() * 2 * Math.PI)) * 5}deg`);
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
      const activeSlide = deck.querySelector('[active]');
      activeSlide.removeAttribute('active');
      shuffler.tabIndexSlide(activeSlide, '-1');
      activeSlide.nextSibling.setAttribute('active', true);
      shuffler.tabIndexSlide(activeSlide.nextSibling, '0');
    },
    tabIndexSlide: (slide, tabIndex) => {
      Array.from(slide.children, item => item.setAttribute('tabindex', tabIndex));
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
