'use strict';

const 
  eye = document.querySelector('.big-book__eye'),
  pupil = document.querySelector('.big-book__pupil'),
  height = document.body.scrollHeight,
  width = document.body.scrollWidth,
  eyeX = eye.getBoundingClientRect().x + eye.getBoundingClientRect().width * 0.5,
  eyeY = eye.getBoundingClientRect().y + eye.getBoundingClientRect().height * 0.5;

let
  pointerX,
  pointerY,
  x,
  maxX,
  y,
  maxY;

function moving() {
  if (pointerX >= eyeX) {
    maxX = width - eyeX;
    x = pointerX - eyeX;
  } else {
    maxX = eyeX;
    x = pointerX - eyeX;
  }

  if (pointerY >= eyeY) {
    maxY = height - eyeY;
    y = pointerY - eyeY;
  } else {
    maxY = eyeY;
    y = pointerY - eyeY;
  }

  pupil.style.setProperty('--pupil-x', `${x / maxX * 30}px`);
  pupil.style.setProperty('--pupil-y', `${y / maxY * 30}px`);
  pupil.style.setProperty('--pupil-size', (1 - Math.sqrt(x * x + y * y) / Math.sqrt(maxX * maxX + maxY * maxY)) * 2 + 1);
  
  requestAnimationFrame(moving)
}

function pointer() {
  pointerX = event.clientX + window.pageXOffset;
  pointerY = event.clientY + window.pageYOffset;
}

document.addEventListener('mousemove', pointer);
requestAnimationFrame(moving)