// To draw the coloured underline beneath the input field value

const searchInput = document.querySelector('.js-search-input');
const searchUnderscore = document.querySelector('.js-search-underscore');

function doSearchUnderscore () {
  searchUnderscore.innerHTML = searchInput.value.replace(/\s/g, '&nbsp;');
}

if (searchInput) {
  window.addEventListener('load', doSearchUnderscore);
  searchInput.addEventListener('input', doSearchUnderscore);
}
