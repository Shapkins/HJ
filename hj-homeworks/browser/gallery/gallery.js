'use strict';

const prev = document.getElementById('prevPhoto'); 
const next = document.getElementById('nextPhoto');
const photo = document.getElementById('currentPhoto');
const links = ['./i/breuer-building.jpg', './i/guggenheim-museum.jpg', './i/headquarters.jpg', './i/IAC.jpg', './i/new-museum.jpg'];
let phase = 500;
roulette();

next.onclick = function() {
  phase++;
  roulette();
}

prev.onclick = function() {
  phase--;
  roulette();
}

function roulette() {
  photo.src = links[phase % links.length];
}
