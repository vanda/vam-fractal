module.exports = {
  title: 'Site Search Form',
  name: 'Search Form',
  label: 'Search Form',
  context: {
    previewClass: 'fr-bg--dark',
    jsHook: 'js-search-site',
    inputId: 'q',
    selectOptions: [
      {
        value: 'all_fields',
        textContent: 'All fields'
      },
      {
        value: 'q_object_name',
        textContent: 'Object Type/title'
      },
      {
        value: 'q_actor',
        textContent: 'Artist/maker'
      },
      {
        value: 'q_material_technique',
        textContent: 'Materials and Techniques'
      },
      {
        value: 'q_place_name',
        textContent: 'Place of origin'
      },
      {
        value: 'q_accession_number',
        textContent: 'Accession number'
      }
    ],
    placeholder: 'Search the website',
    action: 'https://www.vam.ac.uk/search'
  },
  variants: [
    {
      name: 'Collections Search',
      label: 'Collections Search',
      context: {
        modifiers: ['etc', 'etc-search'],
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
        inputId: 'q_etc',
        placeholder: 'Search by object, artist, maker&hellip;',
        action: 'https://collections.vam.ac.uk/search/'
      }
    }
  ]
};
