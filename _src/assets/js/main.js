'use strict';

const inputSearchBar = document.querySelector('#titleInput');
const searchBtn = document.querySelector('#searchBtn');
const ulElem = document.querySelector('#ulElem');
const favouritesList = document.querySelector('.favouritesList');
const baseURL = 'http://api.tvmaze.com/search/shows?q=';
let contentList = [];
let selectedFavourites = readLocalStorage();

function getInfo() {
    fetch(baseURL+inputSearchBar.value)
        .then(response => response.json())
        .then(data => {
            contentList = data;
            displayInfo(contentList);
        })
}

function displayInfo(array) {
    ulElem.innerHTML = '';
    for(let item of array){
        if(item.show.image !== null) {
            ulElem.innerHTML += `<li class="tvShowsList defaultColor" id=${item.show.id}><img src=${item.show.image.medium}><h2 id="tvShowTitle">${item.show.name}</h2></li>`
        } else {
            ulElem.innerHTML += `<li class="tvShowsList defaultColor" id=${item.show.id}><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"><h2 id="tvShowTitle">${item.show.name}</h2></li>`
        }
    } 
        addListenersToTVShows();
}

searchBtn.addEventListener('click', getInfo);