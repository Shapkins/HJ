'use strict';

const playlist = ['./mp3/LA Chill Tour.mp3', './mp3/LA Fusion Jam.mp3', './mp3/This is it band.mp3'];
const controls = document.getElementsByTagName('button');
let phase = 300;

for(let control of controls) {
  control.onclick = player;
}

function player() {
  if (this.classList.contains('back')) {
    phase--;
    changeTrack();
  }
  if (this.classList.contains('playstate')) {
    if (!(document.getElementsByClassName('mediaplayer')[0].classList.contains('play'))) {
      document.getElementsByClassName('mediaplayer')[0].classList.toggle('play');
      document.getElementsByTagName('audio')[0].play();
    } else {
      document.getElementsByClassName('mediaplayer')[0].classList.toggle('play');
      document.getElementsByTagName('audio')[0].pause();
    }
  }
  if (this.classList.contains('stop')) {
    document.getElementsByTagName('audio')[0].pause();
    document.getElementsByTagName('audio')[0].currentTime = 0;
    if (document.getElementsByClassName('mediaplayer')[0].classList.contains('play')) {
      document.getElementsByClassName('mediaplayer')[0].classList.toggle('play');
    }
  }
  if (this.classList.contains('next')) {
    phase++;
    changeTrack();
  }   
}


function changeTrack() {
  document.getElementsByClassName('title')[0].title = playlist[phase % 3].slice(6, playlist[phase % 3].length - 4);
  document.getElementsByTagName('audio')[0].src = playlist[phase % 3];
  if (document.getElementsByClassName('mediaplayer')[0].classList.contains('play')) {
    document.getElementsByTagName('audio')[0].play();
  }
}