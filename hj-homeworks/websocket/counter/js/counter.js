'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter'),
counter = document.querySelector('.counter'),
errorTag = document.querySelector('output.errors');
if (localStorage.connections === undefined) {
  localStorage.connections = 0;
};
if (localStorage.errors === undefined) {
  localStorage.errors = 0;
}



window.addEventListener('beforeupload', () => {
  connection.close(1000, 'Страница закрыта, работа завершена');
  localStorage.connections--;
  updatePage();
});

connection.addEventListener('open', () => {
  localStorage.connections++;
  updatePage();
});

connection.addEventListener('error', () => {
  localStorage.errors++;
  updatePage();
});

function updatePage() {
  counter.textContent = localStorage.connections;
  errorTag.textContent = localStorage.errors;
}