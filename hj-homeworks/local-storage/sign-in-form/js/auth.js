'use strict';

const signIn = document.querySelector('.sign-in-htm');
const signUp = document.querySelector('.sign-up-htm');
const signInButton = signIn.querySelector('div .button');
const signUpButton = signUp.querySelector('div .button');

signInButton.addEventListener('click', signInFunction);
signUpButton.addEventListener('click', signUpFunction);

if (localStorage.email === undefined) {
  localStorage.email = '';
}
signIn.querySelector('#email').value = localStorage.email;

function signInFunction(event) {
  event.preventDefault();
  if (signIn.querySelector('.check').checked) {
    localStorage.email = signIn.querySelector('#email').value;
  }
  let formData = new FormData(signIn);
  let data = {};
  for (const [fieldName, fieldData] of formData) {
    data[fieldName] = fieldData;
  }

  //let formData = 1;
  fetch('https://neto-api.herokuapp.com/signin', {
    body: JSON.stringify(data),
    credentials: "same-origin",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      signIn.querySelector('output').textContent = data.message;
    } else {
      signIn.querySelector('output').textContent = `Пользователь ${data.name} успешно авторизован`;
    }
  })
  .catch((err) => {
    signIn.querySelector('output').textContent = err.message;
  });
}


function signUpFunction(event) {
  event.preventDefault();
  let formData = new FormData(signUp);
  let data = {};
  for (const [fieldName, fieldData] of formData) {
    data[fieldName] = fieldData;
  }
  console.log(JSON.stringify(data))
  //let formData = 1;
  fetch('https://neto-api.herokuapp.com/signup', {
    body: JSON.stringify(data),
    credentials: "same-origin",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    if (data.error) {
      signUp.querySelector('output').textContent = data.message;
    } else {
      signUp.querySelector('output').textContent = `Пользователь ${data.name} успешно зарегистрирован`;
    }
  })
  .catch((err) => {
    signUp.querySelector('output').textContent = err.message;
  });
}