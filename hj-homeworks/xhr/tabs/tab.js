'use strict';

const tabs = document.querySelectorAll('nav a');

for(let tab of tabs) {
  tab.addEventListener('click', tabClick);
}

function tabClick(event) {
  event.preventDefault();
  document.getElementsByClassName('active')[0].classList.toggle('active');
  this.classList.toggle('active');
  let request = new XMLHttpRequest();
  request.addEventListener('loadstart', preloader);
  request.addEventListener('loadend', showTab);
  request.open('GET', this.href, true);
  request.send();
}

function showTab() {
  if (this.status === 200) {
    if (!(document.getElementById('preloader').classList.contains('hidden'))) {
      document.getElementById('preloader').classList.toggle('hidden');
    }
    document.getElementById('content').innerHTML = this.responseText;
  }
}

function preloader() {
  if (this.status !== 200) {
    if (document.getElementById('preloader').classList.contains('hidden')) {
      document.getElementById('preloader').classList.toggle('hidden');
    }
  }
}