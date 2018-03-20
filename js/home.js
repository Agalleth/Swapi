// Función para el modal de JQuery
$(document).ready(function(){
   $('.modal').modal();
 });
// Petición de API
const apiUse = () => {
    fetch(`https://swapi.co/api/films/`, {method: 'GET'})
        .then(function(response) {
            response.json().then(function(result) {
                paintMovies(result.results);
        });
    })
        .catch(function(err) {
            console.log(err);
        });
};
// Pintar templates
const paintMovies = (detailsMovies) => {
    let containerMovies = document.getElementById('container-movies');
    let templateMovies = ``;
    let templateCharacters = ``;
     detailsMovies.forEach((item) => {
        item.characters.forEach((character) => {
             templateCharacters +=
             `<a href="#modal1">
                <li class="character-list" data-url="${character}"><a class="modal-trigger"  href="#modal1">${character}</a></li>
            </a>`;
        });
        templateMovies +=
        `<div class="movies transparent">
          <div class="card col m3 cont-movies transparent">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator img-card" src="../assets/images/peto.jpg">
            </div>
            <div class="card-content">
              <h6 class="activator card-title align-center white-text black">Episode ${item.episode_id}:<span class="yellow-text"> ${item.title} </span></h6>
              <h4 class="card-title activator yellow-text stroke2">Description<i class="material-icons right">more_vert</i></h4>
            </div>
            <div class="card-reveal">
              <span class="card-title white-text text-darken-4"><h5 class="activator card-title align-center black">Episode ${item.episode_id}:<span class="yellow-text"> ${item.title} </span></h5><i class="material-icons right">close</i></span>
              <p class="activator">${item.opening_crawl}</p>
              <ul>${templateCharacters}</ul>
            </div>
          </div>
        </div>`;
    });

    containerMovies.innerHTML = templateMovies;
    let coleccionHTML = document.getElementsByClassName('character-list');
    giveEventLis(coleccionHTML);
};
const giveEventLis = (coleccionHTML) => {
    let listCharacters = Array.from(coleccionHTML);
    listCharacters.forEach(li => {
        li.addEventListener('click', detailsCharacter);
    });
};
const detailsCharacter = (e) => {
    e.preventDefault;
    let url = e.target.innerText;
    fetch(url, {method: 'GET'})
        .then(response => {
            response.json().then(result => {
                drawModal(result);
            });
        });
};
//pintando Modal de personajes
const drawModal = (detailCharacter) => {
    console.log(detailCharacter);
    $('#character-name').html(detailCharacter.name);
    $('#birth-year').html(detailCharacter.birth_year);
    $('#hair-color').html(detailCharacter.hair_color);
    $('#mass').html(detailCharacter.mass);
    $('#height').html(detailCharacter.height);
    $('#skin-color').html(detailCharacter.skin_color);
    $('#eye-color').html(detailCharacter.eye_color);
};
apiUse();
