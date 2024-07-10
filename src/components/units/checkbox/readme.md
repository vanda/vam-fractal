# Checkbox
This Unit provides styling for 2 variants of `input[type="checkbox"]` element. 

## Implementation
Only the styling for the checkbox Unit element is provided with this component, i.e. the default `u-checkbox` class for our custom Tick style, plus the variant `u-checkbox u-checkbox--toggle` for our Toggle style. 

The example shows each variant, and provides guidance on how to lay out the inputs with associated labels. Semantically, it is advised to have checkbox & radiobuttons preceeding their labels. In cases where the UI requires label-first layout, `flex-direction: row-reverse` can be applied to the container.

Each variant is styled to appear on a dark background by default, but all colours can be overridden using the associated CSS variables (custom properties) `--input--border`, `--input-background`, `--input-color`.
