---
title: V&A Visual Style Guide
label: V&A Visual Style Guide
---

## Introduction

A visual style guide for V&A front-end components. The public Github repository for this project is at: [https://github.com/vanda/vam-fractal/](https://github.com/vanda/vam-fractal/)

## Including in other projects

Add the following to your project `package.json` file, replacing the branch name (i.e., #main) if required, with any feature branch name or commit ID in the vam-fractal project that you want to use:

```json
"vam-fractal": "vanda/vam-fractal#main"
```

Component modules have their own SASS and can also contain Javascript files which are imported directly from the vam-fractal node-module directory installed as a dependency in your project `package.json` file. These assets should be compiled as required within the project itself.

Font and SVG (as an icon sprite) assets can be accessed by creation of symlinks. For example,

SVGs:
```bash
ln -s node_modules/vam-fractal/build/svg/vam-sprite.svg assets/svg
```

Fonts:
```bash
ln -s node_modules/vam-fractal/build/fonts assets/fonts
```
