'use strict';

function setItemInCart() {
    let items = document.getElementsByClassName('add');
    let amountInCart = document.getElementById('cart-count');
    let priceInCart = document.getElementById('cart-total-price');
    let amount = 0, price, totalPrice = 0;

    for (let item of items) {
        item.addEventListener('click', (element) => {
            price = Number(element.currentTarget.getAttribute('data-price'));
            amount++;
            totalPrice += price;
            amountInCart.innerHTML = amount;
            priceInCart.innerHTML = getPriceFormatted(totalPrice);

        });
    }
}

document.addEventListener('DOMContentLoaded', setItemInCart);