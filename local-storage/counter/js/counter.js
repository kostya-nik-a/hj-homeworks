'use strict';

let counter = document.querySelector('#counter'),
    increment = document.querySelector('#increment'),
    decrement = document.querySelector('#decrement'),
    reset = document.querySelector('#reset');

localStorage.counter ? counter.innerText = localStorage.counter : counter.innerText = 0;

function saveResultInLocalStorage(result) {
    localStorage.counter = result;
}

increment.addEventListener('click', () => {
    counter.innerText = ++counter.innerText;
    saveResultInLocalStorage(counter.innerText);
});

decrement.addEventListener('click', () => {
    if (counter.innerText > 0) {
        counter.innerText = --counter.innerText;
    } else {
        return;
    }
    saveResultInLocalStorage(counter.innerText);
});

reset.addEventListener('click', () => {
    counter.innerText = 0;
    saveResultInLocalStorage(counter.innerText);
});

