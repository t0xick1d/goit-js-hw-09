const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
};

let saveIdSetInterval = null;
~refs.buttonStart.addEventListener('click', onClickButtonStart);
refs.buttonStop.addEventListener('click', onClickButtonStop);

function onClickButtonStart() {
  refs.buttonStart.disabled = true;
  saveIdSetInterval = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
}

function onClickButtonStop() {
  clearInterval(saveIdSetInterval);
  refs.buttonStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
