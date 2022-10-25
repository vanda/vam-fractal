---
title: SASS & CSS
label: SASS & CSS
---

## Linting and code conventions

The SASS is linted via [stylelint](https://stylelint.io/). The configuration and custom rule set is found in `/.stylelint.json`. When modifying or adding to the SASS please read through [the documentation around the rules](https://stylelint.io/user-guide/rules). 

The standard shareable SASS configuration for styleint, [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss) is used. In an effort to adhere to this standard please only add to the `/.stylelint.json` configuration if agreed and absolutely necessary. The same applies to inline overrides which can leave technical debt in the codebase.

The deployment and distribution will fail if the SASS linting fails.

## Namespacing between SASS stylesheets

The Dart SASS compiler supports the [SASS-preferred](https://sass-lang.com/documentation/at-rules/at-rules) use of `@use` and `@forward` directives in place of the imminently deprecated `@import` statement. There should be no `@import` statements used in the project. Note that commonly used SASS stylesheets for base rules, mixins, etc. are organised in their own directories and loaded using a single entry-point file `_index.scss` within that directory. This allows these stylesheets to be namespaced and immediately identifiable in the component `_[name].scss` file.
   
For example, in `_[name].scss`

```
@use "[path]/base";

.example-selector {
  @include base.typography-typeSetting(4, "regular");
}
```
Here we state that we want `_[name].scss` to be exposed to the `base` namespace. However, this namespace contains several stylesheets which themselves often contain groupings of variables, maps, functions and mixins, etc. 

So to further define within `_[name].scss` the source of our required object, in this case the mixin `typeSetting()`, a single entry-point file at `src/components/base/_index.scss` uses the `@forward` directive to expose the SASS file at `src/components/base/typography_typography.scss` with an alias: `typography-`

Use of an alias provides an immediate indication of the `typeSetting()` object location as being in the typography component stylesheet within the `base` namespace.

Note that there are several [built-in namespaced modules](https://sass-lang.com/documentation/modules) within SASS itself which may be exposed within the V&A components.

## Namespacing naming conventions within the stylesheets

- `b- `: A _block_ of user interface such as the icon list (`b-icon-list`)
- `u- `: A _unit_ of user interface such as a button (`.u-btn`)
- `s- `: A _service_ class (sometimes called a utility class).
- `is-`, `has-`: Temporary state of the UI such as `.is-open`, `.is-updating` or `.has-dropdown`
- `js-`: Reserved hook for JavaScript
- `qa-`: Reserved hook for automated tests
- `fr-`: This is an additional namespace used solely within this documentation - it is used to indicate that the style is for the layout and presentation of this guide and is therefore _not_ in the main V&A stylesheet.

## References

- [More transparent UI code with namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
- [SASS at-rules to implement namespacing](https://sass-lang.com/documentation/at-rules)
