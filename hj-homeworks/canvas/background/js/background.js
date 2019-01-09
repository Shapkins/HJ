'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
console.log(canvas)

class SkyObject {
  constructor (x = 0, y = 0) {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.width);
    this.size = (Math.floor(Math.random() * 6) + 1) / 10;
    this.weight = 5 * this.size;
    this.color = '#ffffff';
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
  let count = Math.floor(Math.random() * 101) + 25;
  for (let i = 0; i < count; i++) {
    drawSky();
  }
}

function drawSky() {
  let drawRound = new Round;
  ctx.beginPath();
  ctx.arc(drawRound.x, drawRound.y, drawRound.radius, 0, 2 * Math.PI);
  ctx.strokeStyle = drawRound.color;
  ctx.stroke();
  let drawCross = new Cross;
  ctx.beginPath();
  ctx.rotate(Math.PI * 2 * drawCross.angle / 360);
  ctx.moveTo(drawCross.x, drawCross.y);
  ctx.lineTo(drawCross.x + drawCross.side, drawCross.y);
  ctx.moveTo(drawCross.x, drawCross.y);
  ctx.lineTo(drawCross.x - drawCross.side, drawCross.y);
  ctx.moveTo(drawCross.x, drawCross.y);
  ctx.lineTo(drawCross.x, drawCross.y + drawCross.side);
  ctx.moveTo(drawCross.x, drawCross.y);
  ctx.lineTo(drawCross.x, drawCross.y - drawCross.side);
  ctx.stroke();
}

moreStars();