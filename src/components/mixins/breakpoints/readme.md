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

- `bp-min-x-small` / `bp-max-x-small`
- `bp-min-small` / `bp-max-small`
- `bp-min-medium` / `bp-max-medium`
- `bp-min-large` / `bp-max-large`

They can be used as follows:

```sass
.foo {
  padding: 1em;

  @include bp-min-x-small {
    padding: 1.2em;
  }

  @include bp-min-small {
    padding: 1.4em;
  }

  @include bp-min-medium {
    padding: 1.6em;
  }

  @include bp-min-large {
    padding: 2em;
  }
}
```

## References
