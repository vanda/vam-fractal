# Site colours

## Background and usage

These are the colours that are used across the site for core modules. This is distinct from theme colours.

Site colours can be referenced with the SASS function `siteColor()`:

```sass
@use "[path]/base";

.foobar {
  background-color: base.sitecolors-siteColor("primary-green");
}
```
For details on the format of this SASS namespaced property please see the repository root ReadMe file.
