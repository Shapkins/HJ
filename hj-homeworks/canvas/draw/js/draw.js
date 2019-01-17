'use strict';

const canvas = document.querySelector('canvas'),
ctx = canvas.getContext('2d'),
min = 5,
max = 100;
let h = 0,
radius = max,
radiusChange = 0,
hueChange = 1,
inCanvas = false;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
changeWindowSize();
changer();
window.addEventListener('resize', changeWindowSize);
canvas.addEventListener('dblclick', doubleClickClear);
canvas.addEventListener('mousemove', mouseDraw);
canvas.addEventListener('mousedown', mouseDraw);
canvas.addEventListener('mouseup', mouseDraw);
canvas.addEventListener('mouseleave', mouseDraw);
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
  if (event.type === 'click') {
    ctx.beginPath();
    ctx.arc(event.clientX, event.clientY, radius, 0, 2 * Math.PI);
    ctx.fill();
  }
  if (event.type === 'mousedown') {
    inCanvas = true;
    ctx.beginPath();
    ctx.strokeStyle = `hsl(${h}, 100%, 50%)`;
    ctx.moveTo(event.clientX, event.clientY);
  }
  if (event.type === 'mousemove') {
    if (inCanvas) {
      ctx.lineTo(event.clientX, event.clientY);
      ctx.lineWidth = radius;
    }
  }
  if (event.type === 'mouseup') {
    if (inCanvas) {
      ctx.stroke();
    }
  }
  if (event.type === 'mouseleave') {
    inCanvas = false;
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

