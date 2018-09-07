'use strict';

let movedPiece = null;

document.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('logo')) {
        movedPiece = event.target;
        movedPiece.classList.add('moving');
        movedPiece.style.position = 'absolute';
        document.body.appendChild(movedPiece);
    }
});

document.addEventListener('mousemove', (event) => {
    if (!movedPiece) {
        return;
    }
    event.preventDefault();

    movedPiece.style.left = event.pageX - movedPiece.offsetWidth / 2 + 'px';
    movedPiece.style.top = event.pageY - movedPiece.offsetHeight / 2 + 'px';

    movedPiece.classList.add('moving');

});

document.addEventListener('mouseup', (event) => {
    if (movedPiece) {
        movedPiece.style.visibility = 'hidden';
        const check = document
            .elementFromPoint(event.clientX, event.clientY)
            .closest('#trash_bin');
        movedPiece.style.visibility = 'visible';
        movedPiece.classList.remove('moving');
        if (check) {
            movedPiece.style.display = 'none';
        }
        movedPiece = null;
    }
});
