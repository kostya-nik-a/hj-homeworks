'use strict';

const done = document.querySelector('.done'),
    undone = document.querySelector('.undone');

function task(event) {
    const currentTask = event.target.parentElement;
    if (event.target.checked) {
        done.appendChild(currentTask);
    } else {
        undone.appendChild(currentTask);
    }
}

const tasks = document.querySelectorAll('input');

Array.from(tasks).forEach(item => item.addEventListener('click', task));
