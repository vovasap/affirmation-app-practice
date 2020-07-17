const initApp = function () {
  const number = document.querySelector('.number');
  const duration = document.querySelector('.duration');
  const btnStartAndPause = document.querySelector('.play-pause');
  const btnStop = document.querySelector('.stop');
  const display = document.querySelector('.display');
  const outline = document.querySelector('.moving-outline circle');
  const playPauseFigure = document.querySelector('.play-pause-figure');
  const outlineLength = outline.getTotalLength();
  const soundSwitch = document.createElement('audio');
  const soundFinish = document.createElement('audio');

  soundSwitch.src = './sounds/switch.mp3';
  soundFinish.src = './sounds/finish.mp3';

  document.body.append(soundFinish);

  let timeLeft = duration.value * number.value;
  let timeOneAffirmation = duration.value;
  let timeOneAffirmationLeft = timeOneAffirmation;
  let allTime = timeLeft;
  let isPaused = true;
  let isStoped = true;
  let timer;
  let progress = outlineLength;
  let strokeDashArray = progress;
  let outlineLengthPassed = 0;

  let startPause = function () {
    if (isPaused == true) {
      start();
    } else {
      pause();
    }
  };

  let start = function () {
    if (isStoped) {
      timeOneAffirmation = duration.value;
      imeOneAffirmationLeft = timeOneAffirmation;
      timeLeft = duration.value * number.value;
      allTime = timeLeft;
      progress = outlineLength;
      outlineLengthPassed = 0;
    }

    display.value = timeLeft;

    timer = setInterval(() => {
      --timeOneAffirmationLeft;
      display.value = --timeLeft;
      changeLengthOutline();
      if (timeLeft == 0) {
        stop();
        soundFinish.play();
      } else if (timeOneAffirmationLeft == 0) {
        timeOneAffirmationLeft = timeOneAffirmation;
        soundSwitch.play();
      }
    }, 1000);

    isPaused = false;
    isStoped = false;

    playPauseFigure.setAttribute('src', './svg/pause.svg');
  };

  let pause = function () {
    clearInterval(timer);
    playPauseFigure.setAttribute('src', './svg/play.svg');
    isPaused = true;
  };

  let stop = function () {
    clearInterval(timer);
    outline.setAttribute('stroke-dasharray', outlineLength);
    outline.setAttribute('stroke-dashoffset', '0');
    playPauseFigure.setAttribute('src', './svg/play.svg');
    display.value = 0;
    soundFinish.pause();
    soundFinish.currentTime = 0;
    timeOneAffirmationLeft = timeOneAffirmation;
    isPaused = true;
    isStoped = true;
  };

  let changeLengthOutline = function () {
    progress -= outlineLength / allTime;
    outlineLengthPassed = outlineLength - progress;
    strokeDashArray = `${progress} ${outlineLengthPassed}`;
    outline.setAttribute('stroke-dasharray', strokeDashArray);
    outline.setAttribute(
      'stroke-dashoffset',
      outlineLength / 4 - outlineLengthPassed
    );
  };

  btnStartAndPause.addEventListener('click', startPause);
  btnStop.addEventListener('click', stop);
};

initApp();
