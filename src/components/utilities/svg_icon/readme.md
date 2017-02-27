# SVG Icon

This is a utility class used to hide the SVG sprite icons. It does _"one thing in a very heavy-handed and inelegant way"_ - namely hide the icon set.

It is added to the top of the SVG icon set to ensure that it does not appear on screen until a specific symbol in the SVG sprite is referenced. There is no reason why this class should _ever_ be used outside of this context.

## Implementation

```svg
<svg class="u-svg-icon">
  ...
</svg>
```

## References

- [Hiding the SVG](https://www.npmjs.com/package/gulp-svg-symbols#svgclassname)
- [Utility classes](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/#utility-namespaces-u-)

