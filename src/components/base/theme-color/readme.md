# Theme colors

## Background and usage

Theme colours can be referenced with the SASS function `themeColor()`:

```sass
@use "[path]/base";

.foobar {
  color: base.themecolors-themeColor("strawberry");
}
```
For details on the format of this SASS namespaced property please see the repository root ReadMe file.

## Implementation

The theme color is defined in the body of a page and then sets the color scheme on a page:

```html
<body class="theme-strawberry">
  ...
</body>
```

Specific elements within a page can then inherit the theme color.

```html
<svg class="logo themed--color">
  ...
</svg>
```

As with the `site-color` component in the SASS `base` namespace, `theme-color` exists as a SASS map and can be accessed via `map.get`. Note that `sass:map` is now a built-in module that needs to be exposed to the stylesheet before any map functions can be used.

You may _need_ to loop through each of the theme colors to generate specifically themed components. This should be used sparingly as it will bloat the CSS. Instead try and rely on the helper classes.

```sass
@use "sass:map";

.foobar {
  @each $color in map.keys(base.$themecolors-theme-colors) {
    .theme-#{$color} & {
      background-color: map.get(base.$themecolors-theme-colors, $color);;
    }
  }
}
```

The `_theme-color.scss` SASS file also contains a [list](https://sass-lang.com/documentation/values/lists) of the `$pale-theme-colors` which can cause accessibility issues on light backgrounds. Reference to this list can be used to override or adjust the theme color:

```sass
@use "sass:map";
@use "sass:color";

@each $color in map.keys(base.$themecolors-theme-colors) {
  &.theme-#{$color} {
    @if index(base.$themecolors-pale-theme-colors, $color) {
      border-color: color.scale(map.get(base.$themecolors-theme-colors, $color), $lightness: -30%);
    } @else {
      border-color: map.get(base.$themecolors-theme-colors, $color);
    }
  }
}
```

**Nb:** Be aware the removing items from this list would cause themed elements to revert back to the default colour.

## References

- [SASS lists](https://sass-lang.com/documentation/modules/list)
- [SASS maps](https://sass-lang.com/documentation/modules/map)
- [SASS index function](https://sass-lang.com/documentation/values/lists#indexes)
