'use strict';

const 
  originalUrl = 'https://neto-api.herokuapp.com/profile/me',
  name = document.querySelector('[data-name]'),
  position = document.querySelector('[data-position]'),
  description = document.querySelector('[data-description]'),
  pic = document.querySelector('[data-pic]'),
  technologies = document.querySelector('[data-technologies]'),
  content = document.querySelector('.content'),
  functionName = 'profile';



function loadData(url) {
  return new Promise((done, err) => {
    let newUrl = `${url}?callback=${functionName}`;
    window[functionName] = done;
    
    const script = document.createElement('script');
    script.src = newUrl;
    document.body.appendChild(script);
  }
  );
}

function fillData(data) {
  let id = data.id;
  let techUrl = `https://neto-api.herokuapp.com/profile/${id}/technologies`;
  content.style.display = 'initial';
  name.textContent = data.name;
  position.textContent = data.position;
  description.textContent = data.description;
  pic.src = data.pic;
  return new Promise((done, err) => {
    let newUrl = `${techUrl}?callback=${functionName}`;
    window[functionName] = done;

    const script = document.createElement('script');
    script.src = newUrl;
    document.body.appendChild(script);
  })
}

function fillTech(data) {
  for(let tech of data) {
    const span = document.createElement('span');
    span.classList.add('devicons');
    span.classList.add(`devicons-${tech}`);
    technologies.appendChild(span);
  }
}

loadData(originalUrl).then(fillData).then(fillTech);