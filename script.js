let pokemons;
let currentPokemon;
let selectedPokemon;
let loadingCancel = false;
let loading = false;
let pokemonCount = 0;
let pokemonCountStep;
let pokemonLenght = 50;
let pokemonsURL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=898';

//Functions//////////////////////////////////////////////////////////////////////

function init() {
  drawHeader();
  drawMainContent();
  loadPokemons();
}

function drawHeader() {
  let content = document.getElementById('content');
  content.innerHTML = templateHeader();
}

function drawMainContent() {
  let content = document.getElementById('content');
  content.innerHTML += templateMainContent();
}

async function loadPokemons() {
  let response = await fetch(pokemonsURL);
  pokemons = await response.json();
  showPokemons();
}

async function showPokemons() {
  let content = document.getElementById('mainContent');
  let pokemonCountStep = pokemonCount + pokemonLenght;
  for (let id = pokemonCount; id < pokemonCountStep; id++) {
    if (!loadingCancel && pokemonCount <= 898) {
      let pokemonPATH = pokemons.results[id].url
      let responses = await fetch(pokemonPATH)
      currentPokemon = await responses.json();
      if (!loadingCancel) {
        content.innerHTML += templateShowPokemons(id, currentPokemon);
        pokemonCount++
      } else {
        break;
      }
    } else {
      break;
    }
  }
}

function loadBreak(id) {
  loadingCancel = true;
  loadPokemonCard(id);
}

async function loadPokemonCard(id) {
  let pokemonURL = pokemons.results[id].url;
  let response = await fetch(pokemonURL)
  selectedPokemon = await response.json();
  showPokemonCard(id);
}

function showPokemonCard(id) {
  let cardBG = drawCardBackground();
  let content = document.getElementById('mainContent');
  content.innerHTML += templatePokemonCard(id, cardBG);
}

function drawCardBackground() {
  let type = selectedPokemon.types[0].type.name;
  switch (type) {
    case 'fire':
      return 'red';
    case 'water':
      return 'blue';
    default:
      return 'white';
  }
}

function checkScrollBottom() {
  if (document.getElementById('mainContent').offsetHeight + document.getElementById('mainContent').scrollTop >= document.getElementById('mainContent').scrollHeight) {
    showPokemons();
  }
};

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

function templateMainContent() {
  return /* html */ `
        <div onscroll="checkScrollBottom()" id="mainContent">

        </div>
    `;
}

function templateShowPokemons(id, currentPokemon) {
  return /* html */ `
        <div onclick="loadBreak(${id})" class="pokemon">
            <h5>${pokemons.results[id].name}</h5>
            <img src="${currentPokemon.sprites.front_default}">
        </div>
    `;
    
}

function templatePokemonCard(id, cardBG) {
  return /* html */ `
        <div class="pokemonCard" style="background-color: ${cardBG}">
            <h2>${selectedPokemon.name}</h2>
            <img src="${selectedPokemon.sprites.front_default}">
        </div>
    `;
}