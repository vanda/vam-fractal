const searchResultTextEls = document.querySelectorAll('.js-search-result-text');

function searchResultTextTruncate (textEl) {
  textEl.innerHTML = textEl.textFull;
  if (textEl.scrollHeight - textEl.clientHeight > 10) {
    const focus = textEl.textFull.indexOf('</em>');
    const maxChars = (textEl.clientHeight / textEl.scrollHeight) * textEl.textFull.length;
    const shunt = focus - maxChars;
    let firstChar = 0;
    let lastChar = textEl.textFull.lastIndexOf(' ', maxChars);
    let prepend = '';
    if (shunt > 0) {
      prepend = '&hellip;';
      firstChar = textEl.textFull.indexOf(' ', shunt + 20) + 1;
      lastChar = textEl.textFull.lastIndexOf(' ', maxChars + shunt + 20);
    }
    textEl.innerHTML = `${prepend}${textEl.textFull.substring(firstChar, lastChar)}&hellip;`;
  }
}

if (searchResultTextEls.length) {
  Array.from(searchResultTextEls, (textEl) => {
    textEl.textFull = textEl.innerHTML;
    searchResultTextTruncate(textEl);
    window.addEventListener('resize', searchResultTextTruncate.bind(this, textEl), false);
    return true;
  });
}
