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
        action: 'https://collections.vam.ac.uk/search/',
        facets: [
          ...(new Array(2).fill(null)).map((x, i) => ({
            facet: 'Facet 1',
            term: `Term ${i}`
          })),
          {
            facet: 'Really Long Facet 1',
            term: 'Term Long'
          },
          ...(new Array(2).fill(null)).map((x, i) => ({
            facet: 'Facet 1',
            term: `Term ${i}`
          }))
        ]
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
        action: 'https://collections.vam.ac.uk/search/'
      }
    }
  ]
};
