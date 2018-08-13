'use strict';

const tabs = document.querySelector('#tabs'),
    tabs_nav = tabs.querySelector('.tabs-nav'),
    tab_clone = tabs_nav.firstElementChild,
    articles = tabs.querySelector('.tabs-content').children;

console.log(tabs_nav);
console.log(tabs_nav.firstElementChild);
console.log();

Array.from(articles).forEach(function(element) {
    element.classList.add('hidden');
    const newTab = tab_clone.cloneNode(true);
    newTab.firstElementChild.innerHTML = element.dataset.tabTitle;
    newTab.firstElementChild.classList.add(element.dataset.tabIcon);
    newTab.addEventListener('click', event => clickTab(event.target));
    tabs_nav.appendChild(newTab);
});
tabs_nav.removeChild(tab_clone);

function clickTab(activatedLink) {
    const currentTab = tabs_nav.querySelector('.ui-tabs-active'),
        currentArticle = Array.from(articles).find(elem => elem.dataset.tabTitle === currentTab.firstElementChild.innerHTML),
    activatedArticle = Array.from(articles).find(elem => elem.dataset.tabTitle === activatedLink.innerHTML);

    currentArticle.classList.add('hidden');
    currentTab.classList.remove('ui-tabs-active');

    activatedLink.parentElement.classList.add('ui-tabs-active');
    activatedArticle.classList.remove('hidden');
}

tabs_nav.firstElementChild.classList.add('ui-tabs-active');
articles[0].classList.remove('hidden');