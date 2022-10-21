# Element visibility (mixins)

## Background and usage

Mixins for hiding elements completely or without hiding them from screen readers or crawlers.

## Implementation

```sass
@use "[path]/mixins";

.foo{
  @include mixins.elementvisibility-visuallyHidden;
}

.bar{
  @include mixins.elementvisibility-hidden-all;
}
```

For details on the format of this SASS namespaced property please see the repository root ReadMe file.

## References

- [Made by Many css patterns](https://github.com/madebymany/css-patterns/blob/master/stylesheets/patterns/_visually_hidden.scss)
- [Hiding content for accessibility](https://snook.ca/archives/html_and_css/hiding-content-for-accessibility)
