'use strict';

const slides = document.getElementsByClassName('slide');
let navs = document.querySelectorAll('nav a');
let currentSlide = slides[0];
currentSlide.classList.add('slide-current');
for(let i = 0; i < navs.length; i++) {
  if (i % 2 === 0) {
    if (!(navs[i].classList.contains('disabled'))) {
      navs[i].classList.toggle('disabled');
    }
  }
}

for(let nav of navs) {
  nav.addEventListener('click', navigation);
}

function navigation() {
  if (!(this.classList.contains('disabled'))) {
    if (this.dataset.action === 'next') {
      currentSlide.classList.remove('slide-current');
      currentSlide = currentSlide.nextElementSibling;
      currentSlide.classList.add('slide-current');
    }  
    if (this.dataset.action === 'prev') {
      currentSlide.classList.remove('slide-current');
      currentSlide = currentSlide.previousElementSibling;
      currentSlide.classList.add('slide-current');
    }
    if (this.dataset.action === 'first') {
      currentSlide.classList.remove('slide-current');
      currentSlide = slides[0];
      currentSlide.classList.add('slide-current');
    }
    if (this.dataset.action === 'last') {
      currentSlide.classList.remove('slide-current');
      currentSlide = slides[slides.length - 1];
      currentSlide.classList.add('slide-current');
    }
    disableButtons();
  }
}

function disableButtons() {
  if (!(currentSlide.previousElementSibling)) {
    for(let i = 0; i < navs.length; i++) {
      if (i % 2 === 0) {
        if (!(navs[i].classList.contains('disabled'))) {
          navs[i].classList.toggle('disabled');
        }
      } else {
        if (navs[i].classList.contains('disabled')) {
          navs[i].classList.toggle('disabled');
        }
      }
    }
  } else if (!(currentSlide.nextElementSibling)) {
    for(let i = 0; i < navs.length; i++) {
      if (i % 2 !== 0) {
        if (!(navs[i].classList.contains('disabled'))) {
          navs[i].classList.toggle('disabled');
        }
      } else {
        if (navs[i].classList.contains('disabled')) {
          navs[i].classList.toggle('disabled');
        }
      }
    }
  } else {
    for(let i = 0; i < navs.length; i++) {
      if (navs[i].classList.contains('disabled')) {
        navs[i].classList.toggle('disabled');
      }
      navs[i].disabled = false;
    }
  }
}