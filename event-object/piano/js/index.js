'use strict';

let defaultTypeOfSound = 'middle';
let buttons = document.getElementsByTagName('li');
let TypeOfSound = document.getElementsByClassName('set')[0];
const player = document.getElementsByTagName('audio')[0];
const nameOfSoundes = ['first', 'second', 'third', 'fourth', 'fifth'];

document.addEventListener('keydown', (event) => {
if (event.altKey) {
    defaultTypeOfSound = 'higher';
    TypeOfSound.classList.add('higher');
    TypeOfSound.classList.remove('middle', 'lower');
}

if (event.shiftKey) {
    defaultTypeOfSound = 'lower';
    TypeOfSound.classList.add('lower');
    TypeOfSound.classList.remove('middle', 'higher');
}

});

document.addEventListener('keyup', () => {
    defaultTypeOfSound = 'middle';
    TypeOfSound.classList.add('middle');
    console.log(TypeOfSound);
    TypeOfSound.classList.remove('higher', 'lower');
});

Array.from(buttons).forEach((btn, indexOfSoundes) => {
    btn.addEventListener('click', () => {
        console.log(player);
        player.src = `./sounds/${defaultTypeOfSound}/${nameOfSoundes[indexOfSoundes]}.mp3`;
        console.log(player.src);
        player.play();
    });
});
