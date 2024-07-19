module.exports = {
  title: 'Object card',
  label: 'Object card',
  context: {
    image: {
      320: 'https://framemark.vam.ac.uk/collections/2020MP2543/full/320,/0/default.jpg',
      640: 'https://framemark.vam.ac.uk/collections/2020MP2543/full/640,/0/default.jpg',
      960: 'https://framemark.vam.ac.uk/collections/2020MP2543/full/960,/0/default.jpg',
      1280: 'https://framemark.vam.ac.uk/collections/2020MP2543/full/1280,/0/default.jpg',
      1920: 'https://framemark.vam.ac.uk/collections/2020MP2543/full/1920,/0/default.jpg',
      2560: 'https://framemark.vam.ac.uk/collections/2020MP2543/full/2560,/0/default.jpg'
    },
    captions: [
      {
        text: 'Raphael Cartoon, The Miraculous Draught of Fishes: Luke Chapter 5: Verses 1–11',
        type: 'main'
      },
      {
        text: 'Raphael',
        type: 'sub'
      },
      {
        text: '1515 – 16',
        type: 'sub'
      }
    ],
    physicalDescription: 'Cartoon for a tapestry'
  },
  variants: [
    {
      label: 'EtC',
      name: 'etc',
      context: {
        previewClass: 'fr-bg--dark',
        modifiers: ['etc'],
        captions: [
          {
            text: 'Raphael Cartoon, The Miraculous Draught of Fishes: Luke Chapter 5: Verses 1–11',
            type: 'main'
          },
          {
            text: 'Raphael',
            type: 'sub'
          },
          {
            text: '1515 – 16',
            type: 'sub'
          },
          {
            text: 'V&A South Kensington',
            icon: 'pin',
            iconDefinition: 'Object location',
            type: 'sub'
          },
          {
            text: 'On display',
            status: 'displayed',
            type: 'sub'
          }
        ]
      }
    }
  ]
};
