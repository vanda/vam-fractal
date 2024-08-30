# Focus patterns (mixins)

## Background and usage

Mixins for applying focus patterns.

Any focusable elements commonly in use across our codebase should have our focus style set by default in `/base/reset/_reset.scss`.

Focus style is applied using the `:focus-visible` pseudo-class, thus only visible for appropriate user input modes, i.e. keyboard, not mouse.

## Implementation

```sass
@use "[path]/mixins";

.foo{
  &:focus-visible {
    @include mixins.focus-defaultFocus;
  }
}

.bar{
  &:focus-visible {
    @include mixins.focus-inlineFocus;
  }
}

.bar{
  &:focus-visible {
    @include mixins.focus-insetFocus;
  }
}
```

For details on the format of this SASS namespaced property please see the repository root ReadMe file.
