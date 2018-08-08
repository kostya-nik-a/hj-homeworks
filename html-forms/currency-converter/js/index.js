'use strict';

let xhr = new XMLHttpRequest(),
    fromCurrency = document.getElementById('from'),
    toCurrency = document.getElementById('to'),
    resultConverter = document.getElementById('result'),
    sourceCurrency = document.getElementById('source'),
    content = document.getElementById('content'),
    preLoader = document.getElementById('loader');

function startLoad() {
    preLoader.classList.remove('hidden')
}

function endLoad() {
    preLoader.classList.add('hidden');
    content.classList.remove('hidden');
}

function converterCurrency() {
    resultConverter.value = ((sourceCurrency.value * fromCurrency.value)/toCurrency.value).toFixed(2);
}

function onLoad() {
    const dataCurrency = JSON.parse(xhr.responseText);

    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';

    fromCurrency.innerHTML = dataCurrency.reduce((memo, item) => {
        return memo + `<option value="${item.value}" label="${item.title}">${item.code}</option>`
        }, '');

    toCurrency.innerHTML = fromCurrency.innerHTML;

    converterCurrency();
}

xhr.open('GET', 'https://neto-api.herokuapp.com/currency');
xhr.send();

xhr.addEventListener('loadstart', startLoad);
xhr.addEventListener('loadend', endLoad);
xhr.addEventListener('load', onLoad);

fromCurrency.addEventListener('change', converterCurrency);
toCurrency.addEventListener('change', converterCurrency);
sourceCurrency.addEventListener('input', converterCurrency);