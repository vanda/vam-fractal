module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
      context: {
        title: 'Signup',
        modifier: ''
      }
    },
    {
      name: 'footer',
      label: 'Footer', 
      context: {
        title: 'Signup',
        modifier: 'footer'
      }
    },
    {
      name: 'component newsletter',
      label: 'Component Newsletter',
      context: {
        title: 'Signup',
        modifier: '--component'
      }
    }
  ]
};
