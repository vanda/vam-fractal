module.exports = {
  title: 'Site Search Form',
  name: 'Search Form',
  label: 'Search Form',
  context: {
    jsHook: 'js-search-site',
    inputId: 'q',
    placeholder: 'Type your search here',
    action: 'https://www.vam.ac.uk/search'
  },
  variants: [
    {
      name: 'Collections Search',
      label: 'Collections Search',
      context: {
        modifiers: ['etc'],
        jsHook: 'js-search-etc',
        inputId: 'q-etc',
        placeholder: 'Search by object, artist, maker&hellip;',
        action: 'http://51.11.136.250/api/v2/objects/search'
      }
    },
    {
      name: 'Collections Landing',
      label: 'Collections Landing',
      context: {
        modifiers: ['etc', 'etc-gateway'],
        jsHook: 'js-search-etc-gateway',
        inputId: 'q-etc',
        placeholder: 'Search by object, artist, maker&hellip;',
        action: 'http://51.11.136.250/api/v2/objects/search'
      }
    }
  ]
};
