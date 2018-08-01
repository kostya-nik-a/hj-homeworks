'use strict';

let navigationElement = document.getElementsByTagName('nav')[0];
const secretTabKey = document.getElementsByClassName('secret')[0];
const secretWord = 'KeyYKeyTKeyNKeyJKeyKKeyJKeyUKeyBKeyZ';
const symbolCollection = [];

function showSecretCode(event) {
    symbolCollection.push(event.code);

    if (symbolCollection.join('').substr(-secretWord.length) === secretWord) {
        secretTabKey.classList.add('visible');
    }
};

function showNavigationMenu(event) {
    if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
        navigationElement.classList.toggle('visible');
    }
};

document.addEventListener('keydown', showNavigationMenu);
document.addEventListener('keydown', showSecretCode);