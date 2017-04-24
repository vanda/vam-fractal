module.exports = {
  title: "Promo",
  label: "Promo",
  status: "wip",
  context: {
    title: "Membership",
    body: "Join today and enjoy unlimited free entry to all V&A exhibitions, Members-only previews and more",
    cta: "Become a member",
    image: {
      "320": "https://vanda-production-assets.s3.amazonaws.com/2016/07/27/10/04/membership_320.jpg",
      "640": "https://vanda-production-assets.s3.amazonaws.com/2016/07/27/10/04/membership_640.jpg",
      "960": "https://vanda-production-assets.s3.amazonaws.com/2016/07/27/10/04/membership_960.jpg",
      "1280": "https://vanda-production-assets.s3.amazonaws.com/2016/07/27/10/04/membership_1280.jpg",
      "1920": "https://vanda-production-assets.s3.amazonaws.com/2016/07/27/10/04/membership_1920.jpg",
      "2560": "https://vanda-production-assets.s3.amazonaws.com/2016/07/27/10/04/membership_2560.jpg"
    },
    url: "http://www.vam.ac.uk/membership/"
  },
  variants: [
    {
      name: "White",
      label: "White",
      context: {
        title: "Shop",
        body: "Find inspiration in our range of jewellery, books, fashion, prints & posters and much more...",
        cta: "Explore the range",
        url: "https://www.vam.ac.uk/shop",
        image: {
          "320": "https://vanda-production-assets.s3.amazonaws.com/2017/01/03/09/43/shop/generic_shop_promo_320.jpg",
          "640": "https://vanda-production-assets.s3.amazonaws.com/2017/01/03/09/43/shop/generic_shop_promo_640.jpg",
          "960": "https://vanda-production-assets.s3.amazonaws.com/2017/01/03/09/43/shop/generic_shop_promo_960.jpg",
          "1280": "https://vanda-production-assets.s3.amazonaws.com/2017/01/03/09/43/shop/generic_shop_promo_1280.jpg",
          "1920": "https://vanda-production-assets.s3.amazonaws.com/2017/01/03/09/43/shop/generic_shop_promo_1920.jpg",
          "2560": "https://vanda-production-assets.s3.amazonaws.com/2017/01/03/09/43/shop/generic_shop_promo_2560.jpg"
        },
        modifiers: ["white"],
      }
    },
    {
      name: "With sponsor line",
      label: "With sponsor line",
      context: {
        title: "Exhibition",
        body: "Lockwood Kipling: Arts and Crafts in the Punjab and London",
        cta: "Find out more",
        url: "https://www.vam.ac.uk/exhibitions/lockwood-kipling-arts-and-crafts-in-the-punjab-and-london",
        sponsor: "Supported by the Friends of the V&A",
        image: {
          "320": "https://vanda-production-assets.s3.amazonaws.com/2017/02/15/12/55/45/01a67413-3cca-454a-ab54-c56b4b62afbb/lockwood-kipling-hero.jpg",
          "640": "https://vanda-production-assets.s3.amazonaws.com/2017/02/15/12/55/45/2fbe283e-4485-48ee-b791-3bc5a2b3b4d5/lockwood-kipling-hero.jpg",
          "960": "https://vanda-production-assets.s3.amazonaws.com/2017/02/15/12/55/45/2fbe283e-4485-48ee-b791-3bc5a2b3b4d5/lockwood-kipling-hero.jpg",
          "1280": "https://vanda-production-assets.s3.amazonaws.com/2017/02/15/12/55/45/d9c09fee-81a7-42bb-8881-8cf5931ea4b3/lockwood-kipling-hero.jpg",
          "1920": "https://vanda-production-assets.s3.amazonaws.com/2017/02/15/12/55/45/d3d19f32-bbd6-47bc-9cae-2cf8f94ae316/lockwood-kipling-hero.jpg",
          "2560": "https://vanda-production-assets.s3.amazonaws.com/2017/02/15/12/55/45/d3d19f32-bbd6-47bc-9cae-2cf8f94ae316/lockwood-kipling-hero.jpg"
        }
      }
    },
    {
      name: "With description",
      label: "With description",
      context: {
        title: "Exhibition",
        body: "Balenciaga: Shaping Fashion",
        description: "Discover how Cristóbal Balenciaga's exquisite craftsmanship and innovative designs shaped modern fashion",
        cta: "Find out more",
        url: "https://www.vam.ac.uk/exhibitions/balenciaga-shaping-fashion",
        image: {
          "320": "https://vanda-production-assets.s3.amazonaws.com/2017/01/17/17/11/04/4a9aea3b-c465-46d8-b9b6-1c931c63eaf0/Silk-hat.jpg",
          "640": "https://vanda-production-assets.s3.amazonaws.com/2017/01/17/17/11/05/00ebc180-2fec-418c-995e-a4092ee19416/Silk-hat.jpg",
          "960": "https://vanda-production-assets.s3.amazonaws.com/2017/01/17/17/11/05/dcbae1a2-362e-4a43-80f9-a54c6c8509d7/Silk-hat.jpg",
          "1280": "https://vanda-production-assets.s3.amazonaws.com/2017/01/17/17/11/05/00ebc180-2fec-418c-995e-a4092ee19416/Silk-hat.jpg",
          "1920": "https://vanda-production-assets.s3.amazonaws.com/2017/01/17/17/11/05/5fe60e33-3ad4-4bf9-a845-d548123d33b0/Silk-hat.jpg",
          "2560": "https://vanda-production-assets.s3.amazonaws.com/2017/01/17/17/11/05/5fe60e33-3ad4-4bf9-a845-d548123d33b0/Silk-hat.jpg"
        }
      }
    },
    {
      name: "With quote",
      label: "With quote",
      context: {
        title: "Exhibition",
        body: "Lockwood Kipling: Arts and Crafts in the Punjab and London",
        cta: "Find out more",
        url: "https://www.vam.ac.uk/exhibitions/lockwood-kipling-arts-and-crafts-in-the-punjab-and-london",
        quote: {
          body: "Hats off to the V&A... for examining Britain’s imperial past in a straightforward, honest manner",
          cite: "Alastair Sooke, Daily Telegraph"
        },
        image: {
          "320": "https://vanda-production-assets.s3.amazonaws.com/2017/02/15/12/55/45/01a67413-3cca-454a-ab54-c56b4b62afbb/lockwood-kipling-hero.jpg",
          "640": "https://vanda-production-assets.s3.amazonaws.com/2017/02/15/12/55/45/2fbe283e-4485-48ee-b791-3bc5a2b3b4d5/lockwood-kipling-hero.jpg",
          "960": "https://vanda-production-assets.s3.amazonaws.com/2017/02/15/12/55/45/2fbe283e-4485-48ee-b791-3bc5a2b3b4d5/lockwood-kipling-hero.jpg",
          "1280": "https://vanda-production-assets.s3.amazonaws.com/2017/02/15/12/55/45/d9c09fee-81a7-42bb-8881-8cf5931ea4b3/lockwood-kipling-hero.jpg",
          "1920": "https://vanda-production-assets.s3.amazonaws.com/2017/02/15/12/55/45/d3d19f32-bbd6-47bc-9cae-2cf8f94ae316/lockwood-kipling-hero.jpg",
          "2560": "https://vanda-production-assets.s3.amazonaws.com/2017/02/15/12/55/45/d3d19f32-bbd6-47bc-9cae-2cf8f94ae316/lockwood-kipling-hero.jpg"
        }
      }
    },
    {
      name: "Big",
      label: "Big (articles)",
      context: {
        title: "Article",
        body: "About the Balenciaga: Shaping Fashion exhibition",
        description: "Find out more about the first UK exhibition on the work and influence of master couturier Cristóbal Balenciaga",
        url: "https://www.vam.ac.uk/articles/about-balenciaga-shaping-fashion",
        icon: true,
        cta: null,
        modifiers: ["big"],
        image: {
          "320": "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/4faaa806-b6da-4b1d-a02c-4396b570854e/fuschia-dress-hero2.jpg",
          "640": "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/5b67a685-dc19-40c9-8275-2d25464c0c25/fuschia-dress-hero2.jpg",
          "960": "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/496e08f0-0030-4d7b-967e-6c1643ddcabc/fuschia-dress-hero2.jpg",
          "1280": "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/15aeaa6d-3f45-47e4-bff3-58ccc0f454c5/fuschia-dress-hero2.jpg",
          "1920": "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/49/7cc228d7-e435-4aa1-b70a-128508f08456/fuschia-dress-hero2.jpg",
          "2560": "https://vanda-production-assets.s3.amazonaws.com/2017/02/01/12/17/50/2965930c-892c-4962-bb2b-ac3de86674e6/fuschia-dress-hero2.jpg"
        },
      }
    }
  ]
}
