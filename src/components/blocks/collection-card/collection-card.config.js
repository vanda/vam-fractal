module.exports = {
  title: 'Collection card',
  label: 'Collection card',
  context: {
    collectionUrl: '//www.vam.ac.uk/collections/gilbert-collection',
    collectionTitle: 'The Gilbert Collection',
    collectionImage: {
      240: '//vanda-production-assets.s3.amazonaws.com/2016/12/22/15/13/52/f52e5b82-55a4-4bce-8720-ad914e3e0b9f/2009CR4310_poster.jpg',
      500: '//vanda-production-assets.s3.amazonaws.com/2016/12/22/15/13/52/093a0d4b-ef61-4a3a-8124-c1d6ca993dc0/2009CR4310_poster.jpg'
    }
  },
  variants: [
    {
      name: 'Transparent',
      label: 'Transparent',
      context: {
        modifiers: ['transparent']
      }
    }
  ]
};
