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

A theme colour applied to any element (with a class in the format `theme-<colour-name>`) will set the theme colour for that element and its descenedants using CSS variables (custom properties). 

**ALL theme colours must be uniquely named!**

```html
<body class="theme-strawberry">
  ...
</body>
```

Elements with a theme set can then be styled to use that theme colour. 

```html
<svg class="logo s-themed--color">
  ...
</svg>
```

For more deatils on this, see [themed](/components/detail/themed).

As with the `site-color` component in the SASS `base` namespace, `theme-color` exists as a SASS map and can be accessed via `map.get`. Note that `sass:map` is now a built-in module that needs to be exposed to the stylesheet before any map functions can be used.

**Nb:** Be aware the removing items from this list would cause themed elements to revert back to the default colour.

## References

- [SASS lists](https://sass-lang.com/documentation/modules/list)
- [SASS maps](https://sass-lang.com/documentation/modules/map)
- [SASS index function](https://sass-lang.com/documentation/values/lists#indexes)
