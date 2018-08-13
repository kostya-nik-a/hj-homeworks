'use strict';

const done = document.querySelector('.done'),
    undone = document.querySelector('.undone');

function task(selectedItem) {
    const currentTask = selectedItem.parentElement;
    if (currentTask.parentElement.classList.contains('done')) {
        undone.appendChild(currentTask);
    } else {
      done.appendChild(currentTask);
    }
}

const tasks = document.querySelectorAll('input');

Array.from(tasks).forEach(item => item.addEventListener('click', function() {
    task(item);})
);