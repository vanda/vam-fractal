module.exports = {
  default: 'promo',
  title: 'Block grid',
  label: 'Block grid',
  context: {
    title: 'Featured',
    more: {
      action: 'Show more',
      icon: 'plus',
      modifiers: ['small'],
      themed: ['background-color', 'background-color--hover']
    }
  },
  variants: [
    {
      name: 'promo',
      label: 'Promo',
      context: {
        revealMoreCount: '2',
        revealMoreTheme: 'dark',
        revealMoreTracking: 'articles',
        additionalClasses: ['b-promo', 'b-promo--big'],
        articles: [
          {
            title: 'Article',
            body: 'About the Balenciaga: Shaping Fashion exhibition',
            description: 'Find out more about the first UK exhibition on the work and influence of master couturier Cristóbal Balenciaga',
            url: 'https://www.vam.ac.uk/articles/about-balenciaga-shaping-fashion',
            icon: true,
            cta: null,
            image: {
              320: 'https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/4faaa806-b6da-4b1d-a02c-4396b570854e/fuschia-dress-hero2.jpg',
              640: 'https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/5b67a685-dc19-40c9-8275-2d25464c0c25/fuschia-dress-hero2.jpg',
              960: 'https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/496e08f0-0030-4d7b-967e-6c1643ddcabc/fuschia-dress-hero2.jpg',
              1280: 'https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/15aeaa6d-3f45-47e4-bff3-58ccc0f454c5/fuschia-dress-hero2.jpg',
              1920: 'https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/7cc228d7-e435-4aa1-b70a-128508f08456/fuschia-dress-hero2.jpg',
              2560: 'https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/50/2965930c-892c-4962-bb2b-ac3de86674e6/fuschia-dress-hero2.jpg'
            },
            grouped: true
          },
          {
            title: 'Article',
            body: 'Fashion in Motion: inspired by Balenciaga',
            description: 'Find out about our Fashion in Motion live catwalk event, featuring new creations inspired by the master of couture, Cristóbal Balenciaga',
            url: 'https://www.vam.ac.uk/articles/fashion-in-motion-inspired-by-balenciaga',
            icon: true,
            cta: null,
            image: {
              320: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/20/15/01/23/b1c7bd70-e823-47b2-853a-578cb6515ba8/320.jpg',
              640: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/20/15/01/24/d853feaf-bed3-469d-a0fd-702679a262a2/640.jpg',
              960: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/20/15/01/24/6a825068-2712-4be5-9c21-b81c28e2b54b/960.jpg',
              1280: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/20/15/01/24/fd990d7d-b996-4119-81f3-1d8d144e5f04/1280.jpg',
              1920: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/20/15/01/24/f159226e-ee27-49f3-b8fe-331c1935de78/1920.jpg',
              2560: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/20/15/01/24/93c7fefe-a3b4-4602-bbea-4e01c485552c/2560.jpg'
            },
            grouped: true
          },
          {
            title: 'Article',
            body: 'Introducing Balenciaga',
            description: 'Revered by the likes of Coco Chanel and Christian Dior, meet \'The Master\' of haute couture',
            url: 'https://www.vam.ac.uk/articles/introducing-cristobal-balenciaga',
            icon: true,
            cta: null,
            image: {
              320: 'https://vanda-production-assets.s3.amazonaws.com/2017/04/21/12/48/20/ddf78b55-9374-45e8-a391-5b1a99dc1bd4/320.jpg',
              640: 'https://vanda-production-assets.s3.amazonaws.com/2017/04/21/12/48/20/13b3665d-d805-4a99-8b8a-7b8965d5ce06/640.jpg',
              960: 'https://vanda-production-assets.s3.amazonaws.com/2017/04/21/12/48/20/9e2334c6-1d86-4ae6-99b6-7f7a14435be5/960.jpg',
              1280: 'https://vanda-production-assets.s3.amazonaws.com/2017/04/21/12/48/20/8d22a103-172c-40b5-bc3c-66c3a19cebb5/1280.jpg',
              1920: 'https://vanda-production-assets.s3.amazonaws.com/2017/04/21/12/48/20/3426339f-8ba3-4c0d-86fc-028bd007c27e/1920.jpg',
              2560: 'https://vanda-production-assets.s3.amazonaws.com/2017/04/21/12/48/20/2e8559a5-204f-4bae-9642-e59a963335b7/2560.jpg'
            },
            grouped: true
          },
          {
            title: 'Article',
            body: 'Learning from \'The Master\'',
            description: 'Investigating iconic garmends by Cristóbal Balenciaga, \'The Master\' of haute cauture',
            url: 'https://www.vam.ac.uk/articles/learning-from-the-master',
            icon: true,
            cta: null,
            image: {
              320: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/08/10/06/24/80555f78-832a-42b9-95ba-f67c8f7631b2/320.jpg',
              640: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/08/10/06/24/7939d2f9-970d-4a40-9337-3deb7eec560a/640.jpg',
              960: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/08/10/06/24/a960b741-5ea4-434a-bf47-502c1e0fbfab/960.jpg',
              1280: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/08/10/06/24/bbff2406-76e0-4fa4-92d5-02bf3fb2b6e4/1280.jpg',
              1920: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/08/10/06/24/e1977a61-8063-4670-b43a-c7f565ecfaf9/1920.jpg',
              2560: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/08/10/06/24/51f69fc4-17e3-488e-ab35-10257cf7eada/2560.jpg'
            },
            grouped: true
          },
          {
            title: 'Article',
            body: 'X-Raying',
            url: 'https://www.vam.ac.uk/articles/fashion-in-motion-inspired-by-balenciaga',
            icon: true,
            cta: null,
            image: {
              320: 'https://vanda-production-assets.s3.amazonaws.com/2016/12/19/14/05/01/02883798-1b3b-43f5-b357-7a65d1084a58/Xray-fuchsia.jpg',
              640: 'https://vanda-production-assets.s3.amazonaws.com/2016/12/19/14/05/01/12c1c314-dba1-4a74-ab33-c070f8f0010a/Xray-fuchsia.jpg',
              960: 'https://vanda-production-assets.s3.amazonaws.com/2016/12/19/14/05/01/39a3b68e-8e9d-430f-b909-cbf3e3ba8e70/Xray-fuchsia.jpg',
              1280: 'https://vanda-production-assets.s3.amazonaws.com/2016/12/19/14/05/01/9c6d11a4-68a1-4d84-af5c-7eb59977ce92/Xray-fuchsia.jpg',
              1920: 'https://vanda-production-assets.s3.amazonaws.com/2016/12/19/14/05/01/7bdc2da0-e57e-4977-95fc-ee6915183d37/Xray-fuchsia.jpg',
              2560: 'https://vanda-production-assets.s3.amazonaws.com/2016/12/19/14/05/01/a339390e-8dfd-4eb7-9e59-1eee97867d8c/Xray-fuchsia.jpg'
            },
            grouped: true
          }
        ]
      }
    },
    {
      name: 'event',
      label: 'Event',
      context: {
        title: 'More to do',
        theme: 'light',
        revealMoreCount: '6',
        revealMoreTheme: 'light',
        revealMoreTracking: 'events',
        events: [
          {
            eventUrl: 'https://www.vam.ac.uk/exhibitions/pink-floyd',
            eventType: 'Exhibition',
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
            eventHumanDates: 'From 13 May 2017 until 1 Oct 2017',
            eventMachineStartDate: '2017-05-13',
            eventMachineEndDate: '2017-10-01',
            actions: ['More info']
          },
          {
            eventUrl: 'https://www.vam.ac.uk/exhibitions/balenciaga-shaping-fashion',
            eventType: 'Exhibition',
            eventTitle: 'Balenciaga: Shaping Fashion',
            eventImage: {
              320: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/30/14/24/38/9a628c65-56b7-4bff-875a-3fddc1a479cc/320.jpg',
              640: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/30/14/24/39/28392dba-304b-4e4f-b00b-66be4bc811a4/640.jpg',
              960: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/30/14/24/39/7d9a9f8a-80da-4e9d-90c3-61de04e11126/960.jpg',
              1280: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/30/14/24/39/785fb5cf-5386-48e6-a92a-8a1d7d8af570/1280.jpg',
              1920: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/30/14/24/39/116e7672-5c9d-4a52-b1d1-1aef943195df/1920.jpg',
              2560: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/30/14/24/39/d877ce2b-a6e9-46f4-a39b-13993e9f0a7b/2560.jpg'
            },
            eventPrice: '£12',
            eventHumanDates: 'From 27 May until 18 Feb 2018',
            eventMachineStartDate: '2017-05-27',
            eventMachineEndDate: '2018-02-18',
            eventSponsorText: 'Sponsored by American Express',
            actions: ['More info']
          },
          {
            eventUrl: 'https://www.vam.ac.uk/event/GQzOG8PZ/curator-talk-balenciaga-shaping-fashion',
            eventType: 'Talk',
            eventTitle: 'Curator Talk: Balenciaga: Shaping Fashion',
            eventImage: {
              320: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/12/16/00/20/7b58c3be-64d2-4722-afd1-d8a4105520ee/curator-talk-balenciaga-shaping-fashion_320.jpg',
              640: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/12/16/00/20/b4bf07d6-7690-4608-a666-69a903a8459d/curator-talk-balenciaga-shaping-fashion_640.jpg',
              960: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/12/16/00/20/73753c9b-531d-4a55-b40a-2e4f2c795ce8/curator-talk-balenciaga-shaping-fashion_960.jpg',
              1280: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/12/16/00/20/793fd546-a23f-480d-af18-cc01907f4240/curator-talk-balenciaga-shaping-fashion_1280.jpg',
              1920: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/12/16/00/20/1160d39a-8fee-4665-98d7-8851aea61f93/curator-talk-balenciaga-shaping-fashion_1920.jpg',
              2560: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/12/16/00/20/c58132e4-aa46-4970-a82b-b42c63960f0a/curator-talk-balenciaga-shaping-fashion_2560.jpg'
            },
            eventPrice: '£12',
            eventTag: true,
            eventHumanDates: 'Friday, 26 May 2017',
            eventMachineStartDate: '2017-05-26',
            eventMachineEndDate: '2018-05-26',
            actions: ['More info', 'Book now']
          },
          {
            eventUrl: 'https://www.vam.ac.uk/event/lAE6JqZN/contemporary-korean-ceramics',
            eventType: 'Display',
            eventTitle: 'Contemporary Korean Ceramics',
            eventImage: {
              320: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/19/11/31/07/ce7f981c-21f9-4aa3-b032-ec22cec630ba/contemporary-korean-ceramics_320.jpg',
              640: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/19/11/31/07/92b8d4d0-01fa-4b0e-8096-d532d1ed46e8/contemporary-korean-ceramics_640.jpg',
              960: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/19/11/31/07/421313b9-b1f6-4293-89f5-578884a3d854/contemporary-korean-ceramics_960.jpg',
              1280: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/19/11/31/07/ad7e8f5b-540b-4cde-8885-0da103eb581e/contemporary-korean-ceramics_1280.jpg',
              1920: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/19/11/31/07/7d8603ff-c017-44c5-be36-f9f0083bf7ab/contemporary-korean-ceramics_1920.jpg',
              2560: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/19/11/31/07/3af277bc-c3b5-4479-ad2b-61d85a2a148c/contemporary-korean-ceramics_2560.jpg'
            },
            eventPrice: 'FREE',
            eventHumanDates: 'On now until Sunday, 11 February 2018',
            eventMachineStartDate: '2017-05-01',
            eventMachineEndDate: '2018-02-11',
            actions: ['More info']
          },
          {
            eventUrl: 'https://www.vam.ac.uk/event/YRnWAm3y/digital-design-drop-in',
            eventType: 'Drop-in',
            eventTitle: 'Digital Design Drop-in',
            eventImage: {
              320: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/17/10/21/14/60112fc1-0a21-415c-bc9c-ab1e65ecba12/digital-design-drop-in_320.jpg',
              640: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/17/10/21/14/7df7507c-6ab4-4d4f-9a9c-67e0dd1e6de8/digital-design-drop-in_640.jpg',
              960: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/17/10/21/15/501c15fa-11d8-43b4-8c65-19f8d2e69507/digital-design-drop-in_960.jpg',
              1280: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/17/10/21/15/8d4487a5-b19a-43f0-bff7-f0694f5576dc/digital-design-drop-in_1280.jpg',
              1920: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/17/10/21/15/731bebea-f1ed-4fa8-9ef0-4b672c2c7224/digital-design-drop-in_1920.jpg',
              2560: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/17/10/21/15/fa44e405-a3c9-45f0-aa63-5fc527cadd8a/digital-design-drop-in_2560.jpg'
            },
            eventPrice: 'FREE',
            eventHumanDates: 'Saturday, 24th June 2017',
            eventMachineStartDate: '2017-06-24',
            eventMachineEndDate: '2017-06-24',
            actions: ['More info']
          }
        ]
      }
    }
  ]
};
