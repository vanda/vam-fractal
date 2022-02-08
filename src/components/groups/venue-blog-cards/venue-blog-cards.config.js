module.exports = {
  variants: [
    {
      name: 'Default',
      label: 'Default',
      context: {
        previewClass: 'fr-bg--dark',
        numberOfCards: 1
      }
    },
    {
      name: '2 cards',
      label: 'two cards',
      context: {
        previewClass: 'fr-bg--dark',
        numberOfCards: 2
      }
    },
    {
      name: '3 cards',
      label: 'three cards',
      context: {
        previewClass: 'fr-bg--dark',
        numberOfCards: 3
      }
    }
  ]
};
