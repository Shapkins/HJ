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
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.size = (Math.floor(Math.random() * 5) + 1) / 10;
    this.weight = 5 * this.size;
    this.color = '#ffffff';
    this.redraw = functions[Math.floor(Math.random() * functions.length)];
  }
}

class Cross extends SkyObject {
  constructor (x, y) {
    super(x, y);
    this.side = 20 * this.size;
    this.angle = Math.floor(Math.random() * 360);
    this.speed = (Math.floor(Math.random() * 4) - 2) / 10;
  }
}

class Round extends SkyObject {
  constructor (x, y) {
    super(x, y);
    this.radius = 12 * this.size;
  }
}

function moreStars() {
  let count = Math.floor(Math.random() * 76) + 25;
  for (let i = 0; i < count; i++) {
    skyObjects.push(new Round((Math.floor(Math.random() * canvas.width)), Math.floor(Math.random() * canvas.height)));
    skyObjects.push(new Cross((Math.floor(Math.random() * canvas.width)), Math.floor(Math.random() * canvas.height)));
  }
}

function drawRound(round) {
  let {x, y} = round.redraw(round.x, round.y, Date.now());
  ctx.lineWidth = round.weight;
  ctx.strokeStyle = round.color;
  ctx.beginPath();
  ctx.arc(x, y, round.radius, 0, 2 * Math.PI, false);
  ctx.stroke();
}

function drawCross(cross) {
  let {x, y} = cross.redraw(cross.x, cross.y, Date.now());
  ctx.translate(x, y);
  ctx.rotate(Math.PI * 2 * cross.angle / 360)
  ctx.lineWidth = cross.weight;
  ctx.strokeStyle = cross.color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + cross.side, y);
  ctx.moveTo(x, y);
  ctx.lineTo(x - cross.side, y);
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + cross.side);
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - cross.side);
  ctx.stroke();
  ctx.rotate(- Math.PI * 2 * cross.angle / 360);
  ctx.translate(-x, -y);
  cross.angle += cross.speed;
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