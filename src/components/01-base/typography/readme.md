# V&A Typography - The Sans

## Font family

The V&A font is a modified version of The Sans. The font family can be referenced by the Sass function `fontFamily()`:

```sass
.foo {
  font-family: fontFamily(text);
}
```

The `fontFamily()` map also includes a monospaced family, however it isn't expected that it will be used often (if at all) outside of this document:

```sass
.bar {
  font-family: fontFamily(code);
}
```

## Font weight

There are four weights avalible to use: `light`, `regular`, `semi-bold` and `bold`. These can be accessed through the Sass function `fontWeight()`:

```sass
.foo {
  font-weight: fontWeight(semi-bold);
}
```

## Font weight, size and line height

These three can all be set at the same time using the Sass mixin `type-setting()`. You must provide both a size and weight for the correct line-height to be set. If no weight is provided the default is regular.

```sass
.foo {
  @include type-setting(3);
}

.bar {
  @include type-setting(7, semi-bold);
}
```

There are nine different `font-sizes` with corresponding `line-height` values. The mixin will set the both as well as defining the value in `rem` units as well as `px` units as fallback.

## Uppercase

Uppercase typography is used for headings, navigation text and buttons. It is only used in a semi-bold and bold weight. This is also accessible through the `type-setting()` mixin:

```sass
.foo {
  @include type-setting(5, bold, uppercase);
}
```
