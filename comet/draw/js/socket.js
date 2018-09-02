'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

window.editor.addEventListener('update', (event) => {
    const canvas = event.canvas;

    canvas.toBlob((blob) => {
        ws.send(blob);
    })
})

