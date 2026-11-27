module.exports = {
  default: 'default',
  title: 'Buttons',
  context: {
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
        modifiers: ['black']
      }
    },
    {
      name: 'white',
      context: {
        modifiers: ['white'],
        previewClass: 'fr-bg--dark'
      }
    },
    {
      name: 'grey',
      context: {
        modifiers: ['grey']
      }
    },
    {
      name: 'grey-on-dark',
      label: 'Grey on Dark',
      context: {
        modifiers: ['grey'],
        lightDarkTheme: 's-light-dark-theme--dark'
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
          ['micro', 'grey'],
          ['micro', 'outlined', 'arrowed']
        ]
      }
    },
    {
      name: 'outlined',
      context: {
        text: 'Book now',
        modifiers: ['outlined'],
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
        previewClass: 'fr-bg--dark',
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
      name: 'pill',
      context: {
        text: 'Pill',
        modifiers: ['pill'],
        previewClass: 'fr-bg--dark',
        variants: [
          ['pill', 'pill-active'],
          ['pill', 'pill-close'],
          ['pill', 'pill-dark'],
          ['pill', 'pill-dark', 'pill-active'],
          ['pill', 'pill-dark', 'pill-close']
        ]
      }
    }
  ]
};
