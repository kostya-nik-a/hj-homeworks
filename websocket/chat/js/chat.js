'use strict';

const connection  = new WebSocket('wss://neto-api.herokuapp.com/chat');
const messages    = document.querySelector('.chat .messages .messages-content');
const templates   = document.querySelector('.chat .messages .messages-templates');

connection.addEventListener('open', () => {
    let userStatus = document.querySelector('.chat .chat-status');
    userStatus.innerHTML = userStatus.dataset.online;
    document.querySelector('.chat .message-submit').disabled = false;

    let userOnline = templates.querySelector('.message.message-status').cloneNode(true);
    userOnline.querySelector('.message-text').innerHTML = "Пользователь появился в сети";
    messages.append(userOnline);
});

connection.addEventListener('message', event => {
    if (event.data === "...") {
    messages.append(templates.querySelector('.message.loading').cloneNode());
} else {
    messages.removeChild(messages.querySelector('.message.loading:last-child'));
    let messRemote = templates.querySelector('[class="message"]').cloneNode(true);
    messRemote.querySelector('.message-text').innerHTML = event.data;
    const currHM = new Date();
    messRemote.querySelector('.timestamp').innerHTML = `${addZ(currHM.getHours())}:${addZ(currHM.getMinutes())}`;
    messages.append(messRemote);
}
});

function addDate(n) {
    return n < 10 ? '0' + n : '' + n;
}

document.querySelector('.chat .message-submit').addEventListener('click', event => {
    event.preventDefault();
    const messOurStr = document.querySelector('.chat .message-input').value;

    if (messOurStr !== "") {
        connection.send(messOurStr);
        let messOur = templates.querySelector('.message.message-personal').cloneNode(true);
        messOur.querySelector('.message-text').innerHTML = messOurStr;
        const currentHM = new Date();
        messOur.querySelector('.timestamp').innerHTML = `${addDate(currentHM.getHours())}:${addDate(currentHM.getMinutes())}`;
        messages.append(messOur);
        document.querySelector('.chat .message-input').value = '';
    }
});

connection.addEventListener('close', event => {
    let userStatus = document.querySelector('.chat .chat-status');
    userStatus.innerHTML = userStatus.dataset.offline;
    document.querySelector('.chat .message-submit').disabled = true;

    let userOffline = templates.querySelector('.message.message-status').cloneNode(true);
    userOffline.querySelector('.message-text').innerHTML = "Пользователь не в сети";
    messages.append(userOffline);
});

connection.addEventListener('error', error => {
    console.log(`Произошла ошибка: ${error.data}`);
});