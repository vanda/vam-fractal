module.exports = {
  title: 'Card',
  context: {
    cardUrl: 'https://www.vam.ac.uk/exhibitions/pink-floyd',
    cardTitle: 'The Leman Album: an enhanced facsimile',
    cardDescription: 'This 18th-century volume contains Europe\'s earliest dated silk designs – close to 100 astonishingly vibrant drawings on paper.',
    cardImage: {
      320: 'https://framemark.vam.ac.uk/collections/2020MP2543/full/320,/0/default.jpg',
      640: 'https://framemark.vam.ac.uk/collections/2020MP2543/full/640,/0/default.jpg',
      960: 'https://framemark.vam.ac.uk/collections/2020MP2543/full/960,/0/default.jpg',
      1280: 'https://framemark.vam.ac.uk/collections/2020MP2543/full/1280,/0/default.jpg',
      1920: 'https://framemark.vam.ac.uk/collections/2020MP2543/full/1920,/0/default.jpg',
      2560: 'https://framemark.vam.ac.uk/collections/2020MP2543/full/2560,/0/default.jpg'
    },
  },
  variants: [
    {
      name: 'Labelled',
      context: {
        labelled: true
      }
    },
  ]
};
