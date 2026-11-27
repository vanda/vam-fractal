module.exports = {
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
      name: 'collapse-home',
      label: 'Collapse Home',
      context: {
        modifier: ['collapse-home']
      }
    }
  ]
};
