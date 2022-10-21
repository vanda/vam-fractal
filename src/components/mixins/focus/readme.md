# Focus patterns (mixins)

## Background and usage

Mixins for applying focus patterns.

## Implementation

```sass
@use "[path]/mixins";

.foo{
  @include mixins.focus-defaultFocus;
}

.bar{
  @include mixins.focus-insetFocus;
}
```

For details on the format of this SASS namespaced property please see the repository root ReadMe file.
