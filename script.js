let pokemons;
let currentPokemon;
let selectedPokemon;
let pokemonLenght = 898;
let pokemonsURL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=898';

//Funktionen//////////////////////////////////////////////////////////////////////

function init() {
    drawHeader();
    drawMainContent();
    loadPokemons();
}

function drawHeader() {
    let content = document.getElementById('content');
    content.innerHTML = templateHeader();
}

function drawMainContent(){
    let content = document.getElementById('content');
    content.innerHTML += templateMainContent();
}

async function loadPokemons(){
    let response = await fetch(pokemonsURL);
    pokemons = await response.json();
    showPokemons();
}

async function showPokemons(){
    let content = document.getElementById('mainContent');
    for (let id = 0; id < pokemonLenght; id++) {
        if(selectedPokemon == undefined){
            let pokemonPATH = pokemons.results[id].url
            let responses = await fetch(pokemonPATH)
            currentPokemon = await responses.json();
            content.innerHTML += templateShowPokemons(id, currentPokemon);
        }else{
            break;
        }
    }
}

async function loadPokemonCard(id){
    selectedPokemon = id;
    let pokemonURL = pokemons.results[id].url;
    let response = await fetch(pokemonURL)
    selectedPokemon = await response.json();
    showPokemonCard(id);
}

function showPokemonCard(id){
    let content = document.getElementById('mainContent');
    content.innerHTML = templatePokemonCard(id);
}

//Templates////////////////////////////////////////////////////////////////////////

function templateHeader() {
    return /* html */ `
        <div class='headerContainer'>
            <nav class="navbar navbar-light bg-light fixed-top">
              <div class="container-fluid">
                <a class="navbar-brand" href="#"><h1>Pokedex</h1></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                  <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Pokedex</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                      </li>
                      <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Dropdown
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                          <li><a class="dropdown-item" href="#">Action</a></li>
                          <li><a class="dropdown-item" href="#">Another action</a></li>
                          <li>
                            <hr class="dropdown-divider">
                          </li>
                          <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                      </li>
                    </ul>
                    <form class="d-flex">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                      <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                  </div>
                </div>
              </div>
            </nav>
        </div>
    `;
}

function templateMainContent(){
    return /* html */ `
        <div id="mainContent">

        </div>
    `;
}

function templateShowPokemons(id, currentPokemon){
    return /* html */ `
        <div onclick="loadPokemonCard(${id})" class="pokemon">
            <h5>${pokemons.results[id].name}</h5>
            <img src="${currentPokemon.sprites.front_default}">
        </div>
    `;
}

function templatePokemonCard(){
    return /* html */ `
        <div class="pokemonCard">
            <h2>${selectedPokemon.name}</h2>
            <img src="${selectedPokemon.sprites.front_default}">
        </div>
    `;
}