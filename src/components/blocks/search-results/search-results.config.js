module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
      context: {
        pages: 10,
        items: [
          {
            image: 'https://place-hold.it/150x71',
            title: 'A Vase That Looks Neat With A Really Long Title',
            artist: 'Reknowned Vase Maker',
            date: 'late 18th century',
            place: 'Britain Britain Britain Britain Britain Britain, Britain Britain Britain Britain Britain'
          },
          {
            image: 'https://place-hold.it/150x71',
            title: 'A Vase That Looks Neat',
            artist: 'Reknowned Vase Maker',
            date: 'late 18th century',
            place: 'Britain'
          },
          {
            image: 'https://place-hold.it/82x170',
            title: 'Cool Print',
            artist: 'Established Printer',
            date: '1980',
            place: 'Germany'
          },
          {
            image: 'https://place-hold.it/150x71',
            title: 'Ancient Spoon',
            artist: 'Unknown',
            date: '200 AD',
            place: 'Rome'
          },
          {
            image: 'https://place-hold.it/150x106',
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
    },
    {
      name: 'Offensive',
      label: 'Offensive',
      context: {
        pages: 10,
        items: [
          {
            image: 'https://place-hold.it/150x71',
            title: 'A Vase That Looks Neat',
            artist: 'Reknowned Vase Maker',
            date: 'late 18th century',
            place: 'Britain',
            offensive: true
          },
          {
            image: 'https://place-hold.it/150x71',
            title: 'A Vase That Looks Neat',
            artist: 'Reknowned Vase Maker',
            date: 'late 18th century',
            place: 'Britain'
          },
          {
            image: 'https://place-hold.it/82x170',
            title: 'Cool Print',
            artist: 'Established Printer',
            date: '1980',
            place: 'Germany',
            offensive: true
          },
          {
            image: 'https://place-hold.it/150x71',
            title: 'Ancient Spoon',
            artist: 'Unknown',
            date: '200 AD',
            place: 'Rome'
          },
          {
            image: 'https://place-hold.it/150x106',
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
    },
    {
      name: 'search-has-no-results',
      label: 'has no results',
      context: {
        items: []
      }
    }
  ]
};
