'use strict';

const slider = document.getElementById('slider');
const links = ['./i/airmax-jump.png', './i/airmax-on-foot.png', './i/airmax-playground.png', './i/airmax-top-view.png', './i/airmax.png'];
let phase = 0;
roulette();

function roulette() {
  slider.src = links[phase % 5];
  phase++;
}

setInterval(roulette, 5000);