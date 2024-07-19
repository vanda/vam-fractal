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

## Using SVG Icons directly in CSS
In order to reduce the need for including SVG markup, improving performance, maintainability and flexibility, the SVG Icons are made available to CSS by hard-coding a copy of each SVG Icon's symbol source into a CSS Custom Property in `base/icons/_icons.scss`, as a Data URI, which other styles can access from anywhere without further duplication. 

Currently the copy process is manual (see *ToDo* comment below), and the source of the SVG symbol should be copied from its built sprite-sheet (`build/svg/vam-sprite.svg`) where it will have been optimised by the `svgo` plugin. 

[See a simple useage example here](/components/detail/icons--css-icons)
styled as follows:
```css
.fr-css-icon-example {
  align-items: flex-start;
  color: red;
  display: flex;
  gap: 4px;

  &::before {
    background-color: currentColor;
    content: '';
    flex: 0 0 auto;
    height: 20px;
    mask: var(--icon-svg-pin) no-repeat;
    width: 20px;
  }
}
```
In order to allow for dynamic colouring of SVG Icons (which is not possible in the usual way for SVGs, as Data URIs in CSS), the Icon is implemnted as a **mask** on a pseudo-element. In this way the Icon can be coloured via the pseudo-element's background-color, which in turn inherits from it's parent's colour.

Further examples of these in use can be seen in [Button Icon component](/components/detail/button-icon).

CSS transformations can be used to minimise the need for superflous Icon styles. For e.g. a **point-right** SVG Icon can be achieved by rotating the **point-left** SVG Icon, without the need for an additional **point-right** SVG Icon.

  ### Accessibility
  A `title` attribute should be added to inform screenreader and visible users alike (via hover tooltip) of the Icon's intended meaning.

  ### ToDo
  Have Fractal write out these SVG Icon CSS Custom Properties automatically on adding new SVG Icon assets, as part of the build process.

  As a further improvement, we aim to make the Icons directly accessible from the SVG sprite-sheet, via the symbols' fragment identifiers (e.g. `vam-sprite.svg#icon-name`), in the same way HTML is able to. This will require adding an extra clever step to the SVG build process to programatically include appropriate `view` & `use` tags into the sprite-sheet for each Icon symbol. 
  https://stackoverflow.com/a/49338546

## References
- [SVG 'symbol' a good choice for icons](https://css-tricks.com/svg-symbol-good-choice-icons/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
