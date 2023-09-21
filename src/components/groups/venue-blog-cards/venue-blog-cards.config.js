module.exports = {
  variants: [
    {
      name: 'Single Card',
      label: 'Single card',
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
