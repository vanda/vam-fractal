module.exports = {
  context: {
    optionalHeading: 'Lorem ipsum dolor sit amet, V&amp;A consectetur adipiscing elit anim id est V&amp;A',
    optionalCopy: 'Lorem ipsum dolor sit amet, V&amp;A consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna V&amp;A. Ut enim ad minim veniam,  V&amp;A quis nostrud exercitation ullaco laboris nisi ut aliquip ex ea commodo consequat. V&amp;A aute irure dolor in reprehenderitin voluptate velit esse cillum dolore eu fugiat nulla pariatur. V&amp;A sint occaecat cupidatt non proident, excepteur sunt in culpa qui officia deserunt mollit anim id est V&amp;A.',
    exampleLink: 'hello@vam.ac.uk'
  },
  variants: [
    {
      name: 'dark',
      label: 'Dark',
      context: {
        lightDarkTheme: 's-light-dark-theme--dark'
      }
    },
    {
      name: 'solid',
      label: 'Solid',
      context: {
        modifier: ['solid']
      }
    },
    {
      name: 'solid-dark',
      label: 'Solid Dark',
      context: {
        lightDarkTheme: 's-light-dark-theme--dark',
        modifier: ['solid']
      }
    },
    {
      name: 'info',
      label: 'Info',
      context: {
        modifier: ['info']
      }
    },
    {
      name: 'info-dark',
      label: 'Info Dark',
      context: {
        lightDarkTheme: 's-light-dark-theme--dark',
        modifier: ['info']
      }
    },
    {
      name: 'attention',
      label: 'Attention',
      context: {
        modifier: ['attention']
      }
    },
    {
      name: 'attention-dark',
      label: 'Attention Dark',
      context: {
        lightDarkTheme: 's-light-dark-theme--dark',
        modifier: ['attention']
      }
    },
  ]
};