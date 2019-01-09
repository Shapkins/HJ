'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const min = 5;
const max = 100;
const s = 1;
const l = 0.5;
let h = 0;
let radius = max;
let radiusChange = 0;
let hueChange = 1;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
changeWindowSize();
changer();
window.addEventListener('resize', changeWindowSize);
canvas.addEventListener('dblclick', doubleClickClear);
canvas.addEventListener('mousemove', mouseDraw);
canvas.addEventListener('mousedown', mouseDraw);
canvas.addEventListener('mouseup', mouseDraw);
document.addEventListener('keydown', hslHueChange);
document.addEventListener('keyup', hslHueChange);

function changer() { 
  setInterval(detailChangeRadius, 1000);
  setInterval(changeH, 1000);
}

function detailChangeRadius() {
  if (radius === min) {
    radiusChange = 1;
  } else if (radius === max) {
    radiusChange = -1;
  }
  radius += radiusChange;
}

function changeWindowSize() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function doubleClickClear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function mouseDraw(event) {
  event.preventDefault();
  console.log(event)
  if (event.type === 'click') {
    ctx.beginPath();
    ctx.arc(event.clientX, event.clientY, radius, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (event.type === 'mousedown') {
    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY);
  }
  if (event.type === 'mousemove') {
    ctx.lineTo(event.clientX, event.clientY);
    ctx.lineWidth = radius;
  }
  if (event.type === 'mouseup') {
    ctx.stroke();
  }
}

function changeH() {
  h += hueChange;
  if (h > 359) {
    h = 359;
  } else if (h < -1) {
    h = 0;
  }
}

function hslHueChange(event) {
  if (event.type === 'keydown') {
    if (event.key === 'Shift') {
      hueChange = -1; 
    } else {
      hueChange = 1;
    }
  }
  if (event.type === 'keyup') {
    hueChange = 1;
  }
}

