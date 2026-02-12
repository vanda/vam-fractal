module.exports = {
  context: {
    title: 'Button title',
    icons: [
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
        modifiers: ['numeric'],
        icons: [1]
      }
    },
    {
      name: 'outline',
      label: 'Outline',
      context: {
        modifiers: ['outline']
      }
    },
    {
      name: 'outline--on-dark',
      label: 'Outline On Dark',
      context: {
        lightDarkTheme: 's-light-dark-theme--dark',
        modifiers: ['outline']
      }
    },
    {
      name: 'custom-example',
      label: 'Custom example',
      context: {
        modifiers: null,
        icons: null
      }
    }
  ]
};
