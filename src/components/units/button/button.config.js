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
        text: 'themed button',
        modifiers: ['arrowed'],
        themed: ['background-color', 'border-color', 'background-color--hover', 'border-color--hover']
      }
    },
    {
      name: 'stop',
      label: 'Stop',
      context: {
        text: 'Stop button',
        modifiers: ['stop', 'outlined-inverse', 'micro']
      }
    },
    {
      name: 'pill-light',
      label: 'Pill light',
      context: {
        text: 'Pill light',
        modifiers: ['pill', 'pill-light'],
        previewClass: 'fr-bg--light',
        variants: [
          ['pill', 'pill-light', 'pill-close']
        ]
      }
    },
    {
      name: 'pill-dark',
      label: 'Pill dark',
      context: {
        text: 'Pill dark',
        modifiers: ['pill', 'pill-dark'],
        variants: [
          ['pill', 'pill-dark', 'pill-close']
        ]
      }
    }
  ]
};
