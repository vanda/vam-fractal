# Themed

This provides several utility classes to provide basic theming for elements. This is broken down into three main areas:

1. Text colour (`s-themed--color`)
2. Background colour (`s-themed--background-color`)
3. Border colour (`s-themed--border-color`)

These utility classes will colour the specific aspects of an element, based on its theme colour (applied with a class in the format `theme-<colour-name>` either directly to an element or via one of its ancestors, see [theme colors](/components/detail/theme-color)).

```html
<h1 class="s-themed--color">
  This text will match the theme color of the page
</h1>
```

Each utility class has a matching `--hover` modifier to be applied optionally for adjusting the theme colour on hover interaction.

```html
<a class="btn s-themed--background-color s-themed--background-color--hover">
  This button will have a mouseover state
</a>
```

