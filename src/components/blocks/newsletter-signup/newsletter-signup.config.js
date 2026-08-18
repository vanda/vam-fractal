module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
      context: {
        title: 'Signup',
        modifier: '',
        validationMessage:""
      }
    },
    {
      name: 'footer',
      label: 'Footer',
      context: {
        title: 'Signup',
        modifier: 'footer',
        validationMessage:"Invalid Email address"
      }
    },
    {
      name: 'component',
      label: 'Component',
      context: {
        title: 'Signup',
        modifier: 'component',
        validationMessage:"Incorrect format"
      }
    }
  ]
};
