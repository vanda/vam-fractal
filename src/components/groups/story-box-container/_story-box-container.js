import Clamp from 'clamp-js';

const clampText = () => {
  Array.from(document.querySelectorAll('.b-story-box__content-text'), (el) => {
    if (window.innerWidth > 499) {
      Clamp(el, {
        clamp: 'auto',
        splitOnChars: ['.', ',', ' '],
      });
    } else {
      el.style.display = 'none';
    }
    return true;
  });
};

const initRevealer = () => {
  const boxes = Array.from(document.querySelectorAll('.b-story-box'));
  const columnBoxes = Array.from(document.querySelectorAll('.b-story-box--column'));

  if (boxes.length > 2) {
    document.querySelector('.b-story-box-container__reveal-container').classList.add('b-story-box-container__reveal-container--active');
  }

  boxes.slice(0, 2).forEach(
    (el) => {
      el.classList.add('b-story-box--active');
    },
  );

  const button = document.querySelector('.b-story-box-container__reveal-btn');

  if (button) {
    button.onclick = () => {
      const currentBoxes = Array.from(document.querySelectorAll('.b-story-box--active')).length;

      Array.from(document.querySelectorAll('.b-story-box')).slice(currentBoxes, currentBoxes + 2).forEach(
        (el) => {
          el.classList.add('b-story-box--active');
        },
      );

      if (Array.from((document.querySelectorAll('.b-story-box--active'))).length === boxes.length) {
        document.querySelector('.b-story-box-container__reveal-container').classList.remove('b-story-box-container__reveal-container--active');
      } else {
        const textContentBoxes = columnBoxes.slice(currentBoxes - 1, currentBoxes + 2)
          .map((el) => el.querySelector('.b-story-box__content-text'));

        const tallestInRow = textContentBoxes[
          (textContentBoxes[0].offsetHeight > textContentBoxes[1].offsetHeight ? 0 : 1)
        ].offsetHeight;

        textContentBoxes.forEach((el) => {
          el.style.height = `${tallestInRow}px`;
        });
      }

      clampText();

      // stop page going up
      return false;
    };
  }
};

if (document.querySelector('.b-story-box')) {
  initRevealer();
  clampText();
  window.addEventListener('resize', () => {
    clampText();
  });
}
