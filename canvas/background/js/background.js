'use strict';

const canvas = document.getElementById('wall');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function nextPointOne(x, y, time) {
    return {
        x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
        y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
}

function nextPointTwo(x, y, time) {
    return {
        x: x + Math.sin((x + (time / 10)) / 100) * 5,
        y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
}

let drowObjects = [];

function craeteObjects() {
    drowObjects.push({
        funcTime : getRandomInt(0, 1),
        size : getRandom(0.1, 0.6),
        x : Math.random() * canvas.width,
        y : Math.random() * canvas.height
    })
}

function draw(object, index) {
    ctx.lineWidth = 5 * object.size;
    ctx.strokeStyle = 'white';
    let newPoint = {};

    if (object.funcTime === 0) {
        newPoint = nextPointOne(object.x, object.y, Date.now());
    } else {
        newPoint = nextPointTwo(object.x, object.y, Date.now());
    }
    ctx.beginPath();

    if (index % 2 === 0) {
        ctx.arc(
            newPoint.x,
            newPoint.y,
            12 * object.size,
            0,
            2 * Math.PI,
            false);
        ctx.stroke();
        ctx.closePath();
    } else {
        let corner = getRandomInt(0, 360);
        ctx.translate(newPoint.x, newPoint.y);
        ctx.rotate(corner);
        ctx.moveTo(-10 * object.size, 0);
        ctx.lineTo(+10 * object.size, 0);
        ctx.moveTo(0, +10 * object.size);
        ctx.lineTo(0, -10 * object.size);
        ctx.stroke();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

for (let i = 0; i < getRandomInt(50, 200); i++) {
    craeteObjects()
}

function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drowObjects.forEach((item, index) => {
        draw(item, index)
    })
}

setInterval(tick, 200);