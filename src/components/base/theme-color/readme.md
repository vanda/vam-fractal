# Theme colors

## Background and usage

Theme colours can be referenced with the Sass function `themeColor()`:

```sass
.foobar {
  color: themeColor(strawberry);
}
```

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

As with `site_color`, `theme_color` exists as a Sass map and can be accessed via `map-get`:

```sass
.foobar {
  background-color: themeColor(strawberry);
  border-color: themeColor(strawberry);
}
```

You may _need_ to loop through each of the theme colors to generate specifically themed components. This should be used sparingly as it will bloat the CSS. Instead try and rely on the helper classes.

```sass
.foobar {
  @each $color in map-keys($theme-colors) {
    .theme-#{$color} & {
      background-color: themeColor($color);
    }
  }
}
```

The `_theme_color.scss` Sass file also contains a [list](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) of the `$pale-theme-colors` which can cause accessibility issues on light backgrounds. It can be used to override or adjust the theme color:

```sass
  @each $color in map-keys($theme-colors) {
    &.theme-#{$color} {
      @if index($pale-themes, $color) {
        border-color: darken(themeColor($color), 30);
      } @else {
        border-color: themeColor($color);
      }
    }
  }
```

```sass
.foobar {
  @each $color in $pale-themes {
    .theme-#{$color} & {
      border-color: darken(themeColor($color), 30);
    }
  }
}
```

**Nb:** Be aware the removing items from this list would cause themed elements to revert back to the default colour.

## References

- [Sass lists](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#lists)
- [Sass maps](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps)
- [Sass index function](http://sass-lang.com/documentation/Sass/Script/Functions.html#index-instance_method)
