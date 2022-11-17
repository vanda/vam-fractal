module.exports = {
  title: 'Typography - V&A Sans',
  label: 'Typography',
  default: 'regular',
  context: {
    heading: 'The quick brown fox jumps over the lazy dog.',
    sizes: ['0', '1', '2', '3', '4', '5', '6', '7']
  },
  variants: [
    {
      name: 'light',
      label: 'Light',
      context: {
        name: 'light'
      }
    },
    {
      name: 'regular',
      label: 'Roman',
      context: {
        name: 'regular'
      }
    },
    {
      name: 'bold',
      label: 'Medium',
      context: {
        name: 'bold'
      }
    },
    {
      name: 'x-bold',
      label: 'Bold',
      context: {
        name: 'x-bold'
      }
    }
  ]
};
