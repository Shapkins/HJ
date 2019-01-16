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
  //let formData = 1;
  fetch('https://neto-api.herokuapp.com/signin', {
    body: JSON.stringify(formData),
    credentials: "same-origin",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then((res) => {
    if (res.ok) {
      signIn.querySelector('output').textContent = `Пользователь ${signIn.querySelector('#email').value} успешно авторизован`;
    } else {
      throw new Error(res.statusText);
    }
  })
  .catch((err) => {
    signIn.querySelector('output').textContent = err.message;
  });
}


function signUpFunction(event) {
  event.preventDefault();
  let formData = new FormData(signUp);
  //let formData = 1;
  fetch('https://neto-api.herokuapp.com/signup', {
    body: JSON.stringify(formData),
    credentials: "same-origin",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then((res) => {
    if (res.ok) {
      signIn.querySelector('output').textContent = `Пользователь ${signUp.querySelector('#email').value} успешно зарегистрирован`;
    } else {
      throw new Error(res.statusText);
    }
  })
  .catch((err) => {
    signIn.querySelector('output').textContent = err.message;
  });
}