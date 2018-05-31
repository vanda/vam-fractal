const backgroundVideo = document.querySelector('.js-background-video');

if (backgroundVideo) {
  const backgroundVideoContainer = document.querySelector('.js-background-video-container');
  const stopButton = document.querySelector('.js-stop-button');
  const timesToLoop = 1;
  const videoCredit = document.querySelector('.js-background-video-credit');
  const imageCredit = document.querySelector('.js-background-image-credit');
  let playCounter = 0;


  const showVideoCredit = () => {
    if (videoCredit) {
      videoCredit.classList.remove('hidden');
    }
    if (imageCredit) {
      imageCredit.classList.add('hidden');
    }
  };

  const hideVideoCredit = () => {
    if (videoCredit) {
      videoCredit.classList.add('hidden');
    }
    if (imageCredit) {
      imageCredit.classList.remove('hidden');
    }
  };

  // Looping videos do not trigger ended events and manually looping
  // videos from JS is disabled in many browsers. The canplaythrough event here
  // is (approximately) mimicking an ended event for loops.
  backgroundVideo.addEventListener('canplaythrough', () => {
    if (playCounter >= timesToLoop) {
      backgroundVideoContainer.classList.remove('b-video-background--fade');
      backgroundVideo.pause();
      hideVideoCredit();
    } else {
      backgroundVideoContainer.classList.add('b-video-background--fade');
      playCounter += 1;
      showVideoCredit();
    }
  });

  const pauseHiddenVideo = () => {
    // offsetHeight always equals 0 if an element is hidden
    if (backgroundVideoContainer.offsetHeight === 0) {
      backgroundVideo.pause();
      hideVideoCredit();
    } else {
      backgroundVideo.play();
      showVideoCredit();
    }
  };

  window.addEventListener('load', () => {
    pauseHiddenVideo();
  });

  window.addEventListener('resize', () => {
    pauseHiddenVideo();
  });

  if (stopButton) {
    stopButton.onclick = () => {
      backgroundVideo.pause();
      backgroundVideoContainer.classList.remove('b-video-background--fade');
      if (backgroundVideo.paused) {
        stopButton.classList.add('hidden');
        hideVideoCredit();
      }
    };
  }
}
