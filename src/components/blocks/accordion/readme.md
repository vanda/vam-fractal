# Accordion
This Accordion is of the "inclusive" type, allowing multiple sections to be opened at once, so it is just a series of styled `<details>` disclosure elements. 
These are fully accessible, and their undisclosed content is still findable. They are also not reliant on script, whereas a custom-built alternative would have to use script to collapse it initially, with bad consequences for layout shift in the page. 
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
  

## Background
Required to better present information, like FAQs, particularly on info pages.
  

## Implementation
Unfortunately, at this time, there's no built-in way to animate the transition between open and closed states. There are styles for animation included in the CSS, but due to the `<details>` element being rendered in the shadow DOM, these styles are not fully inherited. However, by including this component's JS module, the element can be nudged into taking the animation styles.
  


