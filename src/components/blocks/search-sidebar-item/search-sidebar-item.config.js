module.exports = {
  title: 'Search Sidebar Item',
  label: 'Search Sidebar Item',
  status: 'wip',
  context: {
    image: 'https://vanda-production-assets.s3.amazonaws.com/2017/02/15/12/55/45/01a67413-3cca-454a-ab54-c56b4b62afbb/lockwood-kipling-hero.jpg'
  },
  variants: [
    {
      name: 'default',
      label: 'Default',
      context: {
        default: true,
        title: 'Shop'
      }
    },
    {
      name: 'Short',
      label: 'Short',
      context: {
        default: false,
        modifier: 'short',
        title: 'V&A museum of Childhood'
      }
    }
  ]
};
