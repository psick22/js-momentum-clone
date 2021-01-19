const colockContainer = document.querySelector('.clock__container');
const clockTitle = colockContainer.querySelector('h1');

function getTime() {
  const date = new Date();
  const min = date.getMinutes();
  const hr = date.getHours();
  const sec = date.getSeconds();
  clockTitle.innerText = `${hr < 10 ? `0${hr}` : hr} : ${
    min < 10 ? `0${min}` : min
  } : ${sec < 10 ? `0${sec}` : sec}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
