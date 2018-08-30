'use strict';

function createElement(node) {
    if (typeof node === "string" || typeof node === "number") {
        const text = document.createTextNode(node);
        return document.createTextNode(node);
    }

    if (Array.isArray(node)) {
        return node.reduce(function(f, item) {
            f.appendChild(createElement(item));
            return f;
        }, document.createDocumentFragment());
    }

    const element = document.createElement(node.name);

    if (node.childs) {
        element.appendChild(createElement(node.childs));
    }

    if (node.props) {
        Object.keys(node.props).forEach(function(key) {
            element.setAttribute(key, node.props[key]);
        });
    }

    return element;
}

node.props