# Breakpoints

## Background and useage

There are four defined breakpoint sizes:

1. 500px (`x-small`)
2. 768px (`small`)
3. 992px (`medium`)
4. 1200px (`large`)

## Implementation

The breakpoints can be accessed by the Sass function `bp()`. Eg:

```sass
.foo {
  @media (min-width: bp(x-small)) {
    background-color: red;
  }
}
```

Alternatively the following mixins provide a shorthand for this:

- `bpMinXSmall` / `bpMaxXSmall`
- `bpMinSmall` / `bpMaxSmall`
- `bpMinMedium` / `bpMaxMedium`
- `bpMinLarge` / `bpMaxLarge`

They can be used as follows:

```sass
.foo {
  padding: 1em;

  @include bpMinXSmall {
    padding: 1.2em;
  }

  @include bpMinSmall {
    padding: 1.4em;
  }

  @include bpMinMedium {
    padding: 1.6em;
  }

  @include bpMinLarge {
    padding: 2em;
  }
}
```

## References
