module.exports = {
  title: 'Record Card',
  context: {
    image: {
      320: 'https://picsum.photos/id/20/320/240',
      640: 'https://picsum.photos/id/20/640/480',
    },
    heading: 'Archive of Art and Design',
    synopsis: 'The Archive of Art and Design holds the personal and professional papers of British-based artists, designers, photographers and other practitioners in the applied arts. It also houses the records of businesses and associations involved in art, design, manufacturing and retail.',
  },
  variants: [
    {
      name: 'archive-collection',
      label: 'Archive Collection',
      context: {
        modifier: ['archive-collection'],
        image: {
          320: 'https://picsum.photos/id/24/320/240',
          640: 'https://picsum.photos/id/24/640/480',
        },
        heading: 'Theatre and Performance',
      }
    },
    {
      name: 'archive-series',
      label: 'Archive Series',
      context: {
        modifier: ['archive-series'],
        image: '',
        heading: 'Vivien Leigh Archive',
        date: '1925-1967',
        reference: 'THM/433',
        extent: '90 Boxes',
      }
    },
    {
      name: 'archive-series-thumbnail',
      label: 'Archive Series - Thumbnail',
      context: {
        modifier: ['archive-series', 'archive-series-thumbnail'],
        image: {
          320: 'https://picsum.photos/id/25/320/240',
          640: 'https://picsum.photos/id/25/640/480',
        },
        heading: 'Vivien Leigh Archive',
        date: '1925-1967',
        reference: 'THM/433',
        extent: '90 Boxes',
      }
    }
  ]
};
