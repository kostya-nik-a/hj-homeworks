'use strict';

let rowNum = 0;
let unicode = 65;
const totalPax = document.querySelector("#totalPax");
const totalAdult = document.querySelector("#totalAdult");
const totalHalf = document.querySelector("#totalHalf");
const btnSetFull = document.querySelector("#btnSetFull");
btnSetFull.disabled = true;
const btnSetEmpty = document.querySelector("#btnSetEmpty");
btnSetEmpty.disabled = true;

function createSeatMap(event) {
    event.preventDefault();
    fetch(`https://neto-api.herokuapp.com/plane/${document.querySelector(".form-control").value}`)
        .then(response => {
            if (200 <= response.status && response.status < 300) {
                return response;
            }
    throw new Error(response.statusText);
    })
    .then(res => res.json())
    .then(res => {
        rowNum = 0;
        totalPax.textContent = 0;
        totalHalf.textContent = 0;
        totalAdult.textContent = 0;
        document.querySelector("#seatMapTitle").textContent = `${res.title} (${res.passengers} пассажиров)`;

        const seatMap = document.querySelector("#seatMapDiv");
        while (seatMap.firstChild) {
            seatMap.removeChild(seatMap.firstChild);
        }
        let fragment = browserEngine(res.scheme.map(createRow));
        seatMap.appendChild(fragment);
    })
    .then(() => {
        btnSetFull.disabled = false;
        btnSetEmpty.disabled = false;
        Array.from(document.querySelectorAll(".seat")).forEach(a =>
            a.addEventListener("click", clickSeat)
        );
    });
}

let firstHalf = true;

function getSeat(seats) {
    const seatsArr = [];

    if (seats === 4 && firstHalf) {
        seatsArr.push({
            tag: "div",
            class: "col-xs-4 no-seat"
        });
        unicode = 66;
        firstHalf = false;
    } else if (seats === 4 && !firstHalf) {
        unicode = 68;
        firstHalf = true;
    }
    for (let i = 0; i < seats / 2; i++) {
        if (unicode > 70) unicode = 65;
        const letter = String.fromCharCode(unicode);
        unicode++;
        seatsArr.push({
            tag: "div",
            class: "col-xs-4 seat",
            content: {
                tag: "span",
                class: "seat-label",
                content: letter
            }
        });
    }
    if (seats === 4 && firstHalf) {
        unicode = 65;
    }
    return seatsArr;
}

function createRow(seats) {
    rowNum++;
    return {
        tag: "div",
        class: "row seating-row text-center",
        content: [
            {
                tag: "div",
                class: "col-xs-1 row-number",
                content: {
                    tag: "h2",
                    class: "",
                    content: rowNum
                }
            },
            {
                tag: "div",
                class: "col-xs-5",
                content: getSeat(seats)
            },
            {
                tag: "div",
                class: "col-xs-5",
                content: getSeat(seats)
            }
        ]
    };
}

function browserEngine(block) {
    if (typeof block === "string" || typeof block === "number") {
        const text = document.createTextNode(block);
        return document.createTextNode(block);
    }

    if (Array.isArray(block)) {
        return block.reduce(function(f, item) {
            f.appendChild(browserEngine(item));

            return f;
        }, document.createDocumentFragment());
    }

    const element = document.createElement(block.tag);

    element.className = block.class;

    if (block.content) {
        element.appendChild(browserEngine(block.content));
    }

    if (block.attrs) {
        Object.keys(block.attrs).forEach(function(key) {
            element.setAttribute(key, block.attrs[key]);
        });
    }

    return element;
}

function clickSeat(event) {
    const age = event.altKey ? "half" : "adult";
    if (event.currentTarget.classList.contains("adult")) {
        event.currentTarget.classList.remove("adult");
        totalAdult.textContent--;
        totalPax.textContent--;
    } else if (event.currentTarget.classList.contains("half")) {
        event.currentTarget.classList.remove("half");
        totalHalf.textContent--;
        totalPax.textContent--;
    } else {
        event.currentTarget.classList.add(age);
        if (age === "half") {
            totalHalf.textContent++;
            totalPax.textContent++;
        } else {
            totalAdult.textContent++;
            totalPax.textContent++;
        }
    }
}

function setFull() {
    let res = 0;
    event.preventDefault();
    Array.from(document.querySelectorAll(".seat")).forEach(a => {
        a.classList.add("adult");
        a.classList.remove("half");
        res = ++res;
    });
    totalPax.textContent = res;
    totalAdult.textContent = res;
}

function setEmpty() {
    event.preventDefault();
    Array.from(document.querySelectorAll(".seat")).forEach(a => {
        a.classList.remove("adult");
        a.classList.remove("half");
    });
    totalPax.textContent = 0;
    totalHalf.textContent = 0;
    totalAdult.textContent = 0;
}

document.querySelector("#btnSeatMap").addEventListener("click", createSeatMap);
btnSetFull.addEventListener("click", setFull);
btnSetEmpty.addEventListener("click", setEmpty);
