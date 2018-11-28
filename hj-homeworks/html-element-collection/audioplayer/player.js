'use strict';

const playlist = ['./mp3/LA Chill Tour.mp3', './mp3/LA Fusion Jam.mp3', './mp3/This is it band.mp3'];
const controls = document.getElementsByClassName('fa');
let phase = 300;

for(let control of controls) {
  control.onclick = player;
}

function player() {
  if (this.classList.contains('fa-backward')) {
    phase--;
    document.getElementsByTagName('audio')[0].src = playlist[phase % 3];
    document.getElementsByClassName('title')[0].title = playlist[phase % 3].slice(6, playlist[phase % 3].length - 4);
  }
  if (this.classList.contains('fa-play')) {
    document.getElementsByTagName('audio')[0].play();
    document.getElementsByClassName('mediaplayer')[0].classList.toggle('play');
  }
  if (this.classList.contains('fa-stop')) {
    document.getElementsByTagName('audio')[0].pause();
    document.getElementsByTagName('audio')[0].currentTime = 0;
  }
  if (this.classList.contains('fa-forward')) {
    phase++;
    document.getElementsByTagName('audio')[0].src = playlist[phase % 3];
    document.getElementsByClassName('title')[0].title = playlist[phase % 3].slice(6, playlist[phase % 3].length - 4);
  }
  if (this.classList.contains('fa-pause')) {
    document.getElementsByTagName('audio')[0].pause();
    document.getElementsByClassName('mediaplayer')[0].classList.toggle('play');
  }     
}


function back() {

}