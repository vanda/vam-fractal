# Icon Sprite

## Note about the V&A logo
You will see that there are two copies of the V&A logo in the icon set. Most of the time `valogo` is the one that you will want to use, however the `valogo-clipped` icon should be used when you want to include the logo along the edge of another element - the bottom of the logo has been clipped to ensure that it sits well on the border of the element. You can see this in use as the main logo on the top of every page header on the V&A site.

## Note about Wordmark SVGs
In order for Wordmarks to scale properly they need `preserveAspectRatio="xMinYMax meet"` alongside a viewbox with `x=y=0`, i.e. `viewbox="0 0 w h"`

## Adding a new icon 
  ### Vector graphic preparation 
  1. In Sketch (or your prefered vector editor) resize your artboard to 100x100
  2. Ensure that there is no padding and that the icon design extends to the edges for accurate resizing purposes when the image is ultimately rendered
  3. Export your vector as a SVG file
  4. Check the SVG in a text editor - make sure that the 'fill' attribute is set to 'currentColor' so that the theme colour is inherited. Eg.

        ```html
        <?xml version="1.0" encoding="UTF-8"?>
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g id="south-kensington" fill="currentColor" fill-rule="nonzero">
            <path d="..."/>
          </g>
        </svg>
        ```

  ### Including the new icon
  1. Add the new icon to `/src/assets/svg` which is a directory polled by `watch()` in `gulpfile.js`
  2. SVG icon is optimised, processed in a `<symbol>` container with the icon `Id` and a `viewbox` attribute (position and dimensional information). Eg. 

        ```html
        <symbol id="south-kensington" viewBox="0 0 100 100"><path d="..." fill="currentColor"/></symbol>
        ```
  3. Gulp is automated to add the `<symbol>` container to the SVG sprite at `/tmp/assets/svg/svg-template.svg`
  4. Update the icon configuration file at `/src/components/base/icons/icons.config.js` with the new icon name (`<symbol> Id`)


  ### Previewing the new icon
  The new icon should be viewable along with existing icons in the [SVG sprite](http://localhost:8000/components/detail/icons--all) of a local build of vam-fractal.


  ### Distributing the updated icon sprite
  1. Execute `npm run build` so that the SVG sprite is copied into the `/dist/svg/` as `vamicons.svg` (Note: change of filename).
  2. Push the feature branch to the vam-fractal repository so that the new icon changes can be referenced by the name of the feature branch elsewhere.

## References

- [SVG 'symbol' a good choice for icons](https://css-tricks.com/svg-symbol-good-choice-icons/)
- [SVG4Everyone](https://www.npmjs.com/package/svg4everybody)
