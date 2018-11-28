'use strict';

const wrappers = document.getElementsByClassName('wrapper-dropdown');
console.log(wrappers)

for(let button of wrappers) {
  button.onclick = wrapperDropdown;
  }

function wrapperDropdown() {
  this.classList.toggle('active');
}