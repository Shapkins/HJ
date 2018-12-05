'use strict';

const keys = document.getElementsByTagName('li');
const soundnames = ['first', 'second', 'third', 'fourth', 'fifth'];
const treadles = ['low', 'middle', 'high'];
const prefixes = ['sounds/lower/', 'sounds/middle/', 'sounds/higher/'];
let checkWord = 'middle';

for(let key of keys) {
  key.addEventListener('click', treadleDown);
}
document.addEventListener('keydown', treadleDown);
document.addEventListener('keyup', treadleDown);

function treadleDown(event) {
  if (event.type === 'keydown') {
    if (event.key === 'Alt') {
      checkWord = 'high';
    } else if (event.key === 'Shift') {
      checkWord = 'low';
    }
  }
  if (event.type === 'keyup') {
      checkWord = 'middle';
    }
  for(let key of keys) {
    key.addEventListener('click', onClick);
  } 
}

function checking(checkWord) {
  return treadles.indexOf(checkWord);
}

function changeClass(checkWord) {
  for(let treadle of treadles) {
    if (treadle === checkWord) {
      if (!(document.getElementsByClassName('set')[0].classList.contains(checkWord))) {
        document.getElementsByClassName('set')[0].classList.toggle(checkWord);
      }
    } else {
      if (document.getElementsByClassName('set')[0].classList.contains(treadle)) {
        document.getElementsByClassName('set')[0].classList.toggle(treadle);
      }
    }
  }
}

function piano() {
  for(let i = 0; i < keys.length; i++) {
    if (this === keys[i]) {
      keys[i].getElementsByTagName('audio')[0].play();
    }
  }
}

function doSoundName(prefix) {
  for(let i = 0; i < keys.length; i++) {
    keys[i].getElementsByTagName('audio')[0].src = prefix + soundnames[i] + '.mp3';
  }
}

function onClick() {
  changeClass(checkWord);
  doSoundName(prefixes[checking(checkWord)]);
  piano.call(this);
}