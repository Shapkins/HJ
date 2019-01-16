'use strict';

const longPollingCards = document.querySelectorAll('.long-pooling div');

longPolling();

function longPolling() {
  const longResponse = new XMLHttpRequest();
  longResponse.addEventListener('load', longOnLoad);
  longResponse.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
  longResponse.send();
}

function longOnLoad(event) {
  console.log(event.target)
  if ((event.target.status >= 200) && (event.target.status < 300)) {
    activeCard(longPollingCards, event.target.responseText);
  }
  longPolling();
}