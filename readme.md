# V&A Visual Style Guide

View online at [vam-design-guide.surge.sh](https://vam-design-guide.surge.sh).

## Requirements

This visual style guide is built on top of [Fractal](https://github.com/frctl/fractal), a project by [Clearleft](http://clearleft.com/). For active development [Node.js](https://nodejs.org/) must be installed.

The [documentation for Fractal](http://fractal.build/guide) is *super* useful. Have a read through the *Core Concept* documentation before modifying.

## Including in your project

Add the following to your `package.json` file, replacing the version number with the version that you want to use:

```
"vam-fractal": "vanda/vam-fractal#0.1.0"
```

You can then import the Sass directly into your stylesheet either by directly referencing the `node_modules` folder or by creating a symlink.

```sass
@import 'vam-fractal/dist/css/vam-style';
```

Create a symlink:
```bash
ln -s node_modules/vam-fractal/dist/css/vam-style.css assets/css
ln -s node_modules/vam-fractal/dist/svg/vamicons.svg assets/svg
```

Fonts are also included in this project too but in a different location:
```bash
ln -s node_modules/vam-fractal/src/fonts assets/
```

TODO: Get gulp to create a relative symlink from fonts in the the `dist` folder

## Development

If you haven't read the [documentation for Fractal](http://fractal.build/guide) yet, get over there now.

Each time you create a new Fractal [component](http://fractal.build/guide/components) with a `SCSS` file in it, you will need to also include that within `src/assets/styles/vam-style.scss`.

1. `$ npm install`
2. `$ npm run dev`
3. Open your browser to [localhost:8000](http://localhost:8000)

## Deployment

Ensure that you have access to deploy to Surge first.

1. `$ npm run deploy`
2. Open your browser to [vam-design-guide.surge.sh](https://vam-design-guide.surge.sh)

## Acknowledgements

- [Clearleft](http://clearleft.com/)
- This set up has been heavily inspired by [Bits of 24 ways](http://bits.24ways.org/) by [Paul Robert Lloyd](https://github.com/paulrobertlloyd). Thank you.
