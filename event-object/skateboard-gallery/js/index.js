'use strict';

let imgGallary = document.getElementsByTagName('a');
let imgRealSize = document.getElementById('view');

Array.from(imgGallary).forEach((element) => {

    element.addEventListener('click', (event) => {
        event.preventDefault();

        Array.from(imgGallary).forEach((currentImg) => {
            currentImg.classList.remove('gallery-current');
        });

        element.classList.toggle('gallery-current');
        imgRealSize.src = element.href;
    });
});