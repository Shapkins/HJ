'use strict';

list.addEventListener('click', buying);

function buying(event) {
  if (event.target.className === 'add-to-cart') {
    let item = {
      title: event.target.dataset.title, 
      price: event.target.dataset.price
    };
    addToCart(item);
  }
}