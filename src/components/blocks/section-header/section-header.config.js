module.exports = {
  title: 'Section header',
  label: 'Section header',
  context: {
    previewClass: 'fr-content-wrapper fr-bg--dark',
    title: 'Section header'
  },
  variants: [
    {
      name: 'Transparent',
      label: 'Transparent',
      context: {
        modifiers: ['transparent']
      }
    },
    {
      name: 'Transparent compact',
      label: 'Transparent compact',
      context: {
        modifiers: ['compact', 'transparent']
      }
    }
  ]
};
