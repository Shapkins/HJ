'use strict';

const keys = document.getElementsByTagName('li');
const soundnames = ['first', 'second', 'third', 'fourth', 'fifth'];

for(let key of keys) {
  key.addEventListener('click', middlePiano);
}
document.addEventListener('keydown', treadle);


function treadle(event) {
  console.log(event)
  if (event.type === 'keydown') {
    switch (event.key) {
      case 'Alt':
        for(let key of keys) {
          key.addEventListener('click', highPiano);
        }
        break;
      case 'Shift':
        for(let key of keys) {
          key.addEventListener('click', lowPiano);
        }
        break;
    }
  } else {
    for(let key of keys) {
      key.addEventListener('click', middlePiano);
    }
  }
}

function middlePiano() {
  if (document.getElementsByClassName('set')[0].classList.contains('low')) {
    document.getElementsByClassName('set')[0].classList.toggle('low');
  } else if (document.getElementsByClassName('set')[0].classList.contains('high')) {
    document.getElementsByClassName('set')[0].classList.toggle('high');
  } else if (!(document.getElementsByClassName('set')[0].classList.contains('middle'))) {
    document.getElementsByClassName('set')[0].classList.toggle('middle');
  }
  let prefix = './sounds/middle/';
  for(let i = 0; i < keys.length; i++) {
    keys[i].getElementsByTagName('audio')[0].src = prefix + soundnames[i] + '.mp3';
  }
  
  piano.call(this);
 }

function lowPiano() {
  document.getElementsByClassName('set')[0].classList.toggle('middle');
  document.getElementsByClassName('set')[0].classList.toggle('low');
  let prefix = './sounds/lower/';
  for(let i = 0; i < keys.length; i++) {
    keys[i].getElementsByTagName('audio')[0].src = prefix + soundnames[i] + '.mp3';
  }
  piano.call(this);
}

function highPiano() {
  document.getElementsByClassName('set')[0].classList.toggle('middle');
  document.getElementsByClassName('set')[0].classList.toggle('high');
  let prefix = './sounds/higher/';
  for(let i = 0; i < keys.length; i++) {
    keys[i].getElementsByTagName('audio')[0].src = prefix + soundnames[i] + '.mp3';
  }
  piano.call(this);
}

function piano() {
  switch (this) {
    case keys[0]:
      keys[0].getElementsByTagName('audio')[0].play();
      break;
    case keys[1]:
      keys[1].getElementsByTagName('audio')[0].play();
      break;
    case keys[2]:
      keys[2].getElementsByTagName('audio')[0].play();
      break;
    case keys[3]:
      keys[3].getElementsByTagName('audio')[0].play();
      break;
    default:
      keys[4].getElementsByTagName('audio')[0].play();
  }
}