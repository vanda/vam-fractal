module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
      context: {
        images: [
          {
            src: '',
            selected: true
          },
          {
            src: ''
          },
          {
            src: ''
          }
        ]
      }
    },
    {
      name: 'more-than-five-images',
      label: 'More than five images',
      context: {
        modifiers: ['conceal'],
        images: [
          {
            src: '',
            selected: true
          },
          ...Array(7).fill({
            src: ''
          })
        ]
      }
    }
  ]
};
