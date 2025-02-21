module.exports = {
  title: 'Icon Buttons',
  context: {
    label: 'Button label',
    icons: [
      'close',
      'point-left',
      'point-right',
      'plus',
      'minus'
    ]
  },
  variants: [
    {
      name: 'On Dark',
      label: 'On Dark',
      context: {
        previewClass: 'fr-bg--dark',
        lightDarkTheme: 's-light-dark-theme--dark'
      }
    },
    {
      name: 'custom-example',
      label: 'Custom example',
      context: {
        custom_example: true
      }
    }
  ]
};
