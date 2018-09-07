'use strict';

const input = document.querySelector('.textarea');
const message = document.querySelector('.message');
const block = document.querySelector('.block');


function moveText(callback, delay) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            callback();
        }, delay);
    };
}


input.addEventListener('focus', () => block.classList.add('active'));

input.addEventListener('input', () => {
    block.classList.add('active');
    message.classList.remove('view');
});

input.addEventListener('blur', () => {
    block.classList.remove('active');
    message.classList.remove('view');
});

input.addEventListener('keydown', moveText(() => {
    message.classList.add('view');
    block.classList.remove('active');
}, 2000));