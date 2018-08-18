'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('open', () => {
    console.log('Вебсокет-соединение открыто');
});

connection.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    document.querySelector('.counter').innerHTML = data.connections;
    document.querySelector('.errors').innerHTML = data.errors;
});

connection.addEventListener('close', event => {
    console.log('Вебсокет-соединение закрыто');
});

connection.addEventListener('error', error => {
    console.log(`Произошла ошибка: ${error.data}`);
});

window.addEventListener('beforeunload', () => {
    connection.onclose = function () {};
    connection.close(1000, 'Работа закончена');
});