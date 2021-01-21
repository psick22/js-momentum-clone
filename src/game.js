// <⚠️ DONT DELETE THIS ⚠️>
import './styles.css';
// <⚠️ /DONT DELETE THIS ⚠️>
const slider = document.querySelector('#slider');
const varTitle = document.querySelector('.title');
const resultTitle = document.querySelector('.result__title');
const resultDetail = document.querySelector('.result__detail');
const form = document.querySelector('.form');
const inp = document.querySelector('.number__input');

let selectValue = 100;
let rand;

function displayValue(event) {
  console.log(event.target.value);
  selectValue = event.target.value;
  console.log('selectValue', selectValue);
  varTitle.innerText = `Generate a number between 0 and ${selectValue}`;
  rand = getRandom(selectValue);
  form.classList.add('show');
  form.classList.remove('hide');
  inp.setAttribute('max', `${selectValue}`);
}
function getRandom(value) {
  rand = Math.floor(Math.random() * value) + 1;
  console.log('rand :', rand);
  return rand;
}
function letsGame(value) {
  console.log(value);
  console.log(rand);
  console.log('selectValue', selectValue);

  if (value > selectValue) {
    resultDetail.innerText = `Out of Range`;
    resultTitle.innerText = 'You Lost!';
  } else {
    if (value === rand) {
      resultDetail.innerText = `You chose: ${value}, the machine chose : ${rand}`;
      resultTitle.innerText = 'You Won!';
    } else {
      resultDetail.innerText = `You chose: ${value}, the machine chose : ${rand}`;

      resultTitle.innerText = 'You Lost!';
    }
  }

  resultDetail.classList.remove('hide');
  resultTitle.classList.remove('hide');
  resultDetail.classList.add('show');
  resultTitle.classList.add('show');
  return;
}

function handleSubmit(event) {
  event.preventDefault();
  getRandom(selectValue);
  console.log('submit', Number(inp.value));
  letsGame(Number(inp.value));
}
function init() {
  slider.addEventListener('input', displayValue);
  form.addEventListener('submit', handleSubmit);
}
init();
