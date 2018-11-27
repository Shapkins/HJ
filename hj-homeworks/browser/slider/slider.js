'use strict';

const slider = document.getElementById('slider');
let phase = 0;
function roulette() {
  switch (phase % 5) {
    case 0:
      slider.src = './i/airmax-jump.png';
      break;
    case 1:
      slider.src = './i/airmax-on-foot.png';
      break;
    case 2:
      slider.src = './i/airmax-playground.png';
      break;
    case 3:
      slider.src = './i/airmax-top-view.png';
      break;
    default:
      slider.src = './i/airmax.png';
  }
  phase++;
}
setInterval(roulette, 5000);