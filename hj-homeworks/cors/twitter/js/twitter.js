'use strict';

const 
  originalUrl = 'https://neto-api.herokuapp.com/twitter/jsonp',
  username = document.querySelector('[data-username]'),
  wallpaper = document.querySelector('[data-wallpaper]'),
  description = document.querySelector('[data-description]'),
  pic = document.querySelector('[data-pic]'),
  tweets = document.querySelector('[data-tweets]'),
  followers = document.querySelector('[data-followers]'),
  following = document.querySelector('[data-following]');

function loadData(url) {
  const functionName = 'twitter';
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
  username.textContent = data.username;
  followers.textContent = data.followers;
  following.textContent = data.following;
  tweets.textContent = data.tweets;
  description.textContent = data.description;
  pic.src = data.pic;
  wallpaper.src = data.wallpaper;
}

loadData(originalUrl).then(fillData);