# V&A Typography - Spiller

All functions, mixins, etc. referred to below are found in `src/components/base/typography/_typography.scss` 

## Font family

The V&A font is called Spiller. The font family can be referenced by the SASS function `fontFamily()`:

```sass
.foo {
  font-family: fontFamily(text);
}
```

The `fontFamily()` map also includes a monospaced family, however it isn't expected that it will be used often (if at all) outside of this document:

```sass
@use "[path]/base";

.bar {
  font-family: base.typography-fontFamily("code");
}
```
For details on the format of this SASS namespaced property please see the repository root ReadMe file.

## Font weight

There are four weights available to use: `light`, `regular`, `bold` and `x-bold`. These can be accessed through the SASS function `fontWeight()`:

```sass
@use "[path]/base";

.foo {
  font-weight: base.typography-fontWeight("x-bold");
}
```

Note that the function above will simply return a weight value mapped to the four available weights. However, when using the Spiller font the weight should be declared using the CSS `font-variation-settings` property. This can be accessed through the SASS mixin `fontWeight()` which takes as an argument one of the four font weights detailed above. If no argument is provided the default becomes the base font weight which is `regular`. The mixin provides the full property declaration:

```sass
@use "[path]/base";

.foo {
  @include base.typography-fontWeight("x-bold");
}
```
This is processed to:

```css
.foo {
  font-variation-settings: "wght" 600;
}
```

## Font weight, size and line height

These three can all be set at the same time using the SASS mixin `typeSetting()`. You must provide both a size and weight for the correct line-height to be set. If no weight is provided the default is regular. Note that this mixin uses the weight specified in the arguments (or the base font weight which is `regular` if not provided) to generate a CSS `font-variation-settings` property rather than a `font-weight` property.

```sass
@use "[path]/base";

.foo {
  @include base.typography-typeSetting(3);
}

.bar {
  @include base.typography-typeSetting(7, "semi-bold");
}
```

There are ten different `font-sizes` with corresponding `line-height` values. The mixin will set them both as well as defining the value in `rem` units and `px` units as fallback.
