module.exports = {
  title: 'Icon link',
  label: 'Icon link',
  context: {
    icon: 'twitter'
  },
  variants: [
    {
      name: 'themed',
      context: {
        themed: ['color', 'border-color']
      }
    },
    {
      name: 'no border',
      context: {
        no_border: true
      }
    }
  ]
};
