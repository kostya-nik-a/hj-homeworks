'use strict';

const longPooling = document.querySelector('.long-pooling');
const xhrLongPooling =  new XMLHttpRequest();


function onError(event) {
    if (event.target == xhrLongPooling) {
        console.log('Ошибка в Comet-соединении LongPooling. Перезапуск');
        setTimeout(xhrLongPooling, 2000);
    }
}

function loadRandomNumber(array, data) {
    Array.from(array.querySelectorAll('div')).forEach((number) => {
        number.classList.toggle('flip-it', number.textContent == data);
    });
}

function longPoolings() {
    setInterval(() => {
        xhrLongPooling.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling', true);
        xhrLongPooling.send();
        xhrLongPooling.addEventListener('load', () => {
            if (xhrLongPooling.status >= 200 && xhrLongPooling.status < 300) {
                const numberLongPooling = JSON.parse(xhrLongPooling.responseText.trim());
                loadRandomNumber(longPooling, numberLongPooling);
            }
        });
}, 5000);
    xhrLongPooling.addEventListener('error', onError)
}

longPoolings();



