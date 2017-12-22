const inputField = document.querySelectorAll('.js-search-input-underscore')[0];

let underscore = document.createElement("div")

const resizeWidth = () => {
  let underscore = document.createElement("div")
  console.log(1, "Bork")
}

inputField.oninput = resizeWidth;
// for IE
inputField.onpropertychange = inputField.oninput;