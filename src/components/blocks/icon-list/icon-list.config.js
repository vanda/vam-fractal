module.exports = {
  title: 'Icon List',
  default: 'on-light',
  context: {
    items: [
      {
        icon: 'calendar',
        title: '',
        body: 'Closes today',
        label: 'Calendar timing'
      },
      {
        icon: 'pin',
        title: 'Victoria and Albert Museum',
        body: 'Cromwell Road<br />London, SW7 2RL',
        label: 'Venue location'
      },
      {
        icon: 'clock',
        title: 'Museum open',
        body: 'Daily: <time datetime="10:00–17:45" aria-label="10:00 to 17:45">10.00 – 17.45</time>.<br />Friday: <time datetime="10:00-22:00" aria-label="10:00 to 22:00">10.00 – 22.00</time>.',
        label: 'Opening times'
      },
      {
        icon: 'ticket',
        title: 'Admission is free',
        body: 'Some exhibitions and events carry a separate charge',
        link: 'Exhibitions are free for members',
        label: 'Admission fee'
      },
      {
        icon: 'signpost',
        title: '',
        body: '',
        link: 'Gallery 40',
        label: 'Exhibition or event location'
      },
      {
        icon: 'attention',
        title: '',
        body: 'Contains flashing lights',
        label: 'Flashing lights warning'
      },
      {
        icon: 'natural-light',
        title: '',
        body: 'Contains bright lighting',
        label: 'Light levels warning'
      },
      {
        icon: 'lower-subdued-light',
        title: '',
        body: 'Contains very low light levels',
        label: 'Light levels warning'
      },
      {
        icon: 'crowded-event',
        title: '',
        body: 'Can get especially busy at peak times',
        label: 'Crowded event warning'
      },
      {
        icon: 'loud',
        title: '',
        body: 'Contains loud sounds',
        label: 'Loud sounds warning'
      },
      {
        icon: 'strong-smells',
        title: '',
        body: 'Contains strong smells',
        label: 'Strong smells warning'
      },
      {
        icon: 'lower-subdued-light',
        title: '',
        body: 'Contains both bright and low light levels',
        label: 'Light levels warning'
      },
      {
        icon: 'induction-loop',
        title: '',
        body: 'Headset experience not compatible with hearing aids and cochlear implants',
        label: 'Headset incompatibility warning'
      },
      {
        icon: 'search',
        title: '',
        body: 'Search',
        label: 'Search'
      },
      {
        icon: 'phone',
        title: '',
        body: 'Phone',
        label: 'Phone'
      },
      {
        icon: 'download',
        title: '',
        body: 'Download',
        label: 'Download'
      },
      {
        icon: 'link',
        title: '',
        body: 'Link',
        label: 'Link'
      }
    ]
  },
  variants: [
    {
      name: 'on-light',
      label: 'On light'
    },
    {
      name: 'on-dark',
      label: 'On dark',
      context: {
        previewClass: 'fr-bg--dark',
        modifier: 'dark'
      }
    }
  ]
};
