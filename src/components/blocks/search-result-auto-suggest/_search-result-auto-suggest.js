// TODO Currently this script doesn't behave correctly
// Sometimes it truncates after the cutoff
const textElements = document.querySelectorAll('.js-truncate-text');
const originalText = {};

Array.from(textElements, (textElement) => {
  originalText.push(textElement.innerHTML);
  return true;
});

function hasOverflown (textElement) {
  return (textElement.scrollHeight > textElement.clientHeight);
}

const overflowPosition = (textElement) => {
  const text = textElement.innerHTML;
  let characterCounter = 0;

  textElement.removeChild(textElement.firstChild);

  for (let i = 0; i < text.length; i += 1) {
    const newNode = document.createElement('span');
    newNode.appendChild(document.createTextNode(text.charAt(i)));
    textElement.appendChild(newNode);

    if (newNode.offsetLeft < textElement.offsetWidth) {
      characterCounter += 1;
    }
  }
  return (characterCounter);
};

const truncateText = () => {
  textElements.forEach((textElement, index) => {
    if (hasOverflown(textElement)) {
      textElement.innerHTML = `${originalText[index].substring(0, (overflowPosition(textElement) - 3))}...`;
    } else {
      textElement.innerHTML = originalText[index];
    }
  });
};

if (textElements.length > 0) {
  // TODO Behaviour on dynamic resize isn't working properly, Currently only run on page load
  window.onload = truncateText();
  // window.addEventListener('resize', truncateText);
}
