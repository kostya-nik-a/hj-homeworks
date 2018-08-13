'use strict';

let allTasks = document.querySelector('.list-block'),
    doneTask = allTasks.querySelectorAll('input[type="checkbox"]'),
    amountDoneTask = document.querySelector('output');

function checkDoneTask() {
    let checkedTask = allTasks.querySelectorAll('input[type="checkbox"]:checked');
    amountDoneTask.value = `${checkedTask.length} из ${doneTask.length}`;

    if (checkedTask.length === doneTask.length) {
        allTasks.classList.toggle('complete');
    } else {
        allTasks.classList.remove('complete');
    }
}

checkDoneTask();

for (let element of doneTask) {
    element.addEventListener('change', checkDoneTask);
}