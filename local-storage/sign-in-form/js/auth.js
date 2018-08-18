'use strict';

'use strict';
let signIn = document.querySelector('.sign-in-htm'),
    signUp = document.querySelector('.sign-up-htm'),
    signInError = signIn.querySelector('.error-message'),
    signUpError = signUp.querySelector('.error-message');

    signUp.addEventListener('submit', function(event) {
        event.preventDefault();
        let formDataSignUp = new FormData(signUp);
        let object = {};

        formDataSignUp.forEach(function(value, key) {
            object[key] = value;
        });

        fetch('https://neto-api.herokuapp.com/signup', {
            body: JSON.stringify(object),
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
        })
        .then((res) => {
            if (200 <= res.status && res.status < 300) {
                return res;
            }
            throw new Error(response.statusText);
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
            signUpError.textContent = data.message;
        } else {
            signUpError.textContent = `Пользователь ${data.name} успешно зарегистрирован`;
        }
        })
        .catch((error) => {
            this.querySelector('.error-message').innerHTML = error;
        });
    });

    signIn.addEventListener('submit', function(event) {
        event.preventDefault();
        let formDataSignIn = new FormData(signIn);
        let object = {};

        formDataSignIn.forEach(function(value, key) {
            object[key] = value;
        });

        fetch('https://neto-api.herokuapp.com/signin', {
            body: JSON.stringify(object),
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
        })
        .then((res) => {
            if (200 <= res.status && res.status < 300) {
                return res;
            }
            throw new Error(response.statusText);
            })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                signInError.textContent = data.message;
            } else {
                signInError.textContent = `Пользователь ${data.name} успешно авторизован`;
            }
        })
    });