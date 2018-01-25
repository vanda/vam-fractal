module.exports = {
  default: 'default',
  title: 'Buttons',
  status: 'wip',
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
        text: 'Read more about this topic',
        modifiers: ['arrowed']
      }
    },
    {
      name: 'black',
      context: {
        text: 'Sign up',
        modifiers: ['black']
      }
    },
    {
      name: 'micro',
      context: {
        text: 'More info',
        modifiers: ['micro'],
        variants: [
          ['micro', 'arrowed'],
          ['micro', 'black'],
          ['micro', 'outlined'],
          ['micro', 'outlined', 'arrowed']
        ]
      }
    },
    {
      name: 'themed',
      context: {
        title: 'themed button',
        text: 'Become a V&A member',
        modifiers: ['arrowed'],
        themed: ['background-color', 'border-color', 'background-color--hover', 'border-color--hover']
      }
    },
    {
      name: 'outlined',
      context: {
        text: 'Book now',
        modifiers: ['outlined'],
        variants: [
          ['outlined', 'arrowed'],
          ['outlined', 'micro'],
          ['outlined--primary', 'arrowed']
        ]
      }
    }
  ]
};
