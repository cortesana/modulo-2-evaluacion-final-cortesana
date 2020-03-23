'use strict';

const searchForm = document.querySelector('#searchForm');
const titleInputValue = document.querySelector('#titleInput.value');
const titleInput = document.querySelector('#titleInput');
const searchBtn = document.querySelector('#searchBtn');
const baseURL = 'http://api.tvmaze.com/search/shows?q=';
const ulElem = document.querySelector('#ulElem');
let contentList = [];
const contentTitle = document.querySelector('#contentTitle');

function displayInfo(contentList) {
    for (let i = 0; i < contentList.length; i++) {
        if(contentList[i].show.image !== null) {
            ulElem.innerHTML += `<li><img src='${contentList[i].show.image.medium}' alt="Content cover"><h2 id="contentTitle">${contentList[i].show.name}</h2></li>`;
        } else {
            ulElem.innerHTML += `<li><img src='https://via.placeholder.com/210x295/ffffff/666666/?text=TV' alt="Content cover"><h2 id="contentTitle">${contentList[i].show.name}</h2></li>`;
        }
    }
}

function getInfo() {
    ulElem.innerHTML = '';
    fetch(`${baseURL}${titleInputValue}`)
        .then(response => response.json())
        .then(data => {
            contentList = data;
            displayInfo(contentList);
        })
}

function searchingContentTitle() {
    let item;
    let rmCaseSensitive;
    rmCaseSensitive = titleInputValue.toUpperCase();
    for (let i = 0; i < contentTitle.lenght; i++) {
        item = contentTitle[i];
        txtValue = item.textContent || item.innerText;
        if (titleInputValue.toUpperCase().indexOf(rmCaseSensitive) > -1) {
            contentTitle[i].style.display = "inline-block";
        } else {
            contentTitle[i].style.display = "none";
        }
    }
}

getInfo();
titleInput.addEventListener('onkeyup', searchBar);
