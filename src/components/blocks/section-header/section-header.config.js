module.exports = {
  title: 'Section header',
  label: 'Section header',
  context: {
    previewClass: 'fr-content-wrapper fr-bg--dark',
    title: 'Section header',
    subtitle: 'Section sub-header',
    copy: 'Lorem ipsum dolor sit amet, V&A consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna V&A.',
    cta: 'Optional Link'
  },
  variants: [
    {
      name: 'Transparent',
      label: 'Transparent',
      context: {
        modifiers: ['transparent']
      }
    },
    {
      name: 'Transparent compact',
      label: 'Transparent compact',
      context: {
        modifiers: ['compact', 'transparent']
      }
    },
    {
      name: 'Alternate',
      label: 'Alternate',
      context: {
        modifiers: ['alternate'],
        subtitle: null,
        copy: null,
        cta: null
      }
    },
    {
      name: 'Alternate with image',
      label: 'Alternate with image',
      context: {
        modifiers: ['alternate', 'alternate-image'],
        subtitle: null,
        copy: null,
        cta: null,
        image: {
          320: 'https://vanda-production-assets.s3.amazonaws.com/2016/10/03/12/01/01/eb6a15f5-8301-45ec-96c4-ceb793abba55/plans_2006AA6445.jpg',
          640: 'https://vanda-production-assets.s3.amazonaws.com/2016/10/03/12/01/01/4845b9ce-8cb3-4af5-9251-a92bc76df4e9/plans_2006AA6445.jpg',
          960: 'https://vanda-production-assets.s3.amazonaws.com/2016/10/03/12/01/01/98e1a68b-8b0a-449e-a2dd-50ed31df5ee9/plans_2006AA6445.jpg',
          1280: 'https://vanda-production-assets.s3.amazonaws.com/2016/10/03/12/01/01/ff3e872c-ea67-4986-bcb7-536f04308f18/plans_2006AA6445.jpg',
          1920: 'https://vanda-production-assets.s3.amazonaws.com/2016/10/03/12/01/01/5dd04b94-65ee-4065-b9de-b5672230155f/plans_2006AA6445.jpg',
          2560: 'https://vanda-production-assets.s3.amazonaws.com/2016/10/03/12/01/02/e98a9a5d-9337-4544-b7ce-fd0871581ae9/plans_2006AA6445.jpg'
        }
      }
    }
  ]
};
