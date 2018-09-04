'use strict';

const zombiEye = document.querySelector('.big-book__pupil');

function openEye(event) {
    const posX = event.pageX,
        posY = event.pageY,
        bodyRect = document.body.getBoundingClientRect(),
        elemRect = zombiEye.getBoundingClientRect(),
        offsetX = elemRect.left - bodyRect.left + elemRect.width / 2,
        offsetY = elemRect.top - bodyRect.top + elemRect.height / 2,
        deltaX = posX - offsetX,
        deltaY = posY - offsetY,
        distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)),
        maxDistance = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
        maxSize = 3,
        minSize = 1,
        sizePupil = maxSize - (maxSize - minSize) * (distance / maxDistance),
        maxDelta = 30,
        pupilDeltaX = maxDelta * (deltaX / offsetX),
        pupilDeltaY = maxDelta * (deltaY / offsetY);

    zombiEye.style.setProperty('--pupil-size', sizePupil);
    zombiEye.style.setProperty('--pupil-x', pupilDeltaX + 'px');
    zombiEye.style.setProperty('--pupil-y', pupilDeltaY + 'px');
}

document.addEventListener("mousemove", openEye);