module.exports = {
  context: {
    icons: [
      'info',
      'close',
      'point-left',
      'point-right',
      'plus',
      'minus'
    ]
  },
  variants: [
    {
      name: 'on-dark',
      label: 'On Dark',
      context: {
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
