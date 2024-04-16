module.exports = {
  title: 'File download',
  label: 'File download',
  context: {
    url: 'https://vanda-production-assets.s3.amazonaws.com/2023/07/21/08/54/14/9668c98a-9ab0-4fb1-aac2-ba58386c9838/VARPT 2023 accessible version (1).pdf',
    name: 'Annual report and accounts 2022 – 23',
    meta: 'PDF (1.08 mb)',
    icon: 'download'
  },
  variants: [
    {
      name: 'dark',
      context: {
        previewClass: 'fr-bg--dark',
        modifiers: ['dark']
      }
    }
  ]
};
