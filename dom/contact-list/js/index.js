'use strict';

let dataContacts = JSON.parse(loadContacts());
let contactItem;

function toggleItem() {
    const contactsList = document.getElementsByClassName('contacts-list')[0];
    contactsList.innerHTML = '';

    let i = 1;
    for (let contact of dataContacts) {
        contactsList.innerHTML += `<li><strong>${contact.name}</strong></li>`;

        contactItem = contactsList.querySelector(`.contacts-list :nth-child(${i})`);
        contactItem.dataset.email = contact.email;
        contactItem.dataset.phone = contact.phone;
        i++;
    }
}

document.addEventListener('DOMContentLoaded', toggleItem);