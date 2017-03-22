---
title: Sass & CSS
label: Sass & CSS
---

## Linting

Sass is linted via [sass-lint](https://github.com/sasstools/sass-lint/tree/master). The config and rule set is found in `/.sass-lint`. Before modifying any of the Sass it is advised that you read through [the documentation around the rules](https://github.com/sasstools/sass-lint/blob/master/docs/rules/).

The deploy and distribution will fail if the Sass linting fails.

## Namespacing

- `b- `: A _block_ of user interface such as an `icon-list`
- `is-`, `has-:`
- `js-`: Reserved hook for JavaScript
- `qa-`: Reserved hook for automated tests
- `fr-`: This is an additional namespace used solely within this documentation - it is used to indicate that the style is for the layout and presentation of this guide and is therefore _not_ in the main V&A stylesheet.

## References

- [More transparent UI code with namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
