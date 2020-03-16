(() => {
  // dummy Collections API response
  const collsAPISet = [
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
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/10/11/18/23/349a214c-eb66-4b5c-aaff-1ce4b208ff08/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/10/11/18/23/e5a8f45d-dee6-4313-b336-89a87e1c3712/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/10/11/18/23/2666351f-723c-42b0-b001-8458a1943d26/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/10/11/18/23/349a214c-eb66-4b5c-aaff-1ce4b208ff08/640.jpg',
        alt: 'poster'
      },
      title: 'Colour lithograph poster for East Coast Resorts by L.N.E.R., by Tom Purvis, about 1925, UK',
      href: 'https://collections.vam.ac.uk/item/O74426'
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
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/10/14/37/55/f84a004c-8c0b-4f64-a017-a73048b255e6/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/10/14/37/55/ed5bec14-0538-4640-bc42-a3f95193c16e/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/10/14/37/55/db8c2d96-8894-4d9b-a67d-5e566af1870d/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/10/14/37/55/f84a004c-8c0b-4f64-a017-a73048b255e6/640.jpg',
        alt: 'poster'
      },
      title: 'Colour lithograph poster advertising La Loïe Fuller at the Folies-Bergère, by Jules Chéret, printed by Imprimerie Chaix, Ateliers Cherét, 1893, Paris, France',
      href: 'https://collections.vam.ac.uk/item/O75604'
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
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/16/48/9e27ff60-b001-47a7-9b38-e7cbd8f2bfbb/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/16/48/19d0ee74-b1d7-4c42-9616-1864e7820d0d/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/16/48/64d9bf6e-3646-42aa-9f83-a4c5f35b0869/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/16/48/9e27ff60-b001-47a7-9b38-e7cbd8f2bfbb/640.jpg',
        alt: 'poster'
      },
      title: 'https://collections.vam.ac.uk/item/O1009940',
      href: 'https://collections.vam.ac.uk/item/O1009940'
    },
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
        srcset: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/18/57/6337a7e7-b31f-4868-b639-d5649222337c/320.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/18/57/f25f08ff-04c9-49f9-9c4c-32bae7b20e43/640.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/18/57/d1f281ec-7a91-4e55-8de3-4860f6ea9920/960.jpg 960w',
        src: 'https://vanda-production-assets.s3.amazonaws.com/2019/01/14/11/18/57/6337a7e7-b31f-4868-b639-d5649222337c/640.jpg',
        alt: 'poster'
      },
      title: 'Down with US imperialism, Down with Soviet revisionism, screenprint, by students from Xian University, 1967, China',
      href: 'https://collections.vam.ac.uk/item/O1245593'
    }
  ];

  const shuffler = {
    init: (el) => {
      el._state = {
        size: 4,
        itemsData: [],
        itemsDataId: 0
      };
      shuffler.setSize(el);
      shuffler.getData(el);
      const slide = el.querySelector('.js-object-shuffler__viewer').children[0];
      const blank = slide.children[0];
      for (let i = 2; i <= el._state.size; i += 1) {
        slide.appendChild(blank.cloneNode(true));
      }
      shuffler.newSlide(el);
      slide.remove();
      shuffler.newSlide(el);
    },
    setSize: (el) => {
      // number of columns determined by item width * 2 rows
      const slide = el.querySelector('.js-object-shuffler__viewer').children[0];
      el._state.size = 2 * Math.floor(
        slide.getBoundingClientRect().width / slide.children[0].getBoundingClientRect().width);
    },
    getData: (el) => {
      // fetch data from search API
      el._state.itemsData = [...el._state.itemsData, ...collsAPISet];
    },
    newSlide: (el) => {
      // clone a new slide from the first and load it up
      const viewer = el.querySelector('.js-object-shuffler__viewer');
      const slide = viewer.appendChild(viewer.children[0].cloneNode(true));
      Array.from(slide.children, (item) => {
        item.title = el._state.itemsData[el._state.itemsDataId].title;
        item.href = el._state.itemsData[el._state.itemsDataId].href;
        item.querySelector('img').srcset = el._state.itemsData[el._state.itemsDataId].img.srcset;
        item.querySelector('img').src = el._state.itemsData[el._state.itemsDataId].img.src;
        item.querySelector('img').alt = el._state.itemsData[el._state.itemsDataId].img.alt;
        el._state.itemsDataId += 1;
        return true;
      });
      if (el._state.itemsData.length - el._state.itemsDataId < el._state.size) {
        shuffler.getData(el);
      }
    },
    nextSlide: (el) => {
      shuffler.newSlide(el);
      // el.querySelector('.js-object-shuffler__viewer').children[0].remove();
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