module.exports = {
  title: "Icon badge",
  label: "Icon badge",
  status: "wip",
  context: {
    action: 'Read',
    icon: 'quote'
  },
  variants: [
    {
      name: "small",
      context: {
        action: 'Show more',
        icon: 'plus-thin',
        modifiers: ['small']
      }
    },
    {
      name: "themed",
      context: {
        action: 'Show more',
        icon: 'plus',
        themed: ['background-color', 'background-color--hover'],
      }
    }
  ]
}
