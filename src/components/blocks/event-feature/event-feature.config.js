module.exports = {
  title: 'Event feature',
  label: 'Event feature',
  context: {
    eventUrl: 'https://www.vam.ac.uk/exhibitions/pink-floyd',
    eventType: 'Exhibition',
    eventTitle: 'Pink Floyd: Their Mortal Remains',
    eventDescription: 'The first international retrospective of one of the world’s most iconic and influential bands. Presented by the V&A, Pink Floyd and Iconic Entertainment Studios.',
    eventImageSrcs: {
      320: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/b880499d-6c90-4199-bb00-e2d8d04a730e/320.jpg',
      640: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/124d3d7a-37c4-494a-8d56-f86581ecb9aa/640.jpg',
      960: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/36fac84c-cd4b-4c60-8512-657252f93c76/960.jpg',
      1280: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/7f38c9ec-ec6a-49d0-8c0e-0eb218cb9d27/1280.jpg'
    },
    eventImageSizes: `(max-width: 499px) calc(100vw - 20px),
                      (min-width: 500px) calc(100vw - 64px),
                      (min-width: 992px) calc(100vw - 130px),
                      (min-width: 1200px) 1070px`,
    eventHumanDates: 'On Now, ends November 2059',
    eventMachineStartDate: '2017-08-23',
    eventMachineEndDate: '2059-11-23',
    actions: ['More info', 'Book now']
  },
  variants: [
    {
      name: 'Half Width',
      label: 'Half Width',
      context: {
        modifiers: ['half-width'],
        eventImageSrcs: {
          320: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/b880499d-6c90-4199-bb00-e2d8d04a730e/320.jpg',
          640: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/124d3d7a-37c4-494a-8d56-f86581ecb9aa/640.jpg'
        },
        eventImageSizes: `(max-width: 499px) calc(100vw - 20px),
                          (min-width: 500px) calc(100vw - 64px),
                          (min-width: 992px) calc(50vw - 150px),
                          (min-width: 1200px) 525px`
      }
    },
    {
      name: 'Third Width',
      label: 'Third Width',
      context: {
        modifiers: ['third-width'],
        eventImageSrcs: {
          320: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/b880499d-6c90-4199-bb00-e2d8d04a730e/320.jpg',
          640: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/124d3d7a-37c4-494a-8d56-f86581ecb9aa/640.jpg'
        },
        eventImageSizes: `(max-width: 499px) calc(100vw - 20px),
                          (min-width: 500px) calc(100vw - 64px),
                          (min-width: 992px) calc(34vw - 170px),
                          (min-width: 1200px) 343px`
      }
    }
  ]
};
