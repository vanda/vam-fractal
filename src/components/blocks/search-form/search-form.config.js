collectionsSearchContext = {
  modifiers: ['etc', 'etc-search'],
  jsHook: 'js-search-etc',
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
};

module.exports = {
  title: 'Site Search',
  context: {
    previewClass: 'fr-bg--dark',
    jsHook: 'js-search-site',
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
      name: 'etc-search',
      label: 'Collections Search',
      title: 'Collections Search',
      context: {
        previewClass: '',
        ...collectionsSearchContext
      }
    },
    {
      name: 'etc-search--on-dark',
      label: 'Collections Search On Dark',
      title: 'Collections Search On Dark',
      context: {
        lightDarkTheme: 's-light-dark-theme--dark',
        ...collectionsSearchContext
      }
    },
    {
      name: 'etc-search-mini',
      label: 'Collections Search Mini',
      title: 'Collections Search Mini',
      context: {
        previewClass: '',
        ...collectionsSearchContext,
        modifiers: ['etc', 'etc-search', 'etc-search-mini'],
      }
    },
    {
      name: 'etc-search-mini--ondark',
      label: 'Collections Search Mini On Dark',
      title: 'Collections Search Mini On Dark',
      context: {
        lightDarkTheme: 's-light-dark-theme--dark',
        ...collectionsSearchContext,
        modifiers: ['etc', 'etc-search', 'etc-search-mini'],
      }
    },
    {
      name: 'etc-gateway',
      label: 'Collections Landing',
      title: 'Collections Landing',
      context: {
        lightDarkTheme: 's-light-dark-theme--dark',
        modifiers: ['etc', 'etc-gateway'],
        jsHook: 'js-search-etc-gateway',
        placeholder: 'Search by object, artist, maker&hellip;',
        action: 'https://collections.vam.ac.uk/search/'
      }
    }
  ]
};
