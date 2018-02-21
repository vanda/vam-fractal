// To draw the coloured underline beneath the input field value

const searchInput = document.querySelector('.js-search-input');
const searchUnderscore = document.querySelector('.js-search-underscore');
const searchSubmit = document.querySelector('.js-search-submit');
const searchClear = document.querySelector('.js-search-clear');

function searchDecorate () {
  searchUnderscore.innerHTML = searchInput.value.replace(/\s/g, '&nbsp;');
}

function searchInit () {
  searchSubmit.classList.add('b-search-form__submit--hidden');
  if (searchInput.value.length) {
    searchClear.classList.remove('b-search-form__clear--hidden');
  }
}

function searchActivate () {
  searchClear.classList.add('b-search-form__clear--hidden');
  if (searchInput.value.length) {
    searchSubmit.classList.remove('b-search-form__submit--hidden');
  } else {
    searchSubmit.classList.add('b-search-form__submit--hidden');
  }
}

function searchReset () {
  searchClear.classList.add('b-search-form__clear--hidden');
  searchInput.value = '';
  searchDecorate();
}

if (searchInput) {
  searchInput.focus();
  searchInit();
  searchDecorate();
  searchInput.addEventListener('input', searchDecorate);
  searchInput.addEventListener('input', searchActivate);
  searchClear.addEventListener('click', searchReset);
}
