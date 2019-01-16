'use strict';

const longPollingCards = document.querySelectorAll('.long-pooling div');

longPolling();

function longPolling() {
  const response = new XMLHttpRequest();
  response.addEventListener('load', onLoad);
  response.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
  response.send();
}

function onLoad(event) {
  if (event.target.status === 200) {
    console.log(event.target)
    activeCard(longPollingCards, event.target.responseText);
  }
}