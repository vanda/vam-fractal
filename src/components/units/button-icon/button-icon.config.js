module.exports = {
  title: 'Icon Buttons',
  context: {
    previewClass: 'fr-bg--dark',
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
      name: 'light',
      label: 'Light',
      context: {
        modifiers: ['light']
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
