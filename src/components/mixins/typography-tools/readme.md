# Typography tools

## Background and usage

Mixin to convert pixel values to rem values based on a baseline pixel value and with a pixel fallback for older user agents. The rem() mixin takes a CSS property to which the calculated value is set and a pixel value as arguments.

## Implementation

```sass
@use "[path]/mixins";

.foo{
  @include mixins.typographytools-rem(top, 10px);
}
```

For details on the format of this SASS namespaced property please see the repository root ReadMe file.

## References

- [https://github.com/bitmanic/rem](https://github.com/bitmanic/rem)
