# Icon Sprite

## Background

...

## Note about the V&A logo

You will see that there are two copies of the V&A logo in the icon set. Most of the time `valogo` is the one that you will want to use, however the `valogo-clipped` icon should be used when you want to include the logo along the edge of another element - the bottom of the logo has been clipped to ensure that it sits well on the border of the element. You can see this in use as the main logo on the top of every page header on the V&A site.

## Note about Wordmark SVGs

In order for Wordmarks to scale properly they need `preserveAspectRatio="xMinYMax meet"` alongside a viewbox with `x=y=0`, i.e. `viewbox="0 0 w h"`

## Implementation

### Adding a new icon

1. In Sketch (or your prefered vector editor) resize your artboard to 100x100.
2. Export your vector as an `svg`.
3. Add each new icon to `/src/assets/svg`

The new icon will be added to the `svg` sprite.

### Including a new icon

```html
<div class="container">
  <svg role="img">
    <use xlink:href="/assets/svg/svg-template.svg#square"></use>
  </svg>
</div>
```

To get the icon to inherit the theme color replace the `fill` color with `currentColor`. Eg:

```svg
<symbol id="instagram" viewBox="0 0 100 100">
  <path fill="currentColor" ... ></path>
</symbol>
```

## References

- [SVG 'symbol' a good choice for icons](https://css-tricks.com/svg-symbol-good-choice-icons/)
- [SVG4Everyone](https://www.npmjs.com/package/svg4everybody)
