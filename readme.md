# V&A Visual Style Guide

View online at [vam-design-guide.surge.sh](https://vam-design-guide.surge.sh).

## Requirements

This visual style guide is built on top of [Fractal](https://github.com/frctl/fractal), a project by [Clearleft](http://clearleft.com/). For active development [Node.js](https://nodejs.org/) must be installed.

The [documentation for Fractal](http://fractal.build/guide) is *super* useful. Have a read through the *Core Concept* documentation before modifying.

## Including in other projects

Add the following to your project `package.json` file, replacing the branch name (i.e., #master) if required, with any feature branch name or commit Id in the vam-fractal project that you want to use:

```
"vam-fractal": "vanda/vam-fractal#master"
```

Component modules have their own SASS and can also contain Javascript files which are imported directly from the vam-fractal node-module installed as a dependency in your project `package.json` file. These assets should be compiled within the project itself.

Font and SVG (as an icon sprite) assets can be accessed by creation of symlinks.

SVGs:
```bash
ln -s node_modules/vam-fractal/build/svg/vam-sprite.svg assets/svg
```

Fonts:
```bash
ln -s node_modules/vam-fractal/build/fonts assets/
```

## Installation

After cloning this repository, in a terminal enter:

```bash
$ npm install
```

## Development

If you haven't read the [documentation for Fractal](http://fractal.build/guide) yet, get over there now.

In a terminal enter:

```bash
$ npm run dev
```

1. Compiled assets and other assets for distribution are linted and processed into a new root directory, `/build`
2. The Node.js environment variable is set to: `NODE_ENV=development` by prepending to the application initialisation command in `package.json`. Compiled assets are generated with code sourcemaps but are not minified for ease of investigation in development mode.
3. The Fractal server is started and a local build is rendered at [localhost:8000](http://localhost:8000) - change the port number in the root `fractal.config.js` if required
4. The local build runs Webpack in watch mode, meaning that any changes to the component module SASS or Javascript files will result in the compilation to `/build` being updated
5. The Fractal server is started with the `server.sync` property set to `true` so changes to component module files will also cause a page refresh in the browser using Fractal's [BrowserSync](https://www.browsersync.io/) integration

## Creating a Fractal 'static build'

A build intended for publication can be created and tested before uploading to Surge at [vam-design-guide.surge.sh](https://vam-design-guide.surge.sh)

In a terminal enter:

```bash
$ npm run build
```
1. Compiled assets and other assets for distribution are linted and processed into a new or existing root directory, `/build`
2. Node.js environment variable is set to: `NODE_ENV=production` and compiled assets are minified. No code sourcemaps are produced. Filenames are appended with a 'cache busting' hash number
3. A Fractal 'static build' is generated using the component modules and the generated assets in the `/build` directory. This is processed into a new root directoy, `/www` 

## Publishing a Fractal 'static build' to Surge

Ensure that you have access to deploy to Surge first.

In a terminal enter:

```bash
$ npm run pub
```

Upon successful authentication the 'static build' site is uploaded to [vam-design-guide.surge.sh](https://vam-design-guide.surge.sh)

## Adding a new Fractal component

New Fractal modular [components](http://fractal.build/guide/components) are added in `src/components`

1. Where the component contains a `_[name].scss` file, a reference to this stylesheet should be set in `src/assets/styles/vam-style.scss`.

   The Dart SASS compiler supports the [SASS-preferred](https://sass-lang.com/documentation/at-rules/at-rules) use of `@use` and `@forward` directives in place of the imminently deprecated `@import` statement. There should be no `@import` statements used in the project. Note that commonly used SASS stylesheets for base rules, mixins, etc. are organised in their own directories and loaded using a single entry-point file `_index.scss` within that directory. This allows these stylesheets to be namespaced and immediately identifiable in the component `_[name].scss` file.
   
   For example, in `_[name].scss`


   ```
   @use "[path]/base";

   .exmple-selector {
      @include base.typography-typeSetting(4, "regular");
   }
   ```
   Here we state that we want `_[name].scss` to be exposed to the `base` namespace. However, this namespace contains several stylesheets which themselves often contain groupings of variables, maps, functions and mixins, etc. 
   
   So to further define within `_[name].scss` the source of our required object, in this case the mixin `typeSetting()`, a single entry-point file at `src/components/base/_index.scss` uses the `@forward` directive to expose the SASS file at `src/components/base/typography_typography.scss` with an alias: `typography-`

   Use of an alias provides an immediate indication of the `typeSetting()` object location as being in the typography component stylesheet within the `base` namespace.

2. If the new component contains its own Javascript file in the form of `_[name].js` then this should be registered in `src/assets/scripts/vam-scripts.js` 

3. The `[name].html` document should use the [Nunjucks](https://mozilla.github.io/nunjucks/) Javascript templating language

4. Set variants of the component in the `[name].config.js` Fractal configuration file

## Adding a new SVG icon asset

To add a new SVG icon and add it to the SVG sprite:

1. Save the SVG file into the `src/assets/svg` directory
2. Edit `src/components/base/icons/icons.config.js`, adding the name of the icon taken from the filename to the array

If a development build has been run and Webpack is watching files in `src/assets` then the new SVG icon will be bundled immediately into the SVG sprite at `build/svg/vam-sprite.svg`

Running either the development build or creating a Fractal 'static build' will incorporate the new SVG icon into the SVG sprite. The SVG icon is optimised before addition into the sprite and the sprite itself is then minified for distribution.

## Acknowledgements

- [Clearleft](http://clearleft.com/)
- This set up has been heavily inspired by [Bits of 24 ways](http://bits.24ways.org/) by [Paul Robert Lloyd](https://github.com/paulrobertlloyd). Thank you.
