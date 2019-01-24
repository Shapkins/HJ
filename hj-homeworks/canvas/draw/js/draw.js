'use strict';

const 
  canvas = document.querySelector('canvas'),
  ctx = canvas.getContext('2d');

let 
  straightWidthProcess = true,
  straightColorProcess = true,
  inCanvas = false,
  width = 5,
  color = 0,
  stroke = null;

window.addEventListener('resize', changeWindowSize);
canvas.addEventListener('dblclick', doubleClickClear);
canvas.addEventListener('mousemove', mouseDraw);
canvas.addEventListener('mousedown', mouseDraw);
canvas.addEventListener('mouseleave', mouseDraw);
canvas.addEventListener('mouseup', mouseDraw);

changeWindowSize();
changer();

function mouseDraw(event) {
   if (event.type === 'mousedown') {
    inCanvas = true;
    stroke = `hsl(${color}, 100%, 50%)`;
    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = width;
    ctx.moveTo(event.clientX, event.clientY);
  }
  if (event.type === 'mousemove') {
    if (inCanvas) {
      ctx.strokeStyle = stroke;
      ctx.lineTo(event.clientX, event.clientY);
      ctx.stroke();
    }
  }
  if (event.type === 'mouseup') {
    if (inCanvas) {
      ctx.closePath();
    }
    inCanvas = false;
  }
  if (event.type === 'mouseleave') {
    inCanvas = false;
  } 
} 

function changer() { 
  setInterval(changeColor, 100);
  setInterval(changePen, 100);
}

function changeWindowSize() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function doubleClickClear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function changeColor(event) {
  if (event) {
    if (event.type === 'keydown') {
      if (event.key === 'Shift') {
        straightColorProcess = false;
      } else {
        straightColorProcess = true;
      }
    }
    if (event.type === 'keyup') {
      straightColorProcess = true;
    }
  }

  if (straightColorProcess) {
    color++;
    color = color % 360;
  } else {
    color--;
    if (color === -1) {
      color = 359;
    }
  }
}

function changePen() {
  if (straightWidthProcess) {
    width++;
    if (width === 100) {
      straightWidthProcess = false;
    }
  } else {
    width--;
    if (width === 5) {
      straightWidthProcess = true;
    }
  }
}