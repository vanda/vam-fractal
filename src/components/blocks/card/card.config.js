module.exports = {
  title: 'Card',
  context: {
    cardUrl: 'https://www.vam.ac.uk/exhibitions/pink-floyd',
    cardTitle: 'The Leman Album: an enhanced facsimile',
    cardDescription: 'This 18th-century volume contains Europe\'s earliest dated silk designs – close to 100 astonishingly vibrant drawings on paper.',
    cardImage: {
      320: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/16/12/27/07/8462b6bc-d141-4808-8af2-cb5caeddfd50/leman_hero.jpg',
      640: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/16/12/27/07/8462b6bc-d141-4808-8af2-cb5caeddfd50/leman_hero.jpg',
      960: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/16/12/27/07/8462b6bc-d141-4808-8af2-cb5caeddfd50/leman_hero.jpg',
      1280: 'https://vanda-production-assets.s3.amazonaws.com/2017/03/16/12/27/07/8462b6bc-d141-4808-8af2-cb5caeddfd50/leman_hero.jpg',
    },
  },
  variants: [
    {
      name: 'Current project',
      context: {
        currentProject: true
      }
    },
  ]
};
