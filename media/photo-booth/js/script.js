'use strict';

const app = document.querySelector('.app'),
    appControls = app.querySelector('.controls'),
    errorMessage = app.querySelector('#error-message'),
    takePhoto = appControls.querySelector('#take-photo'),
    snapList = document.querySelector('.list');

const show = (elem) => {
    if (elem) {
        elem.style.display = 'block';
    }
    },
hide = (elem) => {
    if (elem) {
        elem.style.display = 'none';
    }
};

let video;

const canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    audio = new Audio('https://raw.githubusercontent.com/netology-code/hj-homeworks/master/media/photo-booth/audio/click.mp3');

navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(agree)
    .catch(somethingWrong);

function agree(stream) {
    console.log('yay!', stream);
    video = document.createElement('video');
    app.appendChild(video);
    video.srcObject = stream;
    video.play();
    show(appControls);
}

function somethingWrong(error) {
    hide(appControls);
    hide(video);
    show(errorMessage);
    let mess;
    switch (error.name) {
        case 'PermissionDeniedError':
            mess = 'Доступ к устройству не предоставлен';
            break;
        case 'DevicesNotFoundError':
            mess = 'Видео устройств не обнаружено';
            break;
        default:
            mess = error.name;
    }
    errorMessage.innerHTML = mess;
    console.log(error);
}

const e = (name, props, ...childs) => ({name, props, childs});

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const element = document.createElement(node.name);
    if ((node.props !== null) && (typeof node.props === 'object')) {
        Object.keys(node.props).forEach(i => element.setAttribute(i, node.props[i]));
    }
    if (node.childs instanceof Array) {
        node.childs.forEach(child => element.appendChild(createElement(child)));
    }
    return element;
}

function createSnapshot(newImg, snapshot) {
    const snapshotStruct =
            e(
                'figure',
                {},
                e('img', { 'src': newImg }),
                e('figcaption', {},
                    e('a', {'href': newImg, 'download' : snapshot},
                        e('i', {'class' : 'material-icons'}, 'file_download')
                    ),
                    e('a', {},
                        e('i', {'class' : 'material-icons', 'onclick': 'uploadPhoto(this)'}, 'file_upload')
                    ),
                    e('a', {},
                        e('i', {'class' : 'material-icons', 'onclick': 'deletePhoto(this)'}, 'delete')
                    )
                )
            ),
        newSnapshot = createElement(snapshotStruct);
    snapList.insertBefore(newSnapshot, snapList.firstChild);
    audio.play();
}

function closest(target, selector) {
    while (target) {
        if (target.matches && target.matches(selector)) {
            return target;
        }
        target = target.parentNode;
    }
    return null;
}

function deletePhoto(elem) {
    const figu = closest(elem, 'figure');
    if (figu) {
        figu.parentNode.removeChild(figu);
    }
}

function uploadPhoto(elem) {
    const figu = closest(elem, 'figure');
    if (figu) {
        const img = figu.querySelector('img');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(function(blob) {
            const formData = new FormData();
            formData.append("image", blob);
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                console.log(xhr.response);
            }
            xhr.open("POST", "https://neto-api.herokuapp.com/photo-booth");
            xhr.send(formData);
        });
    }
}

takePhoto.addEventListener('click', function(e) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    createSnapshot(canvas.toDataURL(), 'snapshot.png');
});
