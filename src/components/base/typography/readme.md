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

There are five weights available to use: `light`, `regular`, `semi-bold`, `bold` and `x-bold`. These can be accessed through the Sass function `fontWeight()`:

```sass
.foo {
  font-weight: fontWeight(semi-bold);
}
```

Note that the function above will simply return a weight value mapped to the five available weights. However, when using the Spiller font the weight should be declared using the CSS `font-variation-settings` property. This can be accessed through the Sass mixin `fontWeight()` which takes as an argument one of the five font weights detailed above. If no argument is provided the default becomes the base font weight which is `regular`. The mixin provides the full property declaration:

```sass
.foo {
  @include fontWeight(x-bold);
}
```
This is processed to:

```css
.foo {
  font-variation-settings: "wght" 600;
}
```

## Font weight, size and line height

These three can all be set at the same time using the Sass mixin `typeSetting()`. You must provide both a size and weight for the correct line-height to be set. If no weight is provided the default is regular. Note that this mixin uses the weight specified in the arguments (or the base font weight which is `regular` if not provided) to generate a CSS `font-variation-settings` property rather than a `font-weight` property.

```sass
.foo {
  @include typeSetting(3);
}

.bar {
  @include typeSetting(7, semi-bold);
}
```

There are nine different `font-sizes` with corresponding `line-height` values. The mixin will set the both as well as defining the value in `rem` units as well as `px` units as fallback.

