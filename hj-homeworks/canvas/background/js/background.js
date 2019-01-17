'use strict';

const canvas = document.querySelector('canvas'),
ctx = canvas.getContext('2d'),
functions = [function nextPoint(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
},
function nextPoint(x, y, time) {
  return {
    x: x + Math.sin((x + (time / 10)) / 100) * 5,
    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
  }
}];
let skyObjects = [];

class SkyObject {
  constructor (x = 0, y = 0) {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.width);
    this.size = (Math.floor(Math.random() * 6) + 1) / 10;
    this.weight = 5 * this.size;
    this.color = '#ffffff';
    this.redraw = functions[Math.floor(Math.random() * functions.length)];
  }
}

class Cross extends SkyObject {
  constructor (x = 0, y = 0) {
    super();
    this.side = 20 * this.size;
    this.angle = Math.floor(Math.random() * 360);
    this.speed = (Math.floor(Math.random() * 5) - 2) / 10;
  }
}

class Round extends SkyObject {
  constructor (x = 0, y = 0) {
    super();
    this.radius = 12 * this.size;
  }
}

function moreStars() {
  let count = Math.floor(Math.random() * 76) + 25;
  for (let i = 0; i < count; i++) {
    skyObjects.push(new Round);
    skyObjects.push(new Cross);
  }
}

function drawRound(round) {
  let {x, y} = round.redraw(round.x, round.y, Date.now());
  ctx.beginPath();
  ctx.arc(x, y, round.radius, 0, 2 * Math.PI);
  ctx.strokeStyle = round.color;
  ctx.stroke();
}

function drawCross(cross) {
  let {x, y} = cross.redraw(cross.x, cross.y, Date.now());
  ctx.beginPath();
  ctx.rotate(Math.PI * 2 * cross.angle / 360);
  ctx.moveTo(x, y);
  ctx.lineTo(x + cross.side, y);
  ctx.moveTo(x, y);
  ctx.lineTo(x - cross.side, y);
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + cross.side);
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - cross.side);
  ctx.stroke();
}

function redrawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of skyObjects) {
    if (star instanceof Cross) {
      drawCross(star);
    } else {
      drawRound(star);
    }
  }
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

moreStars();
setInterval(redrawAll, 50);