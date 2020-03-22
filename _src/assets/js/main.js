'use strict';

const searchForm = document.querySelector('#searchForm');
const titleInput = document.querySelector('#titleInput.value');
const searchBtn = document.querySelector('#searchBtn');
const baseURL = 'http://api.tvmaze.com/search/shows?q=';
const ulElem = document.querySelector('#ulElem');
let contentList = [];

function displayInfo(contentList) {
    for (let i = 0; i < contentList.length; i++) {
        if(contentList[i].show.image !== null) {
            ulElem.innerHTML += `<li><img src='${contentList[i].show.image.medium}' alt="Content cover"><h2>${contentList[i].show.name}</h2></li>`;
        } else {
            ulElem.innerHTML += `<li><img src='https://via.placeholder.com/210x295/ffffff/666666/?text=TV' alt="Content cover"><h2>${contentList[i].show.name}</h2></li>`;
        }
    }
}

function getInfo() {
    ulElem.innerHTML = '';
    fetch(`${baseURL}${titleInput}`)
        .then(response => response.json())
        .then(data => {
            contentList = data;
            displayInfo(contentList);
        })
}
/* searchBtn.addEventListener('click', getInfo); */

getInfo();