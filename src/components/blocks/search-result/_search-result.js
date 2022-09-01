const searchResultTextTruncate = (textEl) => {
  if (!textEl.dataset.fulltext) {
    textEl.dataset.fulltext = textEl.innerHTML;
  }
  const fullText = textEl.dataset.fulltext;
  textEl.innerHTML = fullText;

  if (textEl.scrollHeight - textEl.clientHeight > 10) {
    const focus = fullText.indexOf('</em>');
    const maxChars = (textEl.clientHeight / textEl.scrollHeight) * fullText.length;
    const shunt = focus - maxChars;
    let firstChar = 0;
    let lastChar = fullText.lastIndexOf(' ', maxChars);
    let prepend = '';
    if (shunt > 0) {
      prepend = '&hellip;';
      firstChar = fullText.indexOf(' ', shunt + 20) + 1;
      lastChar = fullText.lastIndexOf(' ', maxChars + shunt + 20);
    }
    textEl.innerHTML = `${prepend}${fullText.substring(firstChar, lastChar)}&hellip;`;
  }
};

const searchResultsTruncate = () => {
  Array.from(document.querySelectorAll('.js-search-result-text'), (textEl) => {
    searchResultTextTruncate(textEl);
    return true;
  });
};
searchResultsTruncate();
window.addEventListener('resize', searchResultsTruncate, false);
