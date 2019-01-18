'use strict';

const eye = document.querySelector('.big-book__eye'),
pupil = document.querySelector('.big-book__pupil');


window.addEventListener('mousemove', (event) => {
  let siteSize = document.body.getBoundingClientRect(),
  windowWidth = document.documentElement.clientWidth,
  windowHeight = document.documentElement.clientHeight,
  eyeSize = eye.getBoundingClientRect(),
  eyeWidth = eyeSize.width,
  eyeHeight = eyeSize.height,
  pointerX = event.pageX,
  pointerY = event.pageY,
  eyeCenterX = (eyeSize.left - siteSize.left) + (eyeWidth / 2),
  eyeCenterY = (eyeSize.top - siteSize.top) + (eyeHeight / 2),
  pupilXFrom = -eyeCenterX,
  pupilXTo = windowWidth - eyeCenterY,
  diffX = pointerX - eyeCenterX,
  relationX,
  diffY = pointerY - eyeCenterY,
  relationY;

  
  
  if (diffX < 0) {
    relationX = -100 * diffX / pupilXFrom;
  } else if (diffX > 0) {
    relationX = diffX / pupilXTo * 100;
  } else {
    relationX = 0;
  }

  if (diffY < 0) {
    relationY = diffY / (eyeSize.top + eyeHeight / 2) * 100
  } else if (diffY > 0) {
    relationY = diffY / (windowHeight - (eyeSize.bottom - eyeHeight / 2)) * 100;
  } else {
    relationY = 0;
  }

  let checkSize = (100 - ((relationX * Math.sign(relationX) + relationY * Math.sign(relationY)) / 2) * 0.03);
  if (checkSize < 1) {
    checkSize = 1;
  }

  pupil.style.setProperty('--pupil-x', `${relationX * 0.3}px`);
  pupil.style.setProperty('--pupil-y', `${relationY * 0.3}px`);
  pupil.style.setProperty('--pupil-size', checkSize);
});