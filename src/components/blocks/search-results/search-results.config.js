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
            site: 'Young V&A',
            location: 'Play gallery',
            status: 'On display'
          },
          {
            image: 'https://place-hold.it/150x71',
            title: 'A Vase That Looks Neat',
            artist: 'Reknowned Vase Maker',
            date: 'late 18th century',
            site: 'Young V&A',
            location: 'Play gallery',
            status: 'Request to view'
          },
          {
            image: 'https://place-hold.it/82x170',
            title: 'Cool Print',
            artist: 'Established Printer',
            date: '1980',
            site: 'V&A South Kensington',
            location: 'Prints & Drawings Study Room, level D',
            status: 'Not on display'
          },
          {
            image: 'https://place-hold.it/150x71',
            title: 'Wardrobe',
            artist: 'Berman, Eugène',
            date: '1939',
            site: 'V&A South Kensington',
            location: 'Furniture, Room 133, The Dr Susan Weber Gallery',
            status: 'On display'
          },
          {
            image: 'https://place-hold.it/150x106',
            title: 'Antarctic Expedition',
            artist: 'Maskrey, James',
            date: '2013',
            site: 'V&A South Kensington',
            location: 'Contemporary Glass, Room 129, The Märit Rausing Gallery',
            status: 'On display'
          },
          {
            image: 'none',
            title: 'Ancient book of wonders',
            artist: 'Unknown',
            date: '2020',
            site: 'V&A South Kensington',
            location: 'National Art Library',
            status: 'Not on display'
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
            site: 'V&A South Kensington',
            location: 'Ceramics, Room 142, The Lydia and Manfred Gorvy Gallery',
            status: 'On display',
            offensive: true
          },
          {
            image: 'https://place-hold.it/150x71',
            title: 'A Vase That Looks Neat',
            artist: 'Reknowned Vase Maker',
            date: 'late 18th century',
            place: 'Britain',
            site: 'V&A South Kensington',
            location: 'British Galleries, Room 118, The Wolfson Gallery',
            status: 'Request to view'
          },
          {
            image: 'https://place-hold.it/82x170',
            title: 'Cool Print',
            artist: 'Established Printer',
            date: '1980',
            site: 'V&A South Kensington',
            location: 'British Galleries, Room 122',
            status: 'Not on display',
            offensive: true
          },
          {
            image: 'https://place-hold.it/150x71',
            title: 'Ancient Spoon',
            artist: 'Unknown',
            date: '200 AD',
            site: 'Young V&A',
            location: 'Play gallery',
            status: 'Not on display'
          },
          {
            image: 'https://place-hold.it/150x106',
            title: 'Flappy Bird',
            artist: 'Dong Nguyen',
            date: '2014',
            site: 'Young V&A',
            location: 'Play gallery',
            status: 'On display'
          },
          {
            image: 'none',
            title: 'Newly Acquired Object',
            artist: 'Unknown',
            date: '2020',
            site: 'V&A South Kensington',
            location: 'Halfway up the stairs',
            status: 'On display'
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
