module.exports = {
  default: "default",
  title: "Profile",
  context: {
    name: "Joanna Norman",
    jobTitle: "Head of VARI",
    backgroundImageSrc: {
      320: "https://assets-cdn.vam.ac.uk/2017/03/15/14/20/53/e8ae69a7-6128-48a0-8843-3dd7e73fd1b0/2560.jpg",
      640: "https://assets-cdn.vam.ac.uk/2017/03/15/14/20/53/e8ae69a7-6128-48a0-8843-3dd7e73fd1b0/2560.jpg",
      960: "https://assets-cdn.vam.ac.uk/2017/03/15/14/20/53/e8ae69a7-6128-48a0-8843-3dd7e73fd1b0/2560.jpg",
      1280: "https://assets-cdn.vam.ac.uk/2017/03/15/14/20/53/e8ae69a7-6128-48a0-8843-3dd7e73fd1b0/2560.jpg",
      1920: "https://assets-cdn.vam.ac.uk/2017/03/15/14/20/53/e8ae69a7-6128-48a0-8843-3dd7e73fd1b0/2560.jpg",
      2560: "https://assets-cdn.vam.ac.uk/2017/03/15/14/20/53/e8ae69a7-6128-48a0-8843-3dd7e73fd1b0/2560.jpg",
    },
    profileImageSrc: {
      320: "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/4faaa806-b6da-4b1d-a02c-4396b570854e/fuschia-dress-hero2.jpg",
      640: "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/5b67a685-dc19-40c9-8275-2d25464c0c25/fuschia-dress-hero2.jpg",
    },
  },
  variants: [
    {
      name: "default",
      label: "Default",
    },
    {
      name: "no-profile-image",
      label: "No profile image",
      context: {
        profileImageSrc: {
          320: "",
          640: "",
        },
      },
    },
  ],
};
