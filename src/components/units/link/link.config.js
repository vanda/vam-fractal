module.exports = {
  default: 'link',
  title: 'Links',
  context: {
    text: 'Link'
  },
  variants: [
    {
      name: 'link',
      label: 'Link',
      context: {
        inBody: true
      }
    },
    {
      name: 'border',
      label: 'With border',
      context: {
        text: 'The following link is for use as a stand alone element',
        modifiers: ['border']
      }
    },
    {
      name: 'arrow',
      label: 'With arrow',
      context: {
        arrowed: true,
        text: 'The following link is for use as a stand alone element',
        modifiers: ['arrow', 'border']
      }
    },
    {
      name: 'arrowed',
      label: 'arrowed',
      context: {
        text: 'The following link is for use as a stand alone element',
        modifiers: ['arrowed']
      }
    },
    {
      name: 'external',
      label: 'External',
      context: {
        external: true,
        text: 'The following link is for use as a stand alone element',
        modifiers: ['border']
      }
    }
  ]
};
