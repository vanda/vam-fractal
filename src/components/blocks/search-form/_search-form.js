// Create a dynamically expanding coloured block
// That mimics the bahaviour of and underscore as shown
// In the zepplin designs for this element
// Standard CSS underlines don't allow for the required
// spacing between the font and the underline itself.

const searchInput = document.querySelector('.js-search-input');
const searchUnderscore = document.querySelector('.js-search-underscore');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    searchUnderscore.innerHTML = searchInput.value.replace(/\s/g, '&nbsp;');
  });
}
