module.exports = {
  title: 'Accordion',
  context: {
    previewClass: 'fr-padded'
  },
  variants: [
    {
      name: 'dark',
      label: 'Dark',
      context: {
        lightDarkTheme: 's-light-dark-theme--dark'
      }
    },
    {
      name: 'modal',
      label: 'Modal',
      context: {
        modifier: ['modal']
      }
    }
  ]
};
