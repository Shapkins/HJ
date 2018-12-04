function getPriceFormatted(value) {
  return  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function addItem() {
  totalCount++;
  totalCost += parseInt(this.dataset.price);
  document.getElementById('cart-count').innerHTML = totalCount;
  document.getElementById('cart-total-price').innerHTML = getPriceFormatted(totalCost);
}

function init() {
  let plus = document.getElementsByClassName('fa-plus');
  for (let pict of plus) {
    pict.addEventListener('click', addItem);
  }
}

let totalCost = 0;
let totalCount = 0;

document.addEventListener('DOMContentLoaded', init);