module.exports = {
  title: 'Icon label tag',
  default: 'read',
  context: {
    previewClass: 'fr-bg--dark',
    modifier: ['read'],
    text: 'Read'
  },
  variants: [
    {
      name: 'Interact',
      context: {
        modifier: ['interact'],
        text: 'Interact'
      }
    },
    {
      name: 'View',
      context: {
        modifier: ['view'],
        text: 'View'
      }
    },
    {
      name: 'Download',
      context: {
        modifier: ['download'],
        text: 'Download'
      }
    },
    {
      name: 'Visit',
      context: {
        modifier: ['visit'],
        text: 'Visit'
      }
    },
    {
      name: 'Watch',
      context: {
        modifier: ['watch'],
        text: 'Watch'
      }
    },
    {
      name: 'Listen',
      context: {
        modifier: ['listen'],
        text: 'Listen'
      }
    },
    {
      name: 'Make',
      context: {
        modifier: ['make'],
        text: 'Make'
      }
    }
  ]
}
