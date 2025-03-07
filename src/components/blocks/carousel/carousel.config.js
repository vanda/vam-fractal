module.exports = {
  title: 'Carousel',
  label: 'Carousel',
  context: {
    previewClass: 'fr-content-wrapper',
  },
  variants: [
    {
      name: 'On Dark',
      label: 'On Dark',
      context: {
        previewClass: 'fr-content-wrapper fr-bg--dark',
        lightDarkTheme: 's-light-dark-theme--dark'
      }
    },
    {
      name: 'Unclipped',
      label: 'Unclipped',
      context: {
        modifiers: ['unclipped']
      }
    }
  ]
};
