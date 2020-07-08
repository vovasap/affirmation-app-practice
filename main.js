const initApp = function () {
  const numberOfAffirmations = document.querySelector('.number');
  const durationOfAffirmations = document.querySelector('.duration');
  const btnStartAndPause = document.querySelector('.btn_start-pause');
  const btnStop = document.querySelector('.btn_stop');
  const display = document.querySelector('.display');

  let time = durationOfAffirmations.value;
  let timer;
  let isPaused = true;
  let isStoped = true;

  let startPause = function () {
    if (isPaused) {
      if (isStoped) {
        time = durationOfAffirmations.value;
        display.textContent = time;
      }
      timer = setInterval(() => {
        display.textContent = --time;
        if (time == 0) clearInterval(timer);
      }, 1000);

      isPaused = false;
      isStoped = false;
    } else {
      clearInterval(timer);
      isPaused = true;
    }
  };

  let stop = function () {
    clearInterval(timer);
    isPaused = true;
    isStoped = true;
  };

  btnStartAndPause.addEventListener('click', startPause);
  btnStop.addEventListener('click', stop);
};

initApp();
