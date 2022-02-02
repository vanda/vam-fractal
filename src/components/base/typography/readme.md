# V&A Typography - Spiller

## Font family

The V&A font is called Spiller. The font family can be referenced by the Sass function `fontFamily()`:

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

These three can all be set at the same time using the Sass mixin `typeSetting()`. You must provide both a size and weight for the correct line-height to be set. If no weight is provided the default is regular.

```sass
.foo {
  @include typeSetting(3);
}

.bar {
  @include typeSetting(7, semi-bold);
}
```

There are nine different `font-sizes` with corresponding `line-height` values. The mixin will set the both as well as defining the value in `rem` units as well as `px` units as fallback.

