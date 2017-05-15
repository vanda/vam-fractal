# Object fit Polyfill

We use `object-fit` to create the create large responsive background images within things like the promo block. Older browsers (unsurprisingly) don't like it so we have a slightly hacky polyfill for it.

On the parent of the element that uses `object-fit: cover` also add the class `js-object-fit-container`. If the browser doesn't support `object-fit` (checked via Modernizr) then the image will be included as a background image instead.

## References

- [CSS Tricks Almanac: object-fit](https://css-tricks.com/almanac/properties/o/object-fit/)
- [V&A Modernizr Build](https://modernizr.com/download?flexbox-objectfit-dontmin-setclasses)
