'use strict';

const wrappers = document.getElementsByClassName('wrapper-dropdown');

for(let button of wrappers) {
  button.onclick = wrapperDropdown;
  }

function wrapperDropdown() {
  this.classList.toggle('active');
}