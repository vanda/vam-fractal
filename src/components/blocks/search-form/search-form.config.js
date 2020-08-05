module.exports = {
  title: 'Site Search Form',
  name: 'Search Form',
  label: 'Search Form',
  context: {
    inputId: 'q',
    placeholder: 'Type your search here'
  },
  variants: [
    {
      name: 'Collections Search',
      label: 'Collections Search',
      context: {
        modifiers: ['etc'],
        inputId: 'q-etc',
        placeholder: 'Search by object, artist, maker&hellip;'
      }
    }
  ]
};
