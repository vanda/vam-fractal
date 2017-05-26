# Themed

This provides several utility classes to provide basic theming for elements. This is broken down into three main areas:

1. Text color (`s-themed--color`)
2. Background color (`s-themed--background-color`)
3. Border color (`s-themed--border-color`)

Based on the page theme color (applied in the body tag with `class="theme-peach"`) these utility classes will then modify the related element the correct theme.

```html
<h1 class="s-themed--color">
  This text will match the theme color of the page
</h1>
```

Each utility class has a matching `:hover` modifier to adjust the theme color as a user interacts with the element.

```html
<a class="btn s-themed--background-color s-themed--background-color--hover">
  This button will have a mouseover state
</a>
```

For more details about further uses and implementation of theming see [theme colors](/components/detail/theme-color).
