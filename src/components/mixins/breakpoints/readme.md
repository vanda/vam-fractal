# Breakpoints

## Background and useage

There are four defined breakpoint sizes:

1. 500px (`x-small`)
2. 768px (`small`)
3. 992px (`medium`)
4. 1200px (`large`)

## Implementation

The breakpoints can be accessed by the SASS function `bp()` in `src/components/mixins/breakpoints/_breakpoints.scss`. Eg:

```sass
@use "[path]/mixins";

.foo {
  @media (min-width: mixins.breakpoints-bp("x-small")) {
    background-color: red;
  }
}
```
For details on the format of this SASS namespaced property please see the repository root ReadMe file.

Alternatively the following mixins provide a shorthand for this:

- `bpMinXSmall` / `bpMaxXSmall`
- `bpMinSmall` / `bpMaxSmall`
- `bpMinMedium` / `bpMaxMedium`
- `bpMinLarge` / `bpMaxLarge`

They can be used as follows:

```sass
@use "[path]/mixins";

.foo {
  padding: 1em;

  @include mixins.breakpoints-bpMinXSmall {
    padding: 1.2em;
  }

  @include mixins.breakpoints-bpMinSmall {
    padding: 1.4em;
  }

  @include mixins.breakpoints-bpMinMedium {
    padding: 1.6em;
  }

  @include mixins.breakpoints-bpMinLarge {
    padding: 2em;
  }
}
```

## References
