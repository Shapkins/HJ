'use strict';

let labels = document.getElementsByTagName('label');
let nodeDone = document.getElementsByClassName('done')[0];
let nodeUndone = document.getElementsByClassName('undone')[0];


for(let label of labels) {
  label.addEventListener('click', checkTask);
}

function checkTask(event) {
  if (event.currentTarget.getElementsByTagName('input')[0].checked) {
    nodeUndone.appendChild(event.currentTarget);
    event.currentTarget.getElementsByTagName('input')[0].checked = false;
  } else {
    nodeDone.appendChild(event.currentTarget);
    event.currentTarget.getElementsByTagName('input')[0].checked = true;
  }
}
