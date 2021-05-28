module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
      context: {
        modifier: 'listing',
        pages: 40,
        items: [
          {
            image: 'https://place-hold.it/120x120',
            title: 'A Vase That Looks Neat',
            artist: 'Reknowned Vase Maker',
            date: 'late 18th century',
            place: 'Britain',
            offensive: true
          },
          {
            image: 'https://place-hold.it/120x120',
            title: 'Cool Print',
            artist: 'Established Printer',
            date: '1980',
            place: 'Germany Germany Germany Germany Germany Germany Germany Germany Germany Germany Germany Germany Germany Germany'
          },
          {
            image: 'https://place-hold.it/120x120',
            title: 'Ancient Spoon',
            artist: 'Unknown',
            date: '200 AD',
            place: 'Rome'
          },
          {
            image: 'https://place-hold.it/250x100',
            title: 'Flappy Bird',
            artist: 'Dong Nguyen',
            date: '2014',
            place: 'Vietnam'
          },
          {
            image: 'none',
            title: 'Newly Acquired Object',
            artist: 'Unknown',
            date: '2020',
            place: 'Japan'
          }
        ]
      }
    }
  ]
};
