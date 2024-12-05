module.exports = {
  title: 'List Promotion',
  label: 'List Promotion',
  context: {
    promoTitle: 'Order an Object',
    promoDescription: 'Information about the service. Lorem ipsum dolor sit amet consectetur...',
    urlPrimary: {
      url: 'https://www.vam.ac.uk',
      text: 'Choose your objects'
    },
    urlSecondary: {
      url: 'https://www.vam.ac.uk',
      text: 'Read more'
    },
    promoItems: [
      {
        listText: 'Choose your objects',
        listIcon: 'object',
        image: {
          320: 'https://picsum.photos/id/51/320/240',
          640: 'https://picsum.photos/id/51/640/480',
          960: 'https://picsum.photos/id/51/960/720',
          1280: 'https://picsum.photos/id/51/1280/960'
        },
      },
      {
        listText: 'Decide when you visit',
        listIcon: 'calendar',
        image: {
          320: 'https://picsum.photos/id/44/320/240',
          640: 'https://picsum.photos/id/44/640/480',
          960: 'https://picsum.photos/id/44/960/720',
          1280: 'https://picsum.photos/id/44/1280/960'
        },
      },
      {
        listText: 'Book a free appointment',
        listIcon: 'clock',
        image: {
          320: 'https://picsum.photos/id/47/320/240',
          640: 'https://picsum.photos/id/47/640/480',
          960: 'https://picsum.photos/id/47/960/720',
          1280: 'https://picsum.photos/id/47/1280/960'
        },
      },
      {
        listText: 'Arrive at your venue',
        listIcon: 'pin',
        image: {
          320: 'https://picsum.photos/id/130/320/240',
          640: 'https://picsum.photos/id/130/640/480',
          960: 'https://picsum.photos/id/130/960/720',
          1280: 'https://picsum.photos/id/130/1280/960'
        },
      }
    ] 
  },
  variants: [
    {
      name: 'on-dark',
      label: 'On dark',
      context: {
        previewClass: 'fr-bg--dark',
        modifier: ['dark']
      }
    }
  ]
};
