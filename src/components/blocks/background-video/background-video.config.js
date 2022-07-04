module.exports = {
  title: 'Background Video',
  label: 'Background Video',
  context: {
    video: 'https://vanda-qa-assets.s3.amazonaws.com/2022/06/29/17/21/50/dc02e6d2-edf0-4245-93fd-690195570e0e/test.mp4'
  },
  variants: [
    {
      name: 'Dark Overlay',
      label: 'Dark Overlay',
      context: {
        video: 'https://vanda-qa-assets.s3.amazonaws.com/2022/06/29/17/21/50/dc02e6d2-edf0-4245-93fd-690195570e0e/test.mp4',
        treatment: 'darken'
      }
    }
  ]
};
