'use strict';
const websocket = document.querySelector('.websocket');
const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

ws.addEventListener('message', (event) => {
    loadRandomNumber(websocket, event.data);
})



