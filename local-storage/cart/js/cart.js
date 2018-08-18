'use strict';

function swatchColor(id, data) {
    return `<div data-value="${data.type}" class="swatch-element color ${data.type} ${data.isAvailable ? "available" : "soldout"}">
        <div class="tooltip">${data.title}</div>
        <input quickbeam="color" id="swatch-${id}-${data.type}" type="radio" name="color" value="${data.type}" ${data.isAvailable ? "" : "disabled"}>
        <label for="swatch-${id}-${data.type}" style="border-color: red;">
          <span style="background-color: ${data.code};"></span>
          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
      </div>`;
}

function getColors(data) {
    return data.reduce(function(summary, current, i) {
        return summary + swatchColor(i, current);
    }, '');
}

function updateColorSwatch(data) {
    document.querySelector('#colorSwatch').innerHTML += getColors(data);
}

function setCheckedColorFromLocalStorage() {
    if (localStorage.color) {
        document.querySelector('#colorSwatch input[value=\'' + localStorage.color + '\']').checked = true;
    }
}

function addEventListenersColors() {
    let colorInputs = document.querySelectorAll('#colorSwatch input');

    Array.from(colorInputs).forEach(colorInput => {
        colorInput.addEventListener('change', function(event) {
        if (this.checked) {
            localStorage.color = this.value;
        }
    });
});
}

fetch('https://neto-api.herokuapp.com/cart/colors')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        updateColorSwatch(data);
        addEventListenersColors();
        setCheckedColorFromLocalStorage();
    })
    .catch(function(event) {
        console.log('colors error: ', event);
    });

function swatchSize(id, data) {
    return `<div data-value="${data.type}" class="swatch-element plain ${data.type} ${data.isAvailable ? "available" : "soldout"}">
        <input id="swatch-${id}-${data.type}" type="radio" name="size" value="${data.type}" ${data.isAvailable ? "" : "disabled"}>
        <label for="swatch-${id}-${data.type}">
          ${data.title}
          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
      </div>`;
}

function getSizes(data) {
    return data.reduce(function(summary, current, i) {
        return summary + swatchSize(i, current);
    }, '');
}

function updateSizeSwatch(data) {
    document.querySelector('#sizeSwatch').innerHTML += getSizes(data);
}

function setCheckedSizeFromLocalStorage() {
    if (localStorage.size) {
        document.querySelector('#sizeSwatch input[value=\'' + localStorage.size + '\']').checked = true;
    }
}

function addEventListenersSizes() {
    let sizeInputs = document.querySelectorAll('#sizeSwatch input');

    Array.from(sizeInputs).forEach(sizeInput => {
        sizeInput.addEventListener('change', function(event) {
        if (this.checked) {
            localStorage.size = this.value;
        }
    });
});
}


fetch('https://neto-api.herokuapp.com/cart/sizes')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        updateSizeSwatch(data);
        addEventListenersSizes();
        setCheckedSizeFromLocalStorage();
    })
    .catch(function(event) {
        console.log('sizes error: ', event);
    });

function swatchProduct(data) {
    return `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${data.id}" style="opacity: 1;">
        <div class="quick-cart-product-wrap">
          <img src="${data.pic}" title="${data.title}">
          <span class="s1" style="background-color: #000; opacity: .5">$${data.price}</span>
          <span class="s2"></span>
        </div>
        <span class="count hide fadeUp" id="quick-cart-product-count-${data.id}">${data.quantity}</span>
        <span class="quick-cart-product-remove remove" data-id="${data.id}"></span>
      </div>`;
}

function snippetCart(countProducts, totalPrice) {
    return `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${countProducts > 0 ? "open" : ""}">
        <span>
          <strong class="quick-cart-text">Оформить заказ<br></strong>
          <span id="quick-cart-price">$${totalPrice}</span>
        </span>
      </a>`;
}

function getCart(data) {
    let totalPrice = 0;
    let summaryProducts = data.reduce(function(summary, current) {
        totalPrice += current.price * current.quantity;
        return summary + swatchProduct(current);
    }, '');
    return summaryProducts + snippetCart(data.length, totalPrice);
}

function updateCart(data) {
    document.querySelector('#quick-cart').innerHTML = getCart(data);

    let deleteButtons = document.querySelectorAll('#quick-cart span.remove');

    Array.from(deleteButtons).forEach(deleteButton => {
        deleteButton.addEventListener('click', function(event) {
        console.log(JSON.stringify({ "productId" : this.dataset.id }));
        const request = fetch('https://neto-api.herokuapp.com/cart/remove', {
            body        : JSON.stringify({ "productId" : this.dataset.id }),
            credentials : 'same-origin',
            method      : 'POST',
            headers     : {
                'Content-Type': 'application/json'
            }
        });
        request.then((res) => {
            if (200 <= res.status && res.status < 300) {
            return res;
        }
        throw new Error(response.statusText);
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
            alert(data.message);
        } else {
            updateCart(data);
        }
    })
        .catch((error) => {
            console.log('delete from cart error: ', e);
    });
    });
});
}


AddToCartForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let formCart = new FormData(this);

    formCart.append('productId', this.dataset.productId);

    let toSend = {};
    for (const [k,v] of formCart) {
        toSend[k] = v;
    };

    console.log(JSON.stringify(toSend));
    const request = fetch('https://neto-api.herokuapp.com/cart', {
        body        : JSON.stringify(toSend),
        credentials : 'same-origin',
        method      : 'POST',
        headers     : {
            'Content-Type': 'application/json'
        }
    });
    request.then((res) => {
        if (200 <= res.status && res.status < 300) {
        return res;
    }
    throw new Error(response.statusText);
})
    .then((res) => res.json())
    .then((data) => {
        if (data.error) {
        alert(data.message);
    } else {
        updateCart(data);
    }
})
    .catch((error) => {
        console.log('append to cart error: ', e);
});
});


fetch('https://neto-api.herokuapp.com/cart')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        updateCart(data);
    })
    .catch(function(e) {
        console.log('cart error: ', e);
    });
