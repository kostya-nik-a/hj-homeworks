'use strict';

function handleTableClick(event) {
    if (event.target.tagName == 'TH') {
        if (event.target.dataset.dir) {
            event.target.dataset.dir = '1';
        } else {
            event.target.dataset.dir = '-1';
        }


        const prop = event.target.dataset.propName;
        document.querySelector('table').dataset.sortBy = prop;
        sortTable(prop, event.target.dataset.dir);
    }
}
