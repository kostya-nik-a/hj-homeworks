'use strict';

let dataContacts = JSON.parse(loadContacts());

function toggleItem() {
    const contactsList = document.querySelector('.contacts-list');
    contactsList.innerHTML = '';

    for (let contact of dataContacts) {
        contactsList.innerHTML += `<li data-email="${contact.email}" data-phone="${contact.phone}"><strong>${contact.name}</strong></li>`;
    }
}

document.addEventListener('DOMContentLoaded', toggleItem);