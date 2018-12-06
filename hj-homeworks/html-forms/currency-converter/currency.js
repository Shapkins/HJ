'use strict';

let currencies = [];
let currencyList = [];

let request = new XMLHttpRequest();
request.addEventListener('loadend', onLoad);
request.addEventListener('loadstart', preloader);
request.open('GET', 'https://neto-api.herokuapp.com/currency', true);
request.send();

function onLoad() {
  if (this.status === 200) {
    if (!(document.getElementById('loader').classList.contains('hidden'))) {
      document.getElementById('loader').classList.toggle('hidden');
    }
    document.getElementById('content').classList.toggle('hidden');  
    currencies = JSON.parse(request.responseText);
    currencyList = currencies.map(element => element.code);
    
    let content = '';
    for(let currency of currencyList) {
      content += `<option value="${currency}">${currency}</option>`;
    }
    document.getElementById('from').innerHTML = content;
    document.getElementById('to').innerHTML = content;
    convert();
    document.getElementById('source').addEventListener('input', convert);
    document.getElementById('from').addEventListener('input', convert);
    document.getElementById('to').addEventListener('input', convert);
  }
}

function preloader() {
  if (this.status !== 200) {
    if (document.getElementById('loader').classList.contains('hidden')) {
      document.getElementById('loader').classList.toggle('hidden');
    }
  }
}

function convert() {
  let from = currencies.find(element => document.getElementById('from').value === element.code).value;
  let to = currencies.find(element => document.getElementById('to').value === element.code).value;
  let fromTo = Math.round(document.getElementById('source').value * from / to * 100) / 100;
  document.getElementById('result').innerHTML = fromTo;
}