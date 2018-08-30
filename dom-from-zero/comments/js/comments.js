'use strict';

function browserEngine(block) {
    if ((typeof block === 'string') || (typeof block === 'number')) {
        const fragment = document.createDocumentFragment();
        const arr = block.split('\n');
        for(let i = 0; i < arr.length; i++) {
            const text = document.createTextNode(arr[i]);
            fragment.appendChild(text);
            if (i < arr.length-1) {
                fragment.appendChild(document.createElement('br'));
            }
        }

        return fragment
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

function createComment(comment) {
    return {
        tag: "div",
        class: "comment-wrap",
        content: [
            {
                tag: "div",
                class: "photo",
                attrs: { title: `${comment.author.name}` },
                content: {
                    tag: "div",
                    class: "avatar",
                    attrs: { style: `background-image: url('${comment.author.pic}')` }
                }
            },
            {
                tag: "div",
                class: "comment-block",
                content: [
                    {
                        tag: "p",
                        class: "comment-text",
                        content: `${comment.text}`
                    },
                    {
                        tag: "div",
                        class: "bottom-comment",
                        content: [
                            {
                                tag: "div",
                                class: "comment-date",
                                content: `${new Date(comment.date).toLocaleString("ru-Ru")}`
                            },
                            {
                                tag: "ul",
                                class: "comment-actions",
                                content: [
                                    {
                                        tag: "li",
                                        class: "complain",
                                        content: "Пожаловаться"
                                    },
                                    {
                                        tag: "li",
                                        class: "reply",
                                        content: "Ответить"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
}

function showComments(list) {
    const commentsContainer = document.querySelector('.comments');

    list.forEach(element => {
        const blockElement =  createComment(element);
        commentsContainer.appendChild(browserEngine(blockElement));
    });
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
