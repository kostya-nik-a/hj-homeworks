'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', () => {
    console.log('Вебсокет-соединение открыто');
    showBubbles(connection);
});

connection.addEventListener('error', error => {
    console.log(`Произошла ошибка: ${error.data}`);
});

function dotClick(event) {
    connection.send(JSON.stringify({
        x: event.clientX,
        y: event.clientY
    }));
}

document.addEventListener("click", dotClick);