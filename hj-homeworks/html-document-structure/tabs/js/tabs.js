'use strict';

let tabs = document.getElementsByClassName('tabs-content')[0];
let parentTab = document.getElementsByClassName('tabs-nav')[0];


for(let i = 0; i < tabs.children.length; i++) {
  let childTab = parentTab.getElementsByTagName('li')[0].cloneNode(true);
  parentTab.appendChild(childTab);
  if(i === tabs.children.length - 1) {
    parentTab.removeChild(childTab);
  }
}

for(let i = 0; i < tabs.children.length; i++) {
  tabs.children[i].classList.add('hidden');
  let changeTarget = parentTab.getElementsByTagName('li')[i].getElementsByTagName('a')[0];
  changeTarget.classList.add(tabs.children[i].dataset.tabIcon);
  changeTarget.textContent = tabs.children[i].dataset.tabTitle;
  parentTab.getElementsByTagName('li')[i].addEventListener('click', tabClick);
}

tabs.children[0].classList.toggle('hidden');
parentTab.getElementsByTagName('li')[0].classList.toggle('ui-tabs-active');

function tabClick(event) {
  if(!(event.currentTarget.classList.contains('ui-tabs-active'))) {
    for(let i = 0; i < tabs.children.length; i++) {
      let checkTarget = parentTab.getElementsByTagName('li')[i];
      if(checkTarget.classList.contains('ui-tabs-active')) {
        checkTarget.classList.toggle('ui-tabs-active');
        tabs.children[i].classList.toggle('hidden');
      }
      if(event.currentTarget === checkTarget) {
        checkTarget.classList.toggle('ui-tabs-active');
        tabs.children[i].classList.toggle('hidden');
      }
    }
  }
}