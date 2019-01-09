'use strict';

const buttons = document.querySelector('.wrap-btns');
buttons.addEventListener('click', buttonClick);
document.getElementById('counter').textContent = localStorage.counter;


function buttonClick(event) {
  if (event.target.id === 'increment') {
    localStorage.counter++;
  } else if ((event.target.id === 'decrement') && (localStorage.counter > 0)) {
    localStorage.counter--;
  } else if (event.target.id === 'reset') {
    localStorage.counter = 0;
  }
  document.getElementById('counter').textContent = localStorage.counter;
}