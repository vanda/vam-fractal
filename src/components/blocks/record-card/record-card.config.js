module.exports = {
  title: 'Record Card',
  context: {
    previewClass: 'fr-bg--dark fr-content-edge-space',
    image: {
      320: 'https://picsum.photos/id/25/320/240',
      640: 'https://picsum.photos/id/25/640/480',
    },
    heading: 'Vivien Leigh Archive',
    date: '1925-1967',
    reference: 'THM/433',
    extent: '90 Boxes',
  },
  variants: [
    {
      name: 'dark',
      label: 'Dark',
      context: {
        lightDarkTheme: 's-light-dark-theme--dark',
        previewClass: 'fr-bg--light fr-content-edge-space'
      }
    }
  ]
};
