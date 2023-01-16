module.exports = {
  title: 'Event teaser',
  context: {
    eventUrl: 'https://www.vam.ac.uk/exhibitions/pink-floyd',
    eventType: 'Exhibition',
    eventVenue: 'V&A South Kensington',
    eventTitle: 'Pink Floyd: Their Mortal Remains',
    eventDescription: 'The first international retrospective of one of the world’s most iconic and influential bands. Presented by the V&A, Pink Floyd and Iconic Entertainment Studios.',
    eventImage: {
      320: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/b880499d-6c90-4199-bb00-e2d8d04a730e/320.jpg',
      640: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/124d3d7a-37c4-494a-8d56-f86581ecb9aa/640.jpg',
      960: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/36fac84c-cd4b-4c60-8512-657252f93c76/960.jpg',
      1280: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/7f38c9ec-ec6a-49d0-8c0e-0eb218cb9d27/1280.jpg',
      1920: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/af00779a-48b5-49c7-ae16-cff21e9094bf/1920.jpg',
      2560: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/06/2301b297-d9e0-49cb-a16a-f0a6cecb9b13/2560.jpg'
    },
    eventPrice: '£20–24',
    eventHumanDates: 'On now until Friday, 23 December 2034',
    eventMachineStartDate: '2017-05-13',
    eventMachineEndDate: '2017-10-01'
  },
  variants: [
    {
      name: 'With sponsor',
      context: {
        eventSponsorText: 'Supported by Friends of the V&A'
      }
    },
    {
      name: 'With tag',
      context: {
        eventTag: true
      }
    },
    {
      label: 'On dark',
      name: 'dark',
      context: {
        previewClass: 'fr-bg--dark',
        modifiers: ['dark'],
        eventSponsorText: 'Supported by Friends of the V&A',
        eventTag: true
      }
    }
  ]
};
