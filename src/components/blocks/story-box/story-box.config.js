const story = {
  title: "Title Of Story",
  type: "Content Type",
  img: "https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/7f38c9ec-ec6a-49d0-8c0e-0eb218cb9d27/1280.jpg",
  content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,"
}

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
      context: {
        modifier: "column",
        story,
        active: true
      }
    },
    {
      name: 'row',
      label: 'row',
      context: {
        modifier: "row",
        story,
        active: true
      }
    }
  ]
};
