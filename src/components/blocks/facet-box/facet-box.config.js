module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
      context: {
        facets: [
          {
            facet: 'Facet 1',
            terms: [
              {
                term: 'Term 1',
                count: '< 10000'
              },
              {
                term: 'Term 2',
                count: '< 10000'
              },
              {
                term: 'Term 3',
                count: '< 10000'
              }
            ]
          },
          {
            facet: 'Facet 2',
            terms: [
              {
                term: 'Term 1',
                count: '< 10000'
              },
              {
                term: 'Term 2',
                count: '< 10000'
              },
              {
                term: 'Term 3',
                count: '< 10000'
              }
            ]
          }
        ]
      }
    },
    {
      name: 'Testing',
      label: 'Testing',
      context: {
        testEvent: true
      }
    }
  ]
};
