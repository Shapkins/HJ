'use strict';

const webSocketCards = document.querySelectorAll('.websocket div');
const connection = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

connection.addEventListener('message', () => {
  activeCard(webSocketCards, event.data)
});

function activeCard(cards, current) {
   for (let card of cards) {
    if (card.classList.contains('flip-it')) {
      card.classList.remove('flip-it');
    }
   }
   cards[current - 1].classList.add('flip-it');
}