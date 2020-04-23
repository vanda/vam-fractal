/* eslint-disable no-underscore-dangle */
(() => {
  // dummy Collections API response
  const collsAPISet = [
    {
      img: {
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2017/09/11/14/24/31/13ac4def-8ac7-4010-b324-a5aa912b937c/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2017/09/11/14/24/32/0e7fcce2-2324-42bf-8935-382774cacc6f/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2017/09/11/14/24/32/ea04e92d-1921-4289-8382-4fc85d418242/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2017/09/11/14/24/31/13ac4def-8ac7-4010-b324-a5aa912b937c/640.jpg',
        alt: 'poster'
      },
      title: 'Job, poster, by Alphonse Mucha, 1898',
      href: 'https://collections.vam.ac.uk/item/O1041839'
    },
    {
      img: {
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/09/16/53/08/ad9a19be-ecbf-40a6-ac40-9a7904be18ac/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/09/16/53/08/d6aae297-8b1f-4194-8884-821d88c06e92/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/09/16/53/08/dead0a66-e25d-4a56-bedb-897f071527ca/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/09/16/53/08/ad9a19be-ecbf-40a6-ac40-9a7904be18ac/640.jpg',
        alt: 'poster'
      },
      title: 'Colour screenprint poster advertising bands performing at the UFO Club, London, designed by Michael English, published by Osiris Visions Ltd, 1967, UK',
      href: 'https://collections.vam.ac.uk/item/O75996'
    },
    {
      img: {
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/14/08/9883e646-ba00-4935-8c0f-69ec9590d316/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/14/08/5ec8f12b-7ff3-47ad-8551-0fbddfa30a46/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/14/08/07d026c4-e3c9-4bee-ace8-c7a85408a46c/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/14/08/9883e646-ba00-4935-8c0f-69ec9590d316/640.jpg',
        alt: 'poster'
      },
      title: 'Jane Avril au Jardin de Paris, lithograph poster, by Henri de Toulouse-Lautrec, 1893, Paris, France',
      href: 'https://collections.vam.ac.uk/item/O80097'
    },
    {
      img: {
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/10/14/37/55/f84a004c-8c0b-4f64-a017-a73048b255e6/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/10/14/37/55/ed5bec14-0538-4640-bc42-a3f95193c16e/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/10/14/37/55/db8c2d96-8894-4d9b-a67d-5e566af1870d/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/10/14/37/55/f84a004c-8c0b-4f64-a017-a73048b255e6/640.jpg',
        alt: 'poster'
      },
      title: 'Colour lithograph poster advertising La Loïe Fuller at the Folies-Bergère, by Jules Chéret, printed by Imprimerie Chaix, Ateliers Cherét, 1893, Paris, France',
      href: 'https://collections.vam.ac.uk/item/O75604'
    },
    {
      img: {
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/10/14/46/48/7ef4dba2-6810-4b1c-ba5e-8d5089b0358e/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/10/14/46/48/50fde484-13e4-4e94-a44f-2765ef4a5d21/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/10/14/46/48/85961b53-60c9-4888-ab3f-6db107f9ede1/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/10/14/46/48/7ef4dba2-6810-4b1c-ba5e-8d5089b0358e/640.jpg',
        alt: 'poster'
      },
      title: 'Colour lithograph poster advertising the Nord Express train from Paris to Riga, by Adolphe Mouron Cassandre, 1927, France',
      href: 'https://collections.vam.ac.uk/item/O89673'
    },
    {
      img: {
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/16/48/9e27ff60-b001-47a7-9b38-e7cbd8f2bfbb/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/16/48/19d0ee74-b1d7-4c42-9616-1864e7820d0d/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/16/48/64d9bf6e-3646-42aa-9f83-a4c5f35b0869/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/16/48/9e27ff60-b001-47a7-9b38-e7cbd8f2bfbb/640.jpg',
        alt: 'poster'
      },
      title: 'On vous intoxique!',
      href: 'https://collections.vam.ac.uk/item/O1009940'
    },
    {
      img: {
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/10/11/18/23/349a214c-eb66-4b5c-aaff-1ce4b208ff08/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/10/11/18/23/e5a8f45d-dee6-4313-b336-89a87e1c3712/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/10/11/18/23/2666351f-723c-42b0-b001-8458a1943d26/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/10/11/18/23/349a214c-eb66-4b5c-aaff-1ce4b208ff08/640.jpg',
        alt: 'poster'
      },
      title: 'Colour lithograph poster for East Coast Resorts by L.N.E.R., by Tom Purvis, about 1925, UK',
      href: 'https://collections.vam.ac.uk/item/O74426'
    },
    {
      img: {
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/18/57/6337a7e7-b31f-4868-b639-d5649222337c/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/18/57/f25f08ff-04c9-49f9-9c4c-32bae7b20e43/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/18/57/d1f281ec-7a91-4e55-8de3-4860f6ea9920/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/18/57/6337a7e7-b31f-4868-b639-d5649222337c/640.jpg',
        alt: 'poster'
      },
      title: 'Down with US imperialism, Down with Soviet revisionism, screenprint, by students from Xian University, 1967, China',
      href: 'https://collections.vam.ac.uk/item/O1245593'
    },
    {
      img: {
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/17/12/58/30bb5959-ecd5-489d-a068-201df9256f92/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/17/12/58/b4229347-68a1-447a-8d2a-858699f7aa8a/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/17/12/58/6a17dde3-ad4c-4c5e-bd0b-84a829ef2b0e/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/17/12/58/b4229347-68a1-447a-8d2a-858699f7aa8a/640.jpg',
        alt: 'poster'
      },
      title: 'Men who mean business read the Financial Times every day, lithograph poster, designed by Abram Games, 1952, UK',
      href: 'https://collections.vam.ac.uk/item/O1043107'
    },
    {
      img: {
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/12/07/05/6e119631-2766-469f-b414-6e2e67fa5d0a/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/12/07/06/c895bdbb-76df-415a-8299-117d06c296d4/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/12/07/06/97c070f9-c32c-4fdf-8158-91288bbb2a3f/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/12/07/06/c895bdbb-76df-415a-8299-117d06c296d4/640.jpg',
        alt: 'poster'
      },
      title: 'Keep Smiling. Guinness Is Good For You, lithograph poster, by John Gilroy, about 1939 – 45, UK',
      href: 'https://collections.vam.ac.uk/item/O74417'
    },
    {
      img: {
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/31/43/fd788d06-0840-4c9b-9ad8-24c6afa40fc7/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/31/43/47264e4a-2496-425b-ab3a-4ed727bf17f7/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/31/43/e6d27a20-9309-4b39-a0a6-15727b1ed43e/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/31/43/47264e4a-2496-425b-ab3a-4ed727bf17f7/640.jpg',
        alt: 'poster'
      },
      title: 'Lithograph poster for Tropon powdered eggs, by Henry van de Velde, 1898, Belgium',
      href: 'https://collections.vam.ac.uk/item/O74080'
    }
  ];

  const shuffler = {
    init: (el) => {
      el._props = {
        viewer: el.querySelector('.js-object-shuffler__viewer'),
        slideSize: 4,
        itemsData: [],
        itemsIndex: 0,
        transitionDuration: 0
      };
      shuffler.setSize(el);
      shuffler.getData(el);
      const slide = el._props.viewer.firstElementChild;
      // clone initial html markup for an item to make a whole slide
      const itemTemplate = slide.firstElementChild;
      el._props.transitionDuration = parseFloat(window.getComputedStyle(itemTemplate).getPropertyValue('transition-duration'));
      for (let i = 2; i <= el._props.slideSize; i += 1) {
        slide.appendChild(itemTemplate.cloneNode(true));
      }
      // next slide transitions require an activating/deactivating pair of slides,
      // plus a next slide ready and waiting (= 3 slides)
      slide.removeAttribute('active');
      const activeSlide = shuffler.newSlide(el);
      activeSlide.setAttribute('active', true);
      shuffler.newSlide(el);

      document.addEventListener('click', (e) => {
        if (e.target.closest('.js-object-shuffler__more')) {
          e.preventDefault();
          shuffler.nextSlide(el);
        }
      }, false);
    },
    setSize: (el) => {
      // number of columns determined by item width * 2 rows
      const slide = el._props.viewer.firstElementChild;
      el._props.slideSize = 2 * Math.floor(
        slide.getBoundingClientRect().width / slide.firstElementChild.getBoundingClientRect().width);
    },
    getData: (el) => {
      // append more data from search API
      while (el._props.itemsData.length < el._props.itemsIndex + el._props.slideSize) {
        el._props.itemsData = [...el._props.itemsData, ...collsAPISet];
      }
    },
    newSlide: (el) => {
      // append a new slide by cloning the first and populate with new data
      const slide = el._props.viewer.appendChild(el._props.viewer.firstElementChild.cloneNode(true));
      Array.from(slide.children, (item) => {
        const img = item.querySelector('img');
        item.title = el._props.itemsData[el._props.itemsIndex].title;
        item.href = el._props.itemsData[el._props.itemsIndex].href;
        img.srcset = el._props.itemsData[el._props.itemsIndex].img.srcset;
        img.src = el._props.itemsData[el._props.itemsIndex].img.src;
        img.alt = el._props.itemsData[el._props.itemsIndex].img.alt;
        // scatter effect
        const scaler = Math.random() * 0.23;
        const scale = 1 + ((el._props.itemsIndex % 2 > 0 ? 1 : -1) * scaler);
        // shift items towards centre to remain in shot
        const slot = (el._props.itemsIndex % el._props.slideSize);
        const yDir = slot > (el._props.slideSize / 2) - 1 ? -1 : 1;
        let xDir = Math.random() > 0.5 ? 1 : -1;
        if (slot === 0 || slot === el._props.slideSize / 2) {
          // left-hand col
          xDir = 1;
        } else if (slot === (el._props.slideSize / 2) - 1 || slot === el._props.slideSize - 1) {
          // right-hand col
          xDir = -1;
        }
        const x = (slot % (el._props.slideSize / 2)) * (100 / (el._props.slideSize / 2));
        const y = slot < el._props.slideSize / 2 ? 0 : 50;
        const aspect = 1 || img.naturalHeight / img.naturalWidth;
        const jitterX = xDir * scaler * 23 * aspect;
        const jitterY = (yDir * scaler * 23) / aspect;
        item.style.width = 'auto';
        item.style.height = `${scale * 50}%`;
        item.style.position = 'absolute';
        item.style.left = `${x + jitterX}%`;
        item.style.top = `${y + jitterY}%`;
        item.style.transitionDuration = `${el._props.transitionDuration * scale * scale}s`;
        el._props.itemsIndex += 1;
        return true;
      });
      shuffler.getData(el);
      return slide;
    },
    nextSlide: (el) => {
      shuffler.newSlide(el);
      el._props.viewer.firstElementChild.remove();
      const active = el._props.viewer.querySelector('[active]');
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
    observer = new IntersectionObserver(lazyLoad, { rootMargin: '0px 0px 500px 0px' });
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
