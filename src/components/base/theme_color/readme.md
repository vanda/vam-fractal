# Theme colors

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

As with `site_color`, `theme_color` exists as a Sass map and can be accessed via `map-get`:

```sass
.foobar {
  background-color: map-get($theme_colors, strawberry);
  border-color: map-get($theme_colors, strawberry);
}
```

You may _need_ to loop through each of the theme colors to generate specifically themed components. This should be used sparingly as it will bloat the CSS. Instead try and rely on the helper classes.

```sass
.foobar {
  @each $color in map-keys($theme-colors) {
    .theme-#{$color} & {
      background-color: map-get($theme-colors, $color);
    }
  }
}
```

In the `theme-color` Sass file is also map of the pale colors which can cause accessibility issues on light backgrounds. This is accessed through `$pale-colors`, it can be used to loop through or to check if the color appears in the list:

```sass
  @each $color in map-keys($theme-colors) {
    &.theme-#{$color} {
      @if $color in $pale-themes {
        border-color: darken(map-get($theme-colors, $color), 30);
      } @else {
        border-color: map-get($theme-colors, $color);
      }
    }
  }
```

```sass
.foobar {
  @each $color in $pale-themes {
    .theme-#{$color} & {
      border-color: darken(map-get($theme-colors, $color), 30);
    }
  }
}
```

**Nb:** Be aware the removing items from this list would cause themed elements to revert back to the default colour.
