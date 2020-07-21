const initRevealer = () => {
  const boxes = Array.from(document.querySelectorAll('.b-story-box'));

  if (boxes.length > 4) {
    document.querySelector(".b-story-box-container__reveal-container").classList.add("b-story-box-container__reveal-container--active")
  }

  boxes.slice(0,4).forEach(
    (el) => {
      el.classList.add('b-story-box--active');
    }
  )

  const button = document.querySelector(".b-story-box-container__reveal-btn");

  button.onclick = e => {
    const boxes = Array.from(document.querySelectorAll('.b-story-box'));
    const currentBoxes = Array.from(document.querySelectorAll('.b-story-box--active')).length;

    Array.from(document.querySelectorAll('.b-story-box')).slice(currentBoxes,currentBoxes+2).forEach(
      (el) => {
        el.classList.add('b-story-box--active');
      }
    )

    if (currentBoxes + 1 === boxes.length) {
      document.querySelector(".b-story-box-container__reveal-container").classList.remove("b-story-box-container__reveal-container--active");
    }
    // stop page going up
    return false;
  }
}

initRevealer();
