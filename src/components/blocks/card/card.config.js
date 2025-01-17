module.exports = {
  title: 'Standard Card',
  context: {
    image: {
      320: 'https://picsum.photos/id/403/320/240',
      640: 'https://picsum.photos/id/403/640/480',
      960: 'https://picsum.photos/id/403/960/720',
      1280: 'https://picsum.photos/id/403/1280/960'
    },
    heading: 'Fashion unpicked: The \'Bar\' suit by Christian Dior',
    synopsis: 'Watch dressmaking expert and V&A volunteer, Sue Clark, as she examines Christian Dior\'s \'Bar\' suit.'
  },
  variants: [
    {
      name: 'picture-card',
      label: 'Picture Card',
      context: {
        modifier: ['picture-card']
      }
    },
    {
      name: 'featured',
      label: 'Default - Featured',
      context: {
        modifier: ['featured']
      }
    },
    {
      name: 'featured-picture-card',
      label: 'Picture Card - Featured',
      context: {
        modifier: ['picture-card', 'featured']
      }
    }
  ]
};
