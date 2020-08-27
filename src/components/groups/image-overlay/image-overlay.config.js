module.exports = {
  title: 'Image Overlay',
  label: 'Image Overlay',
  variants: [
    {
      name: 'default',
      label: 'Default',
      context: {}
    },
    {
      name: 'Cultural Sensitive Image',
      label: 'Cultural Sensitive Image',
      context: {
        offensive_image: true
      }
    }
  ]
};
