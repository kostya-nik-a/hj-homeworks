'use strict';

let links = document.getElementsByTagName('a');
let tag = document.getElementById('content');
let indLoader = document.getElementById('preloader');
let xhr = new XMLHttpRequest();

function onLoadStart() {
    indLoader.classList.remove('hidden');
}

function onLoad() {
    tag.innerHTML = xhr.responseText;
}

function onLoadEnd() {
    indLoader.classList.add('hidden');
}

function clickOnLink(linkClicked) {
    event.preventDefault();
    linkClicked = event.currentTarget.href;

    Array.from(links).forEach(link => link.classList.remove('active'));
    event.currentTarget.classList.add('active');

    xhr.addEventListener('loadstart', onLoadStart);
    xhr.addEventListener('load', onLoad);
    xhr.open('GET', linkClicked);
    xhr.send();
    xhr.addEventListener('loadend', onLoadEnd);
}

for (let link of links) {
    link.addEventListener('click', clickOnLink);
}

links[0].click();