module.exports = {
  title: 'Toggle Nav',
  default: 'on-light',
  context: {
    modifier: ['light'],
    toggles: [
      'Galleries',
      'Periods and styles',
      'People',
      'Featured',
      'Materials and techniques',
      'Places'
    ]
  },
  variants: [
    {
      name: 'on-dark',
      label: 'On dark',
      context: {
        previewClass: 'fr-bg--dark',
        modifier: ['dark']
      }
    }
  ]
};
