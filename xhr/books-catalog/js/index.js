'use strict';

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
xhr.send();

function onLoad() {
    let dataBooks = JSON.parse(xhr.responseText);

    let bookList = document.getElementById('content');
    bookList.innerHTML = '';

    let i = 1;
    for (let book of dataBooks) {
        bookList.innerHTML += `<li><img src="${book.cover.small}"></li>`;

        let bookItem = bookList.querySelector(`#content :nth-child(${i})`);

        bookItem.dataset.title = book.title;
        bookItem.dataset.author = book.author.name;
        bookItem.dataset.info = book.info;
        bookItem.dataset.price = book.price;
        i++;
    }
}

xhr.addEventListener('load', onLoad);