const todoForm = document.querySelector('.js-todoForm');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.pending');
const finishList = document.querySelector('.finished');

function loadTodoList() {
  let todos = localStorage.getItem('todoList');
  todos = JSON.parse(todos);
  console.log('todos:', todos);
  // 있는 li 태그들 지우는
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('div');
    todoList.append(li);
    li.classList.add(`list`, `list-${index}`);
    const list = document.querySelector(`.list-${index}`);
    const p = document.createElement('p');
    const delButton = document.createElement('button');
    const finButton = document.createElement('button');
    list.append(p, delButton, finButton);
    p.innerText = todo;
    p.classList.add('todo', `todo-${index}`);
    delButton.classList.add('delete', 'button', `delete-${index}`);
    delButton.innerText = '삭제';
    finButton.classList.add('finish', 'button', `finish-${index}`);
    finButton.innerText = '완료';
    const del = document.querySelector(`.delete-${index}`);
    del.addEventListener('click', e => onDelete(index));
    const fin = document.querySelector(`.finish-${index}`);
    fin.addEventListener('click', e => onFinish(index));
  });
}

function loadFinishList() {
  let finish = localStorage.getItem('finishList');
  finish = JSON.parse(finish);
  console.log('finishList:', finish);
  // 있는 li 태그들 지우는
  finishList.innerHTML = '';
  finish.forEach((todo, index) => {
    const li2 = document.createElement('div');
    finishList.append(li2);
    li2.classList.add(`list2`, `list2-${index}`);
    const list2 = document.querySelector(`.list2-${index}`);
    const p2 = document.createElement('p');
    const delButton2 = document.createElement('button');
    const finButton2 = document.createElement('button');
    list2.append(p2, delButton2, finButton2);
    p2.innerText = todo;
    p2.classList.add('fin', `fin-${index}`);
    delButton2.classList.add('delete', 'button', `delete-fin-${index}`);
    delButton2.innerText = '삭제';
    finButton2.classList.add('finish', 'button', `finish-fin-${index}`);
    finButton2.innerText = '되돌리기';
    const del = document.querySelector(`.delete-fin-${index}`);
    del.addEventListener('click', () => onFinishDelete(index));
    const fin = document.querySelector(`.finish-fin-${index}`);
    fin.addEventListener('click', () => onFinishBack(index));
  });
}

function handleSubmitTodo(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  console.log(currentValue);
  saveTodo(currentValue);
  loadTodoList();
  todoInput.value = '';
}

function saveTodo(todo) {
  if (Array.isArray(todo)) {
    const init = [];
    localStorage.setItem('todoList', JSON.stringify(init));
    localStorage.setItem('todoList', JSON.stringify(todo));
  } else {
    const currentTodoList = loadLocalStorage();
    console.log(currentTodoList.todoArray);
    currentTodoList.todoArray.push(todo);
    localStorage.setItem('todoList', JSON.stringify(currentTodoList.todoArray));
  }
}

function loadLocalStorage() {
  let todoArray = localStorage.getItem('todoList');
  let finishArray = localStorage.getItem('finishList');
  if (!todoArray) {
    todoArray = [];
    localStorage.setItem('todoList', JSON.stringify(todoArray));
  } else {
    todoArray = JSON.parse(todoArray);
  }
  if (!finishArray) {
    finishArray = [];
    localStorage.setItem('finishList', JSON.stringify(finishArray));
  } else {
    finishArray = JSON.parse(finishArray);
  }
  return { todoArray, finishArray };
}

function onDelete(index) {
  console.log(index);
  // index를 이용해서 querySelector
  const todoText = document.querySelector(`.todo-${index}`);
  console.log(todoText.innerText);
  let todos = localStorage.getItem('todoList');
  todos = JSON.parse(todos);
  console.log(todos);
  todos.splice(index, 1);
  console.log('삭제됨', todos);
  saveTodo(todos);
  loadTodoList();
}

function onFinishDelete(index) {
  console.log(index);
  const finishText = document.querySelector(`.fin-${index}`);
  let fins = localStorage.getItem('finishList');
  fins = JSON.parse(fins);
  console.log(fins);
  fins.splice(index, 1);
  console.log(fins);
  localStorage.setItem('finishList', JSON.stringify(fins));
  loadFinishList();
}

function onFinishBack(index) {
  const finishText = document.querySelector(`.fin-${index}`);

  let fins = localStorage.getItem('finishList');
  fins = JSON.parse(fins);
  fins.splice(index, 1);

  let todos = localStorage.getItem('todoList');
  todos = JSON.parse(todos);
  todos.push(finishText.innerText);

  localStorage.setItem('finishList', JSON.stringify(fins));
  localStorage.setItem('todoList', JSON.stringify(todos));

  loadTodoList();
  loadFinishList();
}

function onFinish(index) {
  const finText = document.querySelector(`.todo-${index}`);
  let finishList = localStorage.getItem('finishList');
  finishList = JSON.parse(finishList);
  finishList.push(finText.innerText);

  onDelete(index);
  localStorage.setItem('finishList', JSON.stringify(finishList));
  loadFinishList();
}

function init() {
  console.log(1, loadLocalStorage());
  loadLocalStorage();
  loadTodoList();
  loadFinishList();
  todoForm.addEventListener('submit', handleSubmitTodo);
}
init();
