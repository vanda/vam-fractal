module.exports = {
  title: 'Exhibition Promo',
  label: 'Exhibition Promo',
  default: 'Single',
  context: {
    eventType: 'Exhibition',
    promotion: 'Promoted Exhibition',
    url: 'https://www.vam.ac.uk/exhibitions/donatello-sculpting-the-renaissance',
    title: 'Donatello: Sculpting the Renaissance',
    description: 'The first major UK exhibition to explore the exceptional talents of the Renaissance master Donatello, arguably the greatest sculptor of all time. Experience a fresh vision of the artist and his influence on subsequent generations.',
    imageSrc: {
      320: 'https://vanda-production-assets.s3.amazonaws.com/2022/10/24/09/33/25/663ad1ae-0630-4dd9-9632-ac7570af904c/320.jpg',
      640: 'https://vanda-production-assets.s3.amazonaws.com/2022/10/24/09/33/25/0a29603f-455b-4e4e-a2c1-4b75e208d853/640.jpg',
      960: 'https://vanda-production-assets.s3.amazonaws.com/2022/10/24/09/33/25/8dcf2a92-649a-48b1-bccd-472110701041/960.jpg',
      1280: 'https://vanda-production-assets.s3.amazonaws.com/2022/10/24/09/33/25/dc41a781-8a30-44c0-898f-33eb704b4b60/1280.jpg'
    },
    date: 'From 2 July 2023 until 16 Aug 2023',
    venue: 'V&A South Kensington'
  },
  variants: [
    {
      name: 'Double',
      label: 'Double',
      context: {
        modifiers: ['double']
      }
    },
    {
      name: 'With Tag',
      label: 'With Tag',
      context: {
        eventTag: true
      }
    }
  ]
};
