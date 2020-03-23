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

function addListenersToTVShows() {
    const tvShowsList = document.querySelectorAll('.tvShowsList');
    for(let liItem of tvShowsList) {
        liItem.addEventListener('click', addToFavourites);
    }
}

function addToFavourites(event) {
    event.currentTarget.classList.remove('defaultColor');
    event.currentTarget.classList.add('colorFavourites');
    const currentItem = event.currentTarget.id;
    const currentItemIndex = selectedFavourites.indexOf(currentItem);
    console.log(currentItemIndex);
    console.log(selectedFavourites);
    const favouriteObj = getFavouriteObj(currentItem);
    if(selectedFavourites.indexOf(currentItem) === -1){
        selectedFavourites.push(favouriteObj.show);
        setLocalStorage();
        printFavourites(selectedFavourites);
    } else {
        alert('This film is alredy your favourite');
    }
}

function setLocalStorage() {
    localStorage.setItem('myFavourites', JSON.stringify(selectedFavourites));
}

function readLocalStorage(){
    let localFavourites = JSON.parse(localStorage.getItem('myFavourites'));
    if(localFavourites !== null){
        return localFavourites;
    }else{
    return localFavourites = [];
    }
}

function getFavouriteObj(id){
    return contentList.find(item => item.show.id === parseInt(id));
}


function printFavourites(arrayFav){
    favouritesList.innerHTML = '';
    for(let favouriteItem of arrayFav){
        favouritesList.innerHTML+= `<li class ="FavouriteListItem" id=${favouriteItem.id}><img src=${favouriteItem.image.medium}><button type="button" class="rmBtn">Delete</button><h3 class="titleFavourite">${favouriteItem.name}</h3></li>`
        addRemoveListeners();
    }
    
}
searchBtn.addEventListener('click', getInfo);

function addRemoveListeners(){
    const rmFavouritesButton = document.querySelectorAll('.rmBtn')
    for(let btnItem of rmFavouritesButton){
        btnItem.addEventListener('click', removeFavourite);
    }
}

function removeFavourite(){
    const fullElementId = event.currentTarget.parentElement.id;
    const elemIndex = selectedMovies.indexOf(fullElementId);
    selectedFavourites.splice(elemIndex,1);
    setLocalStorage();
    printFavourites(selectedFavourites);
}
