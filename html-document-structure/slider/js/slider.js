'use strict';

const slides = document.querySelector('.slides');
let slideCurrent = slides.firstElementChild;
slideCurrent.classList.add('slide-current');

const btnPrev = document.querySelector('[data-action = prev]');
const btnNext = document.querySelector('[data-action = next]');
const btnFirst = document.querySelector('[data-action = first]');
const btnLast = document.querySelector('[data-action = last]');

btnPrev.classList.add('disabled');
btnFirst.classList.add('disabled');

function moveButton() {
    slideCurrent.classList.remove('slide-current');

    switch(event.target.dataset.action) {
        case 'next':
            return slideCurrent.nextElementSibling;
            break;
        case 'prev':
            return slideCurrent.previousElementSibling;
            break;
        case 'first':
            return slides.firstElementChild;
            break;
        case 'last':
            return slides.lastElementChild;
            break;
    }
}

function moveSlide() {
    const activatedSlide = moveButton(event.target.dataset.action);
    if (activatedSlide.nextElementSibling) {
        btnNext.classList.remove('disabled');
        btnLast.classList.remove('disabled');
    } else {
        btnNext.classList.add('disabled');
        btnLast.classList.add('disabled');
    }

    if (activatedSlide.previousElementSibling) {
        btnPrev.classList.remove('disabled');
        btnFirst.classList.remove('disabled');
    } else {
        btnPrev.classList.add('disabled');
        btnFirst.classList.add('disabled');
    }


    slideCurrent.classList.remove('slide-current');
    activatedSlide.classList.add('slide-current');

    btnNext.disabled = activatedSlide.nextElementSibling ? false : true;
    btnLast.disabled = activatedSlide.lastElementChild ? false : true;
    btnPrev.disabled = activatedSlide.previousElementSibling ? false : true;
    btnFirst.disabled = activatedSlide.firstElementChild ? false : true;

    slideCurrent = activatedSlide;
}

btnNext.addEventListener('click', event => moveSlide('next'));
btnPrev.addEventListener('click', event => moveSlide('prev'));
btnFirst.addEventListener('click', event => moveSlide('first'));
btnLast.addEventListener('click', event => moveSlide('last'));
