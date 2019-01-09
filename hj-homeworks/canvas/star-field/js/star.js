'use strict';

const canvas = document.querySelector('canvas');
canvas.style.backgroundColor = '#000000';
const ctx = canvas.getContext('2d');
const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];
canvas.addEventListener('click', moreStars);


function moreStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let count = Math.floor(Math.random() * 201) + 200;
  for (let i = 0; i < count; i++) {
    drawStar();
  }
}

function drawStar() {
  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height);
  let color = Math.floor(Math.random() * colors.length);
  let radius = Math.floor(Math.random() * 55) / 100;
  let alpha = Math.floor(Math.random() * 20) / 100;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.globalAlpha = alpha + 0.8;
  ctx.strokeStyle = colors[color];
  ctx.stroke();
}