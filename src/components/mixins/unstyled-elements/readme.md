# Unstyled elements

## Background and usage

Reset styling of specific elements to the local reset or default user-agent styling.

## Implementation

Unstyled input (mixin). Resets an input (`button` or `a`) to appeared unstyled

```sass
@use "[path]/mixins";

.foo{
  @include mixins.unstyledelements-unstyled-input;
}
```
Unstyled list (mixin). Resets a list (`ol` or `ul`) to appeared unstyled

```sass
@use "[path]/mixins";

.foo{
  @include mixins.unstyledelements-unstyledList;
}
```
For details on the format of this SASS namespaced property please see the repository root ReadMe file.

## References

- [Made by Many css patterns](http://madebymany.github.io/css-patterns/#mixin-unstyled-list)
