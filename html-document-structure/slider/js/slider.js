'use strict';

const slides = document.querySelector('.slides');
let slideCurrent = slides.firstElementChild;
slideCurrent.classList.add('slide-current');

const btnPrev = document.querySelector('[data-action = prev]');
const btnNext = document.querySelector('[data-action = next]');
const btnFirst = document.querySelector('[data-action = first]');
const btnLast = document.querySelector('[data-action = last]');

function moveButton(selectedButton) {
    switch(selectedButton) {
        case 'next':
            return slideCurrent.nextElementSibling;
        case 'prev':
            return slideCurrent.previousElementSibling;
        case 'first':
            return slides.firstElementChild;
        case 'last':
            return slides.lastElementChild;
    }
}

function moveSlide(selectedButton) {
    const activatedSlide = moveButton(selectedButton);
    slideCurrent.classList.remove('slide-current');
    activatedSlide.classList.add('slide-current');

    btnNext.classList.toggle('disabled', !activatedSlide.nextElementSibling);
    btnLast.classList.toggle('disabled', !activatedSlide.nextElementSibling);
    btnPrev.classList.toggle('disabled', !activatedSlide.previousElementSibling);
    btnFirst.classList.toggle('disabled', !activatedSlide.previousElementSibling);

    slideCurrent = activatedSlide;
}

btnNext.addEventListener('click', event => moveSlide('next'));
btnPrev.addEventListener('click', event => moveSlide('prev'));
btnFirst.addEventListener('click', event => moveSlide('first'));
btnLast.addEventListener('click', event => moveSlide('last'));