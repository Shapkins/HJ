'use strict';

const minis = document.getElementsByClassName('gallery-nav')[0].getElementsByTagName('a');
let picture = document.getElementsByClassName('gallery-view')[0];

for(let i = 0; i < minis.length; i++) {
  minis[i].addEventListener('click', galleryClick);
}

function galleryClick(event) {
  event.preventDefault();
  for(let i = 0; i < minis.length; i++) {
    if (minis[i].classList.contains('gallery-current')) {
      minis[i].classList.toggle('gallery-current');
    }
  }
  this.classList.toggle('gallery-current');
  picture.src = this.href;
}

function miniClick() {
  this.classList.toggle('gallery-current');
  console.log(this)
  picture.src = this.src;
}