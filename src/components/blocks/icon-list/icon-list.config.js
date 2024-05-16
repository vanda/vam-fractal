module.exports = {
  title: 'Icon List',
  default: 'on-light',
  context: {
    items: [
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
        icon: 'map',
        title: 'Victoria and Albert Museum',
        body: 'Cromwell Road<br />London, SW7 2RL',
        label: 'Venue location'
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
