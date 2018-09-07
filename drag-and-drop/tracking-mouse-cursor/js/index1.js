'use strict';

const eyeLeft = document.querySelector('.cat_eye_left');
const eyeRight = document.querySelector('.cat_eye_right');

const boundsL = document.querySelector('.cat_position_for_left_eye').getBoundingClientRect();
const boundsR = document.querySelector('.cat_position_for_right_eye').getBoundingClientRect();

function catEye(valueInt, position){
    if(valueInt < boundsL.x && position === 'left') {
        eyeLeft.style.left = valueInt / boundsL.x + '%';
        eyeRight.style.left = valueInt / boundsL.x + '%';
    }

    else if (valueInt > boundsL.x && position === 'left') {
        eyeLeft.style.left = boundsL.width + boundsL.x / valueInt  + '%';

        if (valueInt > boundsL.x && valueInt < boundsR.x) {
            eyeRight.style.left = - boundsR.x / valueInt + '%';
        }
        else {
            eyeRight.style.left = boundsL.width + boundsR.x / valueInt + '%';
        }
    }

    else

    if(valueInt < boundsL.y && position === 'top') {
        eyeLeft.style.top = valueInt / boundsL.y + '%';
        eyeRight.style.top = valueInt / boundsR.y + '%';
    }

    else if (valueInt > boundsL.y && position === 'top') {
        eyeLeft.style.top = boundsL.height + boundsL.y / valueInt  + '%';
        eyeRight.style.top = boundsR.height + boundsR.y / valueInt  + '%';
    }
}

document.addEventListener('mousemove', event => {
    if(event.pageX) {
    catEye(event.pageX, 'left');
}
if(event.pageY) {
    catEye(event.pageY, 'top');
}
});
