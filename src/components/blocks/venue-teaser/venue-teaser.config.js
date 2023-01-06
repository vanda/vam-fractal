module.exports = {
  title: 'Venue teaser',
  context: {
    url: 'https://www.vam.ac.uk/exhibitions/pink-floyd',
    title: 'V&A South Kensington',
    image: {
      320: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/b880499d-6c90-4199-bb00-e2d8d04a730e/320.jpg',
      640: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/124d3d7a-37c4-494a-8d56-f86581ecb9aa/640.jpg',
      960: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/36fac84c-cd4b-4c60-8512-657252f93c76/960.jpg',
      1280: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/7f38c9ec-ec6a-49d0-8c0e-0eb218cb9d27/1280.jpg',
      1920: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/af00779a-48b5-49c7-ae16-cff21e9094bf/1920.jpg',
      2560: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/06/2301b297-d9e0-49cb-a16a-f0a6cecb9b13/2560.jpg'
    },
    description: 'A world of extraordinary creativity with unmissable exhibitions and encounters for all',
    address: 'Cromwell Road, London SW7 2RL',
    admission_info: 'Open Wed – Sun, 10am – 5.45pm</br>Last admission 16:45',
    actions: ['Plan a visit', 'What\'s on']
  },
  variants: [
    {
      name: 'external',
      label: 'External site',
      context: {
        externalSite: true
      }
    }
  ]
};
