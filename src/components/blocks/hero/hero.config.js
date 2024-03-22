module.exports = {
  default: "default",
  title: "Hero",
  context: {
    subheading: "Subheading",
    heading: "Introducing the V&A’s Research Institute",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat ut lorem nec pellentesque.",
    imageSrc: {
      320: "https://assets-cdn.vam.ac.uk/2017/03/15/14/20/53/e8ae69a7-6128-48a0-8843-3dd7e73fd1b0/2560.jpg",
      640: "https://assets-cdn.vam.ac.uk/2017/03/15/14/20/53/e8ae69a7-6128-48a0-8843-3dd7e73fd1b0/2560.jpg",
      960: "https://assets-cdn.vam.ac.uk/2017/03/15/14/20/53/e8ae69a7-6128-48a0-8843-3dd7e73fd1b0/2560.jpg",
      1280: "https://assets-cdn.vam.ac.uk/2017/03/15/14/20/53/e8ae69a7-6128-48a0-8843-3dd7e73fd1b0/2560.jpg",
      1920: "https://assets-cdn.vam.ac.uk/2017/03/15/14/20/53/e8ae69a7-6128-48a0-8843-3dd7e73fd1b0/2560.jpg",
      2560: "https://assets-cdn.vam.ac.uk/2017/03/15/14/20/53/e8ae69a7-6128-48a0-8843-3dd7e73fd1b0/2560.jpg",
    },
  },
  variants: [
    {
      name: "default",
      label: "Feature",
    },
    {
      name: "slim",
      label: "Slim",
      context: {
        modifiers: ["slim"],
      },
    },
  ],
};
