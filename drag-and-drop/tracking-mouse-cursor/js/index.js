'use strict';

const eyeLeft = document.querySelector('.cat_position_for_left_eye');
const eyeRight = document.querySelector('.cat_position_for_right_eye');
const boundsLeft = eyeLeft.getBoundingClientRect();
const boundsRight = eyeRight.getBoundingClientRect();

function moveCatEye(eye, amount, position){
    if (position === 'left') {
        eye.firstElementChild.style.left = amount + '%';
    } else if (position === 'top'){
        eye.firstElementChild.style.top = amount + '%';
    }
}

function tracingMouse(event, bound, eye) {
    const {pageX, pageY} = event;
    const {bottom, left, right, top} = bound;

    if (pageX > right) {
        moveCatEye(eye, 50, 'left');
    } else if (pageX < left) {
        moveCatEye(eye, 0, 'left');
    } else {
        moveCatEye(eye, 25, 'left');
    }

    if (pageY < top) {
        moveCatEye(eye, 0, 'top');
    } else if (pageY > bottom) {
        moveCatEye(eye, 50, 'top');
    } else {
        moveCatEye(eye, 25, 'top');
    }
}

document.addEventListener('mousemove', event => {
    tracingMouse(event, boundsLeft, eyeLeft);
    tracingMouse(event, boundsRight, eyeRight);
});