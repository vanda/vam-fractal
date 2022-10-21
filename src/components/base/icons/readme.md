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
  To add a new SVG icon and add it to the SVG sprite:

  1. Save the SVG file into the src/assets/svg directory
  
     If a development build has been run and Webpack is watching files in `src/assets` then the new SVG icon will be bundled immediately into the SVG sprite at `build/svg/vam-sprite.svg`

     Running either the development build or creating a Fractal 'static build' will incorporate the new SVG icon into the SVG sprite. 

     The SVG icon is optimised before addition into the sprite and processed in a `<symbol>` container with the icon `Id` and a `viewbox` attribute (position and dimensional information). Eg. 

     ```html
     <symbol id="south-kensington" viewBox="0 0 100 100"><path d="..." fill="currentColor"/></symbol>
     ```

     The SVG icon is optimised before addition into the sprite and the sprite itself is then minified for distribution.
  
  2. Edit `src/components/base/icons/icons.config.js`, adding the name of the icon taken from the `<symbol>` 'id' attribute to the array

  ### Previewing the new icon
  The new icon should be viewable along with existing icons in the SVG sprite of a local build of vam-fractal at `build/svg/vam-sprite.svg`.

## References

- [SVG 'symbol' a good choice for icons](https://css-tricks.com/svg-symbol-good-choice-icons/)
- [SVG4Everyone](https://www.npmjs.com/package/svg4everybody)
