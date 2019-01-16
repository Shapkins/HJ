'use strict';

const pollingCards = document.querySelectorAll('.pooling div');
polling();
setInterval(polling, 5000);

function polling() {
  const response = new XMLHttpRequest();
  response.addEventListener('load', onLoad);
  response.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
  response.send();
}

function onLoad(event) {
  if (event.target.status === 200) {
    activeCard(pollingCards, event.target.responseText);
  }
}