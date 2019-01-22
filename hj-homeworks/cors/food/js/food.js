'use strict';

const 
  originalUrl = 'https://neto-api.herokuapp.com/food/42',
  ratingUrl = 'https://neto-api.herokuapp.com/food/42/rating',
  consumeUrl = 'https://neto-api.herokuapp.com/food/42/consumers',
  pic = document.querySelector('[data-pic]'),
  title = document.querySelector('[data-title]'),
  ingredients = document.querySelector('[data-ingredients]'),
  rating = document.querySelector('[data-rating]'),
  star = document.querySelector('[data-star]'),
  votes = document.querySelector('[data-votes]'),
  consumers = document.querySelector('[data-consumers]'),
  functionName = 'food';

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
    title.textContent = data.title;
    pic.style.backgroundImage = `url(${data.pic})`;
    ingredients.textContent = data.ingredients.join(', ');
    return new Promise((done, err) => {
      let newUrl = `${ratingUrl}?callback=${functionName}`;
      window[functionName] = done;
      
      const script = document.createElement('script');
      script.src = newUrl;
      document.body.appendChild(script);
    }
    );
  }

  function fillRating(data) {
    rating.textContent = data.rating.toFixed(2);
    star.style.width = `${data.rating * 10}%`;
    votes.textContent = `${data.votes} оценок`;
    return new Promise((done, err) => {
      let newUrl = `${consumeUrl}?callback=${functionName}`;
      window[functionName] = done;
      
      const script = document.createElement('script');
      script.src = newUrl;
      document.body.appendChild(script);
    }
    );
  }

  function fillConsumers(data) {
    for(let person of data.consumers) {
      const img = document.createElement('img');
      img.title = person.name;
      img.src = person.pic;
      consumers.appendChild(img);
    }
    const span = document.createElement('span');
    span.textContent = `(+${data.total})`;
    consumers.appendChild(span);
  }

  loadData(originalUrl).then(fillData).then(fillRating).then(fillConsumers);