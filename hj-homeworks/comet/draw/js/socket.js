'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/draw');

connection.addEventListener('open', () => {
  editor.addEventListener('update', changePicture);
});

function changePicture(event) {
  event.canvas.toBlob(picture => connection.send(picture));
}

connection.addEventListener('close', () => {
  editor.removeEventListener('update', changePicture);
})