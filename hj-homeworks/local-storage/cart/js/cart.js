'use strict';

const 
colorSnippet = document.getElementById('colorSwatch'),
sizeSnippet = document.getElementById('sizeSwatch'),
cart = document.getElementById('quick-cart'),
targets = document.getElementsByClassName('swatch-element'),
clickingArea = document.querySelector('.swatches'),
form = document.getElementById('AddToCartForm'),
formButton = document.getElementById('AddToCart');

let 
colorsAvailable = new XMLHttpRequest(),
sizeAvailable = new XMLHttpRequest(),
cartStatus = new XMLHttpRequest();

colorsAvailable.open('GET', 'https://neto-api.herokuapp.com/cart/colors', true);
colorsAvailable.send();
colorsAvailable.addEventListener('load', colorPrint);

sizeAvailable.open('GET', 'https://neto-api.herokuapp.com/cart/sizes', true);
sizeAvailable.send();
sizeAvailable.addEventListener('load', sizePrint);

updateCart();
clickingArea.addEventListener('click', clickSize);
formButton.addEventListener('click', sendForm);

function colorPrint() {
  let 
  divClass,
  inputClass,
  choice;
  if (event.target.status === 200) {
    const response = JSON.parse(event.target.responseText);
    for (let color of response) {
      if (color.isAvailable) {
        divClass = 'available';
        inputClass = '';
      } else {
        divClass = 'soldout';
        inputClass = 'disabled';
      }
      if (localStorage.color === color.type) {
        choice = 'checked';
      } else {
        choice = '';
      }
      colorSnippet.innerHTML += `<div data-value="${color.type}" class="swatch-element color ${color.type} ${divClass}"><div class="tooltip">${color.title}</div><input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" ${inputClass} ${choice}><label for="swatch-1-${color.type}" style="border-color: red;"><span style="background-color: ${color.code};"></span><img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"></label></div>`;
    }
  }
}

function sizePrint() {
  let 
  divClass,
  inputClass,
  choice;
  if (event.target.status === 200) {
    const response = JSON.parse(event.target.responseText);
    for (let size of response) {
      if (size.isAvailable) {
        divClass = 'available';
        inputClass = '';
      } else {
        divClass = 'soldout';
        inputClass = 'disabled';
      }
      if (localStorage.size === size.type) {
        choice = 'checked';
      } else {
        choice = '';
      }
      sizeSnippet.innerHTML += `<div data-value="${size.type}" class="swatch-element plain ${size.type} ${divClass}"><input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${inputClass} ${choice}><label for="swatch-0-${size.type}">${size.title}<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"></label></div>`;
    }
  }
}

function cartPrint() {
  let sum = 0;
  let addingPrice = 0;
  cart.innerHTML = '';
  if (event.target.status === 200) {
    const response = JSON.parse(event.target.responseText);
    for (let item of response) {
      cart.innerHTML += `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;"><div class="quick-cart-product-wrap">  <img src="${item.pic}" title="${item.title}">  <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>  <span class="s2"></span></div><span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span><span class="quick-cart-product-remove remove" data-id="${item.id}"></span></div>`;
      }
    let prices = cart.getElementsByClassName('s1');
    let counts = cart.getElementsByClassName('count');
    for (let price of prices) {
      addingPrice = parseFloat(price.innerHTML.slice(1)).toFixed(2);
    }
    for (let count of counts) {
      sum += + (addingPrice * count.innerHTML).toFixed(2);
    }
    cart.innerHTML += `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open"><span>  <strong class="quick-cart-text">Оформить заказ<br></strong>  <span id="quick-cart-price">$${sum.toFixed(2)}</span></span></a>`;
    if (response.length === 0) {
      cart.querySelector('.cart-ico').classList.remove('open');
    } else {
      if (!(cart.querySelector('.cart-ico').classList.contains('open'))) {
        cart.querySelector('.cart-ico').classList.add('open');
      }
      const removeButton = cart.querySelector('.quick-cart-product-remove');
      removeButton.addEventListener('click', removeFromForm);
    }
  }
}

function clickSize(event) {
  event.stopPropagation();
  if (event.target.parentNode.dataset.value !== undefined) {
    if ((event.target.parentNode.dataset.value.length < 3) || (event.target.parentNode.dataset.value === 'xxl')) {
      localStorage.size = event.target.parentNode.dataset.value;
    } else {
      localStorage.color = event.target.parentNode.dataset.value;
    }
  }
}

function sendForm() {
  event.preventDefault();
  const postForm = new XMLHttpRequest();
  let formData = new FormData(form);
  formData.append('productId', form.dataset.productId);
  postForm.addEventListener('load', updateCart);
  postForm.open('POST', 'https://neto-api.herokuapp.com/cart');
  postForm.send(formData);
}

function removeFromForm() {
  const removeForm = new XMLHttpRequest();
  let formData = new FormData();
  formData.append('productId', event.target.dataset.id);
  removeForm.addEventListener('load', updateCart);
  removeForm.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
  removeForm.send(formData);
  updateCart();
}

function updateCart() {
  cartStatus.open('GET', 'https://neto-api.herokuapp.com/cart', true);
  cartStatus.send();
  cartStatus.addEventListener('load', cartPrint);
}