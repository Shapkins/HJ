'use strict';

const form = document.querySelector('form');
const select = document.querySelector('select');
const showSchemeButton = document.getElementById('btnSeatMap');
const mainContainer = document.getElementById('seatMapDiv');
const mapTitle = document.getElementById('seatMapTitle');
const totalPax = document.getElementById('totalPax');
const totalHalf = document.getElementById('totalHalf');
const totalAdult = document.getElementById('totalAdult');
const fullButton = document.getElementById('btnSetFull');
const emptyButton = document.getElementById('btnSetEmpty');
let response;
let title;

select.addEventListener('change', sendRequest);
showSchemeButton.addEventListener('click', showScheme);
fullButton.addEventListener('click', fullSeats);
emptyButton.addEventListener('click', emptySeats);
fullButton.disable = true;
emptyButton.disable = true;

function sendRequest() {
  let id = event.target.value;
  let request = new XMLHttpRequest();
  request.open('GET', `https://neto-api.herokuapp.com/plane/${id}`, true);
  request.send();
  request.addEventListener('load', schemeSeats);
  const options = event.target.getElementsByTagName('option')
  for(let option of options) {
    if(option.value === id) {
      title = option.textContent;
    }
  }
}

function schemeSeats() {
  if (event.target.status === 200) {
    response = JSON.parse(event.target.responseText);
  }
}

function showScheme(event) {
  event.preventDefault();
  mainContainer.textContent = '';
  fullButton.disable = false;
  emptyButton.disable = false;
  mapTitle.textContent = title;
  totalPax.textContent = response.passengers;
  totalHalf.textContent = 0;
  totalAdult.textContent = 0;
  for (let i = 0; i < response.scheme.length; i++) {
    if (response.scheme[i] === 6) {
      mainContainer.appendChild(createRow6(i));
    } else if (response.scheme[i] === 4) {
      mainContainer.appendChild(createRow4(i))
    }
  }
  const objectSeats = mainContainer.querySelectorAll('div.seat');
  for(let seat of objectSeats) {
    seat.addEventListener('click', changeSeat);
  } 
}

function el(tagName, attributes, children) {
  const element = document.createElement(tagName);
  if (typeof attributes === 'object') {
    Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
  }
  if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Array) {
    children.forEach(child => element.appendChild(child));
  }
  return element;
}

function createRow6(number) {
  return el('div', {class: 'row seating-row text-center'}, [
    el('div', {class: 'col-xs-1 row-number'}, [
      el('h2', {class: ''}, `${number}`)
    ]),
    el('div', {class: 'col-xs-5'}, [
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, 'A')
      ]),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, 'B')
      ]),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, 'C')
      ])
    ]),
    el('div', {class: 'col-xs-5'}, [
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, 'D')
      ]),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, 'E')
      ]),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, 'F')
      ])
    ])
  ])
}

function createRow4(number) {
  return el('div', {class: 'row seating-row text-center'}, [
    el('div', {class: 'col-xs-1 row-number'}, [
      el('h2', {class: ''}, `${number}`)
    ]),
    el('div', {class: 'col-xs-5'}, [
      el('div', {class: 'col-xs-4 no-seat'}),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, 'B')
      ]),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, 'C')
      ])
    ]),
    el('div', {class: 'col-xs-5'}, [
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, 'D')
      ]),
      el('div', {class: 'col-xs-4 seat'}, [
        el('span', {class: 'seat-label'}, 'E')
      ]),
      el('div', {class: 'col-xs-4 no-seat'})
    ])
  ])
}

function fullSeats() {
  event.preventDefault();
  const seats = mainContainer.querySelectorAll('div.seat');
  for(let seat of seats) {
    if (seat.classList.contains('half')) {
      seat.classList.remove('half');
    }
    seat.classList.add('adult');
  }
}


function emptySeats() {
  event.preventDefault();
  const seats = mainContainer.querySelectorAll('div.seat');
  for(let seat of seats) {
    if (seat.classList.contains('half')) {
      seat.classList.remove('half');
    }
    if (seat.classList.contains('adult')) {
      seat.classList.remove('adult');
    }
  }
}

function changeSeat(event) {
  event.stopPropagation();
  if (event.altKey) {
    if (event.target.classList.contains('adult')) {
      event.target.classList.remove('adult');
    }
    if (!(event.target.classList.contains('half'))) {
      event.target.classList.add('half'); 
    }
  } else {
    if (event.target.classList.contains('half')) {
      event.target.classList.remove('half');
    }
    if (!(event.target.classList.contains('adult'))) {
      event.target.classList.add('adult'); 
    }
  }
  footer();
}

function footer() {
  const seats = mainContainer.querySelectorAll('div.seat');
  let adults = 0;
  let children = 0;
  for(let seat of seats) {
    if (seat.classList.contains('half')) {
      children++;
    }
    if (seat.classList.contains('adult')) {
      adults++;
    }
  }
  totalAdult.textContent = adults;
  totalHalf.textContent = children;
}