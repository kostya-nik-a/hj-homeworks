'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.style.background = "#000";
const colorStars = ['#ffffff', '#ffe9c4', '#d4fbff'];

function randomStars(min, max) {
    return Math.random() * (max - min) + min;
}

function starsSky() {
    ctx.clearRect(0, 0, canvas.width,  canvas.height);

    const starsAmount = Math.round(randomStars(200, 400));
    //console.log(starsAmount);
    for (let i = 0; i < starsAmount; i++) {
        ctx.beginPath();
        ctx.fillStyle = colorStars[Math.round(randomStars(0, 2))];
        ctx.globalAlpha = randomStars(0.8, 1);
        ctx.arc(
        Math.round(randomStars(0, canvas.width)),
        Math.round(randomStars(0, canvas.height)),
        randomStars(0, 1.1),
        0,
        Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

canvas.addEventListener('click', starsSky);
