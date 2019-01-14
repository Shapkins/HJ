'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
let clickData = {};
let jsonData;

connection.addEventListener('open', showBubbles(connection));
document.addEventListener('click', sendClick);

function sendClick(event) {
  clickData.x = event.clientX;
  clickData.y = event.clientY;
  jsonData = JSON.stringify(clickData);
  connection.send(jsonData);
}