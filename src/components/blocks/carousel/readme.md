# Carousel

## Background

The default Carousel block is a native scrollable element, for use in most cases. There is some coplicated CSS required to acheive the alignment required of its left/right edges to the containing template, with extra visible overflow allowed off the right-hand edge into any space available. The Carousel is reponsive to both viewport width and its own content length. JS is required to detect whether/which Carousel controls are appropriate, and to make keyboard navigation fully accessible and optimal.

The `--unclipped` variant is so named because by design its overflowing content remains visible in all of the space available to it, for e.g as on the [Venue Hub pg](https://www.vam.ac.uk/east).
This poses problems with native scrolling, with browser discrepencies in interpretation of standards over whether an element is allowed to be scrolled to if it (or a portion of it) is already visible onscreen. As such, it does not use native scrolling, and is reliant on JS to control CSS transitions. 

## Implementation

## References
