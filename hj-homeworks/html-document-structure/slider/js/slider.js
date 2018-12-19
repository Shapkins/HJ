'use strict';

const slides = document.querySelectorAll('.slide');
let navs = document.querySelectorAll('nav a');
let currentSlide = slides[0];
currentSlide.classList.add('slide-current');
navs[0].classList.toggle('disabled', true);
navs[2].classList.toggle('disabled', true);

for(let nav of navs) {
  nav.addEventListener('click', navigation);
}

function navigation() {
  if (!(this.classList.contains('disabled'))) {
    currentSlide.classList.remove('slide-current');
    if (this.dataset.action === 'next') {
      currentSlide = currentSlide.nextElementSibling;
    }  
    if (this.dataset.action === 'prev') {
      currentSlide = currentSlide.previousElementSibling;
    }
    if (this.dataset.action === 'first') {
      currentSlide = slides[0];
    }
    if (this.dataset.action === 'last') {
      currentSlide = slides[slides.length - 1];
    }
    currentSlide.classList.add('slide-current');
    disableButtons();
  }
}

function disableButtons() {
  navs[0].classList.toggle('disabled', !currentSlide.previousElementSibling);
  navs[1].classList.toggle('disabled', !currentSlide.nextElementSibling);
  navs[2].classList.toggle('disabled', !currentSlide.previousElementSibling);
  navs[3].classList.toggle('disabled', !currentSlide.nextElementSibling);
}