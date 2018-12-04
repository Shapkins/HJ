'use strict';

const sounds = document.getElementsByClassName('drum-kit__drum');
const keys = ['key-clap', 'key-hihat', 'key-kick', 'key-openhat', 'key-boom', 'key-ride'];

for(let sound of sounds) {
  sound.onclick = drummer;
}

function drummer() {
  for(let key of keys) {
    if (this.classList.contains(key)) {
      player.call(this);
    }
  }
}

function player() {
  let players = this.getElementsByTagName('audio');
  players[0].currentTime = 0;
  players[0].play();
}