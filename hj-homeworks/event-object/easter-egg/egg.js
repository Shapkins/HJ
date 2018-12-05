'use strict';

const password = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];
let check = [];

function navigation(event) {
  if ((event.ctrlKey) && (event.altKey) && (event.code === 'KeyT')) {
    document.getElementsByTagName('nav')[0].classList.toggle('visible');
  }
}

function netology(event) {
  check.push(event.code);
  for(let i = 0; i < check.length; i++) {
    if (password[i] !== check[i]) {
      check = [];
    }
  }
  if (check.length === password.length) {
    document.getElementsByClassName('secret')[0].classList.toggle('visible');
    document.removeEventListener('keydown', netology);
  }
}

document.addEventListener('keydown', navigation);
document.addEventListener('keydown', netology);