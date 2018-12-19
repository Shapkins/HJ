'use strict';

let labels = document.getElementsByTagName('label');
let nodeDone = document.getElementsByClassName('done')[0];
let nodeUndone = document.getElementsByClassName('undone')[0];


for(let label of labels) {
  label.addEventListener('click', checkTask);
}

function checkTask(event) {
  const input = event.currentTarget.querySelector('input');
  if (!(input && input.checked)) {
    nodeUndone.appendChild(event.currentTarget);
  } else {
    nodeDone.appendChild(event.currentTarget);
  }
}
