import { scrollIntoViewHorizontally } from '../../services/js_utility_functions/js_utility_functions';

document.addEventListener('DOMContentLoaded', () => {
  Array.from(document.querySelectorAll('.b-venue-info'), (container) => {
    /* scroll item into view when it receives focus
     * requires item to be a focusable element
     * only focusin event is delegated to container (focus event doesn't bubble!) */
    container.addEventListener('focusin', (e) => {
      scrollIntoViewHorizontally(e.target.closest('.b-venue-info__item'));
    });

    return true;
  });
});
