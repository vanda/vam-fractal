# V&A Typography - Spiller

## Font weight, size and line height

These three can all be set at the same time using the Sass mixin `typeSetting()`. You must provide both a size and weight for the correct line-height to be set. If no weight is provided the default is regular. Note that this mixin uses the weight specified in the arguments (or the base font weight which is `regular` if not provided) to generate a CSS `font-variation-settings` property rather than a `font-weight` property.

```sass
.foo {
  @include typeSetting(3);
}

.bar {
  @include typeSetting(7, bold);
}
```

There are nine different `font-sizes` with corresponding `line-height` values. The mixin will set the both as well as defining the value in `rem` units as well as `px` units as fallback.


## Font weight

There are four weights available to use: `light`, `regular`, `bold` and `x-bold`. Note that what the Spiller font calls `medium` is aliased by `bold` in Fractal, and what the Spiller font calls `bold` is aliased by `x-bold`.

If the need arises to override a font weight, the Spiller font weight needs to be declared using the `font-variation-settings` CSS property. This can be accessed through the Sass mixin `fontWeight()` which takes as an argument one of the four font weights detailed above. If no argument is provided the default becomes the base font weight which is `regular`. The mixin provides the full property declaration:

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


## Font family

The V&A font is called Spiller, and the `typeSetting()` mixin uses the basic Spiller font-family by default. The font family can be referenced by the Sass function `fontFamily()`:

```sass
.foo {
  font-family: fontFamily(text);
}
```

The `fontFamily()` map also includes a few other variants of the Spiller font family, none of which are used by default but are made available for design customisations relating to some exhibitions

```sass
.foo {
  font-family: fontFamily(SpillerContrast);
}
```


