'use strict';

const fields = document.getElementsByClassName('form-group');
const outputs = document.getElementsByTagName('output');
const zipKey = ['Tab', 'Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Backspace', 'Enter', 'CtrlLeft', 'ShiftLeft', 'CtrlRight', 'ShiftRight', 'NumpadEnter', 'AltLeft', 'AltRight', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

for(let field of fields) {
  field.addEventListener('change', checkForm);
  if ((field.getElementsByTagName('textarea').length !== 1) && (field.getElementsByTagName('input')[0].name === 'zip')) {
    field.addEventListener('keydown', zipInput);
  } 
}
document.querySelector('form button').addEventListener('click', showMessage);
document.querySelector('#output button').addEventListener('click', showMessage);


function checkForm() {
  let check = 0;
  for(let field of fields) {
    if ((field.getElementsByTagName('input')).length === 1) {
      if (field.getElementsByTagName('input')[0].value !== '') {
        check++;
      }
    } else if (field.getElementsByTagName('textarea').length === 1) {
      if (field.getElementsByTagName('textarea')[0].value !== '') {
        check++;
      }
    }
    if (check === fields.length) {
      document.getElementsByTagName('form')[0].getElementsByTagName('button')[0].disabled = false;
    } else {
      document.getElementsByTagName('form')[0].getElementsByTagName('button')[0].disabled = true;
    }
  }
}

function zipInput(event) {
  if (zipKey.find(element => element === event.code) === undefined) {
    event.preventDefault();
  }
}

function showMessage(event) {
  event.preventDefault();
  let newField;
  for(let field of fields) {
    if ((field.getElementsByTagName('input')).length === 1) {
      newField = field.getElementsByTagName('input');
    } else if (field.getElementsByTagName('textarea').length === 1) {
      newField = field.getElementsByTagName('textarea');
    }
    for(let output of outputs) {
      if (output.id === newField[0].name) {
        output.innerHTML = newField[0].value;
      }
    }
  }
  document.getElementsByTagName('form')[0].classList.toggle('hidden');
  document.getElementById('output').classList.toggle('hidden');
}