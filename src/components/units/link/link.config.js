module.exports = {
  default: 'link',
  title: 'Links',
  status: 'wip',
  context: {
    text: 'Link'
  },
  variants: [
    {
      name: 'link',
      label: 'Link'
    },
    {
      name: 'arrow',
      label: 'With arrow',
      context: {
        text: 'Exhibitions are free for V&A members',
        modifiers: ['arrow']
      }
    }
  ]
}
