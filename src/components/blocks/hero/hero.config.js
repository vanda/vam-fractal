module.exports = {
  default: "default",
  title: "Hero",
  context: {
    subheading: "Subheading",
    heading: "Introducing the V&A’s Research Institute",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat ut lorem nec pellentesque.",
    imageSrc: {
      320: "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/4faaa806-b6da-4b1d-a02c-4396b570854e/fuschia-dress-hero2.jpg",
      640: "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/5b67a685-dc19-40c9-8275-2d25464c0c25/fuschia-dress-hero2.jpg",
      960: "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/496e08f0-0030-4d7b-967e-6c1643ddcabc/fuschia-dress-hero2.jpg",
      1280: "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/15aeaa6d-3f45-47e4-bff3-58ccc0f454c5/fuschia-dress-hero2.jpg",
      1920: "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/7cc228d7-e435-4aa1-b70a-128508f08456/fuschia-dress-hero2.jpg",
      2560: "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/50/2965930c-892c-4962-bb2b-ac3de86674e6/fuschia-dress-hero2.jpg",
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
