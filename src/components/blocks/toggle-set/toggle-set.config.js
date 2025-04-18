module.exports = {
  title: 'Toggle Set',
  label: 'Toggle Set',
  context: {
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
        onDark: true
      }
    }
  ]
};
