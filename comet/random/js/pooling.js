'use strict';
const pooling = document.querySelector('.pooling');
const xhrPooling =  new XMLHttpRequest();

function onError(event) {
    if (event.target == xhrPooling) {
        console.log('Ошибка в Comet-соединении Pooling. Перезапуск');
        setTimeout(xhrPooling, 2000);
    }
}

function poolings() {
    setInterval(() => {
        xhrPooling.open('GET', 'https://neto-api.herokuapp.com/comet/pooling', true);
        xhrPooling.send();

        xhrPooling.addEventListener('load', () => {
            if (xhrPooling.status >= 200 && xhrPooling.status < 300) {
                const numberPooling = JSON.parse(xhrPooling.responseText);
                loadRandomNumber(pooling, numberPooling);
            }
        });
}, 5000);
    xhrPooling.addEventListener('error', onError)
}

poolings();




