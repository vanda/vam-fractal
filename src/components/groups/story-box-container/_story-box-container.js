const initRevealer = () => {
  const boxes = Array.from(document.querySelectorAll('.b-story-box'));
  const columnBoxes = Array.from(document.querySelectorAll('.b-story-box--column'));

  window.onload = () => {
    for (let i = 0; i < columnBoxes.length; i += 2) {
      const textContentBoxes = columnBoxes.slice(i, i + 2).map(el => el.querySelector('.b-story-box__content-text'));
      const tallestInRow = textContentBoxes[
        (textContentBoxes[0].offsetHeight > textContentBoxes[1].offsetHeight ? 0 : 1)
      ].offsetHeight;

      textContentBoxes.forEach((el) => {
        el.style.height = `${tallestInRow}px`;
      });
    }
  };

  if (boxes.length > 4) {
    document.querySelector('.b-story-box-container__reveal-container').classList.add('b-story-box-container__reveal-container--active');
  }

  boxes.slice(0, 4).forEach(
    (el) => {
      el.classList.add('b-story-box--active');
    }
  );

  const button = document.querySelector('.b-story-box-container__reveal-btn');

  if (button) {
    button.onclick = () => {
      const currentBoxes = Array.from(document.querySelectorAll('.b-story-box--active')).length;

      Array.from(document.querySelectorAll('.b-story-box')).slice(currentBoxes, currentBoxes + 2).forEach(
        (el) => {
          el.classList.add('b-story-box--active');
        }
      );

      if (currentBoxes + 1 === boxes.length) {
        document.querySelector('.b-story-box-container__reveal-container').classList.remove('b-story-box-container__reveal-container--active');
      } else {
        const textContentBoxes = columnBoxes.slice(
          currentBoxes - 1, currentBoxes + 2
        ).map(el => el.querySelector('.b-story-box__content-text'));

        const tallestInRow = textContentBoxes[
          (textContentBoxes[0].offsetHeight > textContentBoxes[1].offsetHeight ? 0 : 1)
        ].offsetHeight;

        textContentBoxes.forEach((el) => {
          el.style.height = `${tallestInRow}px`;
        });
      }

      // stop page going up
      return false;
    };
  }
};

if (document.querySelector('.b-story-box')) {
  initRevealer();
}
