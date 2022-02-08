module.exports = {
  context: {
    modifier: '100-width',
    previewClass: 'fr-bg--dark'
  },
  variants: [
    {
      name: 'Half width Blog Post',
      label: 'Half width Blog Post',
      context: {
        previewClass: 'fr-bg--dark',
        modifier: '50-width'
      }
    }
  ]
};
