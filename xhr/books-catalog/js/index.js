'use strict';

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
xhr.send();

function onLoad() {
    let dataBooks = JSON.parse(xhr.responseText);

    let bookList = document.getElementById('content');
    bookList.innerHTML = '';

    for (let book of dataBooks) {
        bookList.innerHTML += `<li data-title="${book.title}" data-author="${book.author.name}" data-info="${book.info}" data-price="${book.price}"><img src="${book.cover.small}"></li>`;
    }
}

xhr.addEventListener('load', onLoad);