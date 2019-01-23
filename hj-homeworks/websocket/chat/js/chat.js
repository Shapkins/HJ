'use strict';

const
  workArea = document.querySelector('.chat'),
  typeMessage = workArea.querySelector('.message-box'),
  inputMessage = typeMessage.querySelector('.message-input'),
  sendMessage = typeMessage.querySelector('.message-submit'),
  messages = workArea.querySelector('.messages-content'),
  templates = workArea.querySelector('.messages-templates'),
  status = workArea.querySelector('.chat-status');

let
  typing,
  push,
  userMessage,
  otherMessage,
  newMessage;

  //запоминаем шаблоны

for(let template of templates.getElementsByClassName('message')) {
  if (template.classList.contains('loading')) {
    typing = template;
  } else if (template.classList.contains('message-status')) {
    push = template;
  } else if (template.classList.contains('message-personal')) {
    userMessage = template;
  } else {
    otherMessage = template;
  }
}

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

//метка онлайна пользователя по открытию соединения и активация кнопки:

connection.addEventListener('open', () => {
  status.textContent = status.dataset.online;
  sendMessage.disabled = false;
  workArea.querySelector('form').action = '';
  messages.appendChild(push);
  let elements = messages.querySelectorAll('.message-text');  
  elements[elements.length - 1].textContent = 'Пользователь появился в сети';

  sendMessage.addEventListener('click', sending);
  document.addEventListener('keydown', sending);
});

//метка онлайна по закрытию соединения и деактивация кнопки:

connection.addEventListener('close', () => {
  status.textContent = status.dataset.offline;
  sendMessage.disabled = true;
  messages.appendChild(push);
});


//отправка сообщения:

function sending(event) {
  if (!(sendMessage.disabled)) {
    if ((event.key === 'Enter') || (event.target === sendMessage)) {
      event.preventDefault();
      if (inputMessage.value) {
        newMessage = userMessage.cloneNode(true);
        newMessage.querySelector('.message-text').textContent = inputMessage.value;
        newMessage.querySelector('.timestamp').textContent = formatTime();
        messages.appendChild(newMessage);

        connection.send(inputMessage.value);
        inputMessage.value = '';
      }
    }
  }
}

//форматирование времени

function formatTime() {
  let string = '';
  let date = new Date();
  if (date.getHours() < 10) {
    string += '0';
  }
  string += date.getHours();
  string += ':';
  if (date.getMinutes() < 10) {
    string += '0';
  }
  string += date.getMinutes();
  return string;
}

//загрузка сообщений

connection.addEventListener('message', () => {
  if (event.data === '...') {
    newMessage = typing.cloneNode(true);
    messages.appendChild(newMessage);
  } else {
    if (messages.querySelector('.loading')) {
      messages.querySelector('.loading').remove();
    }
    newMessage = otherMessage.cloneNode(true);
    newMessage.querySelector('.message-text').textContent = event.data;
    newMessage.querySelector('.timestamp').textContent = formatTime();
    messages.appendChild(newMessage);
  }
})