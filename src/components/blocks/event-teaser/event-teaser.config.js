module.exports = {
  title: "Event teaser",
  status: "wip",
  default: "simple",
  context: {
    eventUrl: "https://www.vam.ac.uk/exhibitions/pink-floyd",
    eventType: "Exhibition",
    eventTitle: "Pink Floyd: Their Mortal Remains",
    eventDescription: "The first international retrospective of one of the world’s most iconic and influential bands. Presented by the V&A, Pink Floyd and Iconic Entertainment Studios.",
    eventImage: {
      '220': 'https://placehold.it/220x125',
      '320': 'https://placehold.it/320x186',
      '380': 'https://placehold.it/380x224',
      '480': 'https://placehold.it/480x245',
      '960': 'https://placehold.it/960x480',
    },
    eventPrice: "£20–24",
    eventHumanDates: "From 13 May 2017 until 1 Oct 2017",
    eventMachineStartDate: "2017-05-13",
    eventMachineEndDate: "2017-10-01",
    actions: ['More info']
  },
  variants: [
    {
      name: "simple"
    },
    {
      name: "With sponsor",
      context: {
        eventTitle: "Lockwood Kipling: Arts and Crafts in the Punjab and London",
        eventHumanDates: "From 14 Jan 2017 until 2 Apr 2017",
        eventSponsorText: "Supported by Friends of the V&A"
      }
    }, {
      name: "With tag",
      context: {
        eventTag: true
      }
    }, {
      name: "With booking button",
      context: {
        actions: ['More info', 'Book now']
      }
    }
  ]
}
