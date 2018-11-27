'use strict';

const prev = document.getElementById('prevPhoto'); 
const next = document.getElementById('nextPhoto');
const photo = document.getElementById('currentPhoto');
let phase = 500;

next.onclick = function() {
  phase++;
  roulette();
}

prev.onclick = function() {
  phase--;
  roulette();
}

function roulette() {
  switch (phase % 5) {
    case 0:
      photo.src = './i/breuer-building.jpg';
      break;
    case 1:
      photo.src = './i/guggenheim-museum.jpg';
      break;
    case 2:
      photo.src = './i/headquarters.jpg';
      break;
    case 3:
      photo.src = './i/IAC.jpg';
      break;
    default:
      photo.src = './i/new-museum.jpg';
  }
}
