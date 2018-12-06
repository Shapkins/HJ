'use strict';

const tasks = document.getElementsByTagName('input');
toDoCount();

for(let task of tasks) {
  task.addEventListener('change', toDoCount)
}

function toDoCount() {
  let done = 0;
  for(let task of tasks) {
    if(task.checked) {
      done++;
    }
  document.getElementsByTagName('output')[0].innerHTML = done + ' из ' + tasks.length;
  if (done === tasks.length) {
    document.getElementsByClassName('list-block')[0].classList.toggle('complete');
  } else {
    if (document.getElementsByClassName('list-block')[0].classList.contains('complete')) {
      document.getElementsByClassName('list-block')[0].classList.toggle('complete');
    }
  }
  }

}