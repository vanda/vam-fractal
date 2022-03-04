module.exports = {
  default: 'default',
  title: 'Buttons',
  context: {
    previewClass: 'fr-bg--dark',
    text: 'Click me'
  },
  variants: [
    {
      name: 'default',
      label: 'Default'
    },
    {
      name: 'arrowed',
      label: 'Arrowed',
      context: {
        modifiers: ['arrowed']
      }
    },
    {
      name: 'black',
      context: {
        modifiers: ['black'],
        previewClass: 'fr-bg--light'
      }
    },
    {
      name: 'white',
      context: {
        modifiers: ['white']
      }
    },
    {
      name: 'micro',
      context: {
        modifiers: ['micro'],
        variants: [
          ['micro', 'arrowed'],
          ['micro', 'black'],
          ['micro', 'white'],
          ['micro', 'outlined', 'arrowed']
        ]
      }
    },
    {
      name: 'outlined',
      context: {
        text: 'Book now',
        modifiers: ['outlined'],
        previewClass: 'fr-bg--light',
        variants: [
          ['outlined', 'arrowed'],
          ['outlined', 'micro']
        ]
      }
    },
    {
      name: 'outlined-inverse',
      context: {
        text: 'Book now',
        modifiers: ['outlined-inverse'],
        variants: [
          ['outlined-inverse', 'arrowed'],
          ['outlined-inverse', 'micro']
        ]
      }
    },
    {
      name: 'themed',
      context: {
        title: 'themed button',
        modifiers: ['arrowed'],
        themed: ['background-color', 'border-color', 'background-color--hover', 'border-color--hover']
      }
    }
  ]
};
