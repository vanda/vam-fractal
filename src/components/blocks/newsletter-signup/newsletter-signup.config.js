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
      name: 'footer newsletter',
      label: 'Footer Newsletter',
      context: {
        title: 'Signup',
        modifier: '--footer'
      }
    }
  ]
};
