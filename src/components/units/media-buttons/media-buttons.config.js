module.exports = {
  default: 'default',
  title: 'Media Buttons',
  context: {
    previewClass: 'fr-bg--dark',
    text: 'Stop Video'
  },
  variants: [
    {
      name: 'default',
      label: 'Default'
    },
    {
      name: 'overlay',
      label: 'Overlay',
      context: {
        text: null,
        svg: 'close',
        modifiers: ['overlay']
      }
    }
  ]
};
