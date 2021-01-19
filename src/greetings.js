const form = document.querySelector('.form');
const input = form.querySelector('input');
const greetings = document.querySelector('.js-greetings');

const USER = 'currentUser';
const SHOW = 'show';

function saveName(text) {
  localStorage.setItem(USER, text);
}

function paintGreeting(text) {
  form.classList.remove(SHOW);
  greetings.classList.add(SHOW);
  greetings.innerText = `Hello ${text}`;
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askName() {
  form.classList.add(SHOW);
  form.addEventListener('submit', handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER);
  if (currentUser === null) {
    askName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
