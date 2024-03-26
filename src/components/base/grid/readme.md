# Grid tools

## Background and usage

Mixins for creating grid containers

## Implementation

```sass
@use "[path]/base";

.foo {
  @include base.grid-gridContainer;
}

.bar {
  @include base.grid-colSpan(6);
}
```

For details on the format of this SASS namespaced property please see the repository root ReadMe file.
