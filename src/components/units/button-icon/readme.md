# Icon Buttons
For styling roundel icon buttons.

## Background
Generally used for things like Navigation and Viewer controls.

## Techincal information
This component utilises the SVG Icon CSS variables ("Custom Properties") as defined in `base/icons/_icons.scss`. 

CSS transformations are used to minimise the need for superflous Icon styles. For e.g. a **point-right** Icon Button is achieved by rotating the **point-left** SVG Icon, without the need for an additional **point-right** SVG Icon.

In order to allow for dynamic colouring of SVG Icons (which is not possible in the usual way for SVGs, as Data URIs in CSS), the Icon is implemnted as a **mask** on a pseudo-element. In this way the Icon can be coloured via the pseudo-element's background-color, which in turn inherits from it's parent `u-btn-icon`'s colour.

## Accessibility
The Button text serves as its label, which should be meaningful as such. It is visibly hidden by CSS. A `title` attribute should also be added to inform visible users of the Icon's meaning, via hover tooltip.


## Implementation & Customisation
If there is not a class already available for an Icon Button with a particular Icon, it may be worth adding a new class, by duplicating and adjusting one of the existing classes, such as `u-btn-icon--close`. If the Icon itself is not yet available via a preset CSS variable defined in `base/icons/_icons.scss` it will need to be added. 

Icon Button styles are made to be flexible and easily customisable, via their own set of CSS Custom Properties. A one-off button can easily be created by adding a default Icon Button to a project and providing style overrides, for e.g. 
[The custom Icon Button](/components/detail/button-icon--custom-example) is created as follows:
```html
<button class="u-btn-icon fr-custom-icon-button-eg" title="Descriptive button label">
  Descriptive button label
</button>
```
then customising any of its colours, icon, and size, by setting its own CSS Custom Properties, e.g.
```css
.fr-custom-icon-button-eg {
  --btn-bg: yellow  ;
  --btn-color: red;
  --btn-size: 30px;
  --btn-icon-size: 50%;
  --btn-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor'%3E%3Cpath d='M3 1.6a.25.25 0 0 0-.25.25v9.55c0 .09.048.172.125.217l4.859 2.802a.25.25 0 0 0 .245.003l5.141-2.817a.25.25 0 0 0 .13-.22V1.85A.25.25 0 0 0 13 1.6H3Zm-1.75.25C1.25.884 2.034.1 3 .1h10c.966 0 1.75.784 1.75 1.75v9.536a1.75 1.75 0 0 1-.909 1.534L8.7 15.738a1.75 1.75 0 0 1-1.716-.02l-4.858-2.802A1.75 1.75 0 0 1 1.25 11.4V1.85ZM5 4.35a.75.75 0 0 1 .75-.75h4.615a.75.75 0 0 1 .75.75v6.096a.75.75 0 0 1-.414.671l-2.308 1.154a.75.75 0 0 1-.67 0l-2.308-1.154a.75.75 0 0 1-.415-.67v-.578a.75.75 0 1 1 1.5 0v.114l1.558.778 1.557-.778V8.312H7a.75.75 0 1 1 0-1.5h2.615V5.1H5.75A.75.75 0 0 1 5 4.35Z'/%3E%3C/svg%3E");

  &:hover,
  &:active {
    &:enabled {
      background-color: red;
      color: yellow;
    }
  }
}
```

## References
[CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)