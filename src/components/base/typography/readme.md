# V&A Typography - The Sans

## Font family

The V&A font is a modified version of The Sans. The font family can be referenced with by the `$font-families` Sass map:

```sass
.foo {
  font-family: map-get($font-families, text);
}
```

The `$font-families` map also includes a monospaced family, however it isn't expected that it will be used often (if at all) outside of this document:

```sass
.bar {
  font-family: map-get($font-families, code);
}
```

## Font weight

There are four weights avalible to use: `light`, `regular`, `semi-bold` and `bold`. They are accessed through to Sass map `$font-weights`:

```sass
.foo {
  font-weight: map-get($font-weights, semi-bold);
}
```

## Font size and line height

Font size and line height can be set using the `type-rhythm` mixin.

```sass
.foo {
  @include type-rhythm(3);
}
```

There are nine different `font-sizes` with corresponding `line-height` values. The mixin will set the both as well as defining the value in `rem` units as well as `px` units as fallback.
