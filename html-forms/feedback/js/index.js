'use strict';

let regexp = /\d/,
    postcode = document.querySelector('input[name = "zip"]'),
    phone = document.querySelector('input[name = "phone"]'),
    buttonSend = document.querySelector('.contentform .button-contact'),
    buttonChange = document.querySelector('#output .button-contact'),
    contentForm = document.querySelector('.contentform'),
    inputs = document.querySelectorAll('input'),
    outputs = document.querySelectorAll('output'),
    message = document.querySelector('#output'),
    textarea =  document.querySelector('textarea');

postcode.addEventListener('keypress', function(event) {
    let key = event.key;
    if (key.search(regexp) == -1) {
        event.preventDefault();
    }
});

phone.addEventListener('keypress', function(event) {
    let key = event.key;
    if (key.search(regexp) == -1) {
        event.preventDefault();
    }
});

buttonSend.addEventListener('click', function(event) {
    event.preventDefault();
    for (let input of inputs) {
        Array.from(outputs).forEach((output) => {
            if (input.name === output.id) {
            output.value = input.value;
        }
    });
    }
    contentForm.classList.add('hidden');
    message.classList.remove('hidden');
});

buttonChange.addEventListener('click', function(event) {
    event.preventDefault();
    message.classList.add('hidden');
    contentForm.classList.remove('hidden');
});

function disable() {
    if (!textarea.value) {
        buttonSend.disabled = true;
        return;
    }
    for (let input of inputs) {
        if (!input.value) {
            buttonSend.disabled = true;
            return;
        }
        buttonSend.disabled = false;
    }
}

for (let input of inputs) {
    input.addEventListener('input', disable);
}
textarea.addEventListener('input', disable);



