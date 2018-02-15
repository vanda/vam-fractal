module.exports = {
  default: 'With Search Object Reults',
  title: 'Horizontal Scroll Grid',
  label: 'Horizontal Scroll Grid',
  status: 'wip',
  context: {
    objects: [
      {
        title: 'title that flows on for more than 2 lines',
        credit: 'A name that is, very very long',
        image: '//vanda-production-assets.s3.amazonaws.com/2017/07/26/11/10/26/d235d626-f89e-4fbb-8ba3-7fb3d00ffaad/poster-iamge.jpg'
      },
      {
        title: 'Another title',
        credit: 'Some, Guy',
        image: '//vanda-production-assets.s3.amazonaws.com/2017/08/01/15/47/37/978393e8-7831-49a3-95f5-582081d674cd/Architecture-thumbnail.jpg'
      },
      {
        title: 'Amazing art',
        credit: 'Amazing, Artist',
        image: '//vanda-production-assets.s3.amazonaws.com/2016/12/22/15/13/52/f52e5b82-55a4-4bce-8720-ad914e3e0b9f/2009CR4310_poster.jpg'
      },
      {
        title: 'Sausages',
        credit: 'Fido',
        image: '//vanda-production-assets.s3.amazonaws.com/2017/07/26/11/40/48/74e471e8-5ed0-4c54-87a4-44699b1f2a5b/Slee-hippo-hero.jpg'
      },
      {
        title: 'I dunno',
        credit: 'A, Person',
        image: '//vanda-production-assets.s3.amazonaws.com/2017/08/01/15/31/53/c2fc23c4-2c46-4a51-9090-afb3353f31a5/Glass-thumbnail.jpg'
      }
    ]
  },
  variants: [
    {
      name: 'With Programme Page Touts',
      label: 'With Programme Page Touts',
      status: 'wip',
      context: {
        tout: true,
        objects: [
          {
            title: 'Exhibitions',
            image: 'https://s3-eu-west-1.amazonaws.com/vanda-production-assets/static/search/promo_Exhibitions.jpg'
          },
          {
            title: 'Courses',
            image: 'https://s3-eu-west-1.amazonaws.com/vanda-production-assets/static/search/promo_Courses.jpg'
          },
          {
            title: 'Membership events',
            image: 'https://s3-eu-west-1.amazonaws.com/vanda-production-assets/static/search/promo_Events.jpg'
          },
          {
            title: 'Family events',
            image: 'https://s3-eu-west-1.amazonaws.com/vanda-production-assets/static/search/promo_FamilyEvents.jpg'
          },
          {
            title: 'Professional development',
            image: 'https://s3-eu-west-1.amazonaws.com/vanda-production-assets/static/search/promo_ProfDevelopment.jpg'
          }
        ]
      }
    }
  ]
};
