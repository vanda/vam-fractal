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

     Running either the development build or creating a Fractal 'static build' will incorporate the new SVG icon into the SVG sprite in the format detailed below. 

     The SVG icon is optimised before addition into the sprite and processed in a `<symbol>` container with the icon `id` and a `viewbox` attribute (position and dimensional information). Note that the associated `view` and `use` elements also contain vertical, incremental positional data for the icon within the SVG sprite. The `id` of the `<view>` is the symbol fragment identifier or reference used in the CSS, `calendar-view` in this case.
     
     Eg. 

     ```html
     <view xmlns="http://www.w3.org/2000/svg" id="calendar-view" viewBox="0 975 16 16"/>
     <use xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#calendar" x="0" y="975" width="16" height="16"/>
     <symbol xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" id="calendar">
      <path fill="currentColor" fill-rule="evenodd" d="..." clip-rule="evenodd"/>
     </symbol>
     ```

  
  2. Edit `src/components/base/icons/icons.config.js`, adding the name of the icon taken from the `<symbol>` 'id' attribute to the array

  ### Previewing the new icon
  The new icon should be viewable along with existing icons in the SVG sprite of a local build of vam-fractal at `build/svg/vam-sprite.svg`.

  It may also be previewed within Fractal at [http://localhost:8000/components/detail/icons--all](http://localhost:8000/components/detail/icons--all) during development or at [https://vam-fractal-main.surge.sh/components/detail/icons--all](https://vam-fractal-main.surge.sh/components/detail/icons--all) when deployed to Surge.

## Using SVG Icons directly in CSS
In order to reduce the need for including SVG markup, improving performance, maintainability and flexibility, the SVG Icons are made available to CSS through the sprite symbol fragment identifier.

See a simple locally served useage example here: [http://localhost:8000/components/detail/icons--css-icons](http://localhost:8000/components/detail/icons--css-icons) styled as follows:
```css
.fr-css-icon-fragment-identifier-example {
  align-items: flex-start;
  color: rebeccapurple;
  display: flex;
  gap: 4px;

  &::before {
    background-color: currentColor;
    content: '';
    flex: 0 0 auto;
    height: 20px;
    width: 20px;
  }

  &--pin {
    &::before {
      mask: url('../svg/vam-sprite.svg#pin-view') no-repeat;
    }
  }
}
```
In this particular example we are targeting the `pin-view` symbol fragment identifier in the SVG sprite.

In order to allow for dynamic colouring of SVG icons, the icon is implemented as a **mask** on a pseudo-element. In this way the icon can be coloured via the pseudo-element's `background-color` property, which in turn inherits from its parent's colour.

Further examples of these in use can be seen in [Button Icon component](/components/detail/button-icon).

CSS transformations can be used to minimise the need for superflous Icon styles. For e.g. a **point-right** SVG Icon can be achieved by rotating the **point-left** SVG Icon, without the need for an additional **point-right** SVG Icon.

  ### Accessibility
  A `title` attribute should be added to inform screenreader and visible users alike (via hover tooltip) of the Icon's intended meaning.

## References
- [SVG 'symbol' a good choice for icons](https://css-tricks.com/svg-symbol-good-choice-icons/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
