'use strict';

const sounds = document.getElementsByClassName('drum-kit__drum');

for(let sound of sounds) {
  sound.onclick = drummer;
}

function drummer() {
  if (this.classList.contains('key-clap')) {
    player.call(this);
  }
  if (this.classList.contains('key-hihat')) {
    player.call(this);
  }
  if (this.classList.contains('key-kick')) {
    player.call(this);
  }
  if (this.classList.contains('key-openhat')) {
    player.call(this);
  }
  if (this.classList.contains('key-boom')) {
    player.call(this);
  }
  if (this.classList.contains('key-ride')) {
    player.call(this);
  }
}

function player() {
  let players = this.getElementsByTagName('audio');
  players[0].play();
}