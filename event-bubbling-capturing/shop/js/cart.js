'use strict';

function clickOnAddToCart(event) {
    if (event.target.classList.contains('add-to-cart')) {
        event.preventDefault();
        addToCart({
            title: event.target.dataset.title,
            price: event.target.dataset.price
        });
    }
}

document.querySelector('main.items-list').addEventListener('click', clickOnAddToCart);