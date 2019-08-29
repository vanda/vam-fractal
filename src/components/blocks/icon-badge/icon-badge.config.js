module.exports = {
  title: 'Icon badge',
  label: 'Icon badge',
  context: {
    action: 'Read',
    icon: 'quote'
  },
  variants: [
    {
      name: 'small',
      context: {
        action: 'Show more',
        icon: 'plus',
        modifiers: ['small']
      }
    },
    {
      name: 'light',
      context: {
        action: 'More events',
        icon: 'plus',
        modifiers: ['light']
      }
    },
    {
      name: 'themed',
      context: {
        action: 'Show more',
        icon: 'plus',
        themed: ['background-color', 'background-color--hover']
      }
    },
    {
      name: 'short icon',
      context: {
        action: 'view',
        icon: 'view',
        modifiers: ['short']
      }
    }
  ]
};
