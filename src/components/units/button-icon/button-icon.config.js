module.exports = {
  context: {
    title: 'Button title',
    modifiers: [
      ['close'],
      ['point-left'],
      ['point-right'],
      ['plus'],
      ['minus']
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
      name: 'numeric',
      label: 'Numeric',
      context: {
        title: '101',
        modifiers: [
          'numeric'
        ]
      }
    },
    {
      name: 'custom-example',
      label: 'Custom example',
      context: {
        modifiers: null
      }
    }
  ]
};
