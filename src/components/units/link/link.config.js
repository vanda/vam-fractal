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
      name: 'arrowed',
      label: 'Arrowed',
      context: {
        text: 'The following link is for use as a stand alone element',
        modifiers: ['arrowed']
      }
    },
    {
      name: 'section',
      label: 'Section',
      context: {
        section: true,
        text: 'The following link is for use as a page section stand alone element (hover/focus for pilcrow)'
      }
    }
  ]
};
