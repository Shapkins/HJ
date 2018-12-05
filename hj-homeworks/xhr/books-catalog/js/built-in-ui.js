/* Данный JS код */

let request = new XMLHttpRequest();
request.open('GET', 'https://neto-api.herokuapp.com/book/', true);
request.send();
request.addEventListener('load', onLoad);

function onLoad() {
  if (request.status === 200) {
    const catalog = JSON.parse(request.responseText);
    let content = '';
    for(let i = 0; i < catalog.length; i++) {
      content += `<li data-title = "${catalog[i].title}" data-author = "${catalog[i].author.name}" data-info = "${catalog[i].info}" data-price = "${catalog[i].price}"> <img src = ${catalog[i].cover.small}> </li>`;
    }
    document.getElementById('content').innerHTML = content;
  }
}

// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});
