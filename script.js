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
  resetPage();
  drawHeader();
  drawMainContent();
  loadPokemons();
}

function resetPage() {
  pokemons;
  currentPokemon;
  selectedPokemon;
  loadingCancel = false;
  loading = false;
  pokemonCount = 0;
  pokemonCountStep;
  pokemonLenght = 50;
}

function drawHeader() {
  let content = document.getElementById('content');
  content.innerHTML = templateHeader();
}

function drawMainContent() {
  let content = document.getElementById('content');
  content.innerHTML += templateMainContent();
}

function search() {
  let search = document.getElementById('searchInput').value;
  search = search.toLowerCase();
  if (search == '') {
     //function 
  } else {
      filterSearch(search);
  }
}

function filterSearch(search) {
  let searchcontent = document.getElementById('mainContent');
  searchcontent.innerHTML = ``;
  for (let i = 0; i <= pokemons.length - 1; i++) {
      if (pokemons.results[i].name.toLowerCase().includes(search)) {
          searchcontent.innerHTML += showFilter(i);
      }
  }
}

async function loadPokemons() {
  let response = await fetch(pokemonsURL);
  pokemons = await response.json();
  showPokemons();
}

async function showPokemons() {
  let content = document.getElementById('mainContent');
  let pokemonCountStep = pokemonCount + pokemonLenght;
  loading = true;
  for (let id = pokemonCount; id < pokemonCountStep; id++) {
    if (!loadingCancel && pokemonCount <= 898) {
      let pokemonPATH = pokemons.results[id].url;
      let responses = await fetch(pokemonPATH);
      currentPokemon = await responses.json();
      let cardBG = drawCardBackground(currentPokemon.types[0].type.name);
      if (!loadingCancel) {
        content.innerHTML += templateShowPokemons(id, currentPokemon, cardBG);
        pokemonCount++
      } else {
        break;
      }
    } else {
      break;
    }
  }
  loading = false;
}

function loadBreak(id) {
  loadingCancel = true;
  loadPokemonCard(id);
}

async function loadPokemonCard(id) {
  let pokemonURL = pokemons.results[id].url;
  let response = await fetch(pokemonURL);
  selectedPokemon = await response.json();
  showPokemonCard(id);
}

function showPokemonCard(id) {
  let cardBG = drawCardBackground(selectedPokemon.types[0].type.name);
  let content = document.getElementById('mainContent');
  content.innerHTML += templatePokemonCard(id, cardBG);
}

function drawCardBackground(type) {/* 
  let type = selectedPokemon.types[0].type.name; */
  switch (type) {
    case 'fire':
      return '#fa6555';
    case 'water':
      return '#58abf6';
    case 'grass':
      return '#47c5aa';
    case 'bug':
      return '#96a518';
    case 'electric':
      return '#ecc44e';
    case 'poison':
      return '#9f5bba';
    case 'normal':
      return '#edafa7';
    case 'ground':
      return '#b2746c';
    case 'fairy':
      return '#ffe5e1';
    case 'fighting':
      return '#587ee7';
    case 'psychic':
      return '#cd7eeb';
    case 'rock':
      return '#b3b3b3';
    case 'ghost':
      return 'white';
    case 'dragon':
      return 'white';
    case 'dark':
      return 'white';
    case 'ice':
      return 'white';
    case 'steel':
      return 'white';
    default:
      return 'white';
  }
}

function checkScrollBottom() {
  if (!loading) {
    if (document.getElementById('mainContent').offsetHeight + document.getElementById('mainContent').scrollTop >= document.getElementById('mainContent').scrollHeight) {
      showPokemons();
    }
  }
};

function checkType(check) {
  if (!check) {
    return '';
  } else {
    return check.type.name;
  }
}

function checkAbility(check) {
  if (!check) {
    return '';
  } else {
    return check.ability.name.charAt(0).toUpperCase() + check.ability.name.slice(1);
  }
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
                        <a onclick="init()" class="nav-link active" aria-current="page" href="#">Home</a>
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
                      <input class="form-control me-2" onkeyup="search()" id="searchInput" type="search" placeholder="Search" aria-label="Search">
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

function templateShowPokemons(id, currentPokemon, cardBG) {
  return /* html */ `
        <div onclick="loadBreak(${id})" class="pokemon" style="background-color: ${cardBG}">
            <h4>${pokemons.results[id].name.charAt(0).toUpperCase() + pokemons.results[id].name.slice(1)}</h4>
            <p>${currentPokemon.types[0].type.name}</p>
            <p>${checkType(currentPokemon.types[1])}</p>
            <img src="${currentPokemon.sprites.front_default}">
            <p class="pokeID">#${currentPokemon.id}</p>
        </div>
    `;

}

function templatePokemonCard(id, cardBG) {
  return /* html */ `
      <div class="pokemonCardBG">
        <div class="pokemonCard" style="background-color: ${cardBG}">
            <h2>${selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</h2>
            <p>${selectedPokemon.types[0].type.name}</p>
            <p>${checkType(selectedPokemon.types[1])}</p>
            <img src="${selectedPokemon.sprites.front_default}">
            <div class="tabs">
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#pills-about" type="button" role="tab" aria-controls="pills-about" aria-selected="true">About</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-basestats-tab" data-bs-toggle="pill" data-bs-target="#pills-basestats" type="button" role="tab" aria-controls="pills-basestats" aria-selected="false">Base Stats</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-evolution-tab" data-bs-toggle="pill" data-bs-target="#pills-evolution" type="button" role="tab" aria-controls="pills-evolution" aria-selected="false">Evolution</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-moves-tab" data-bs-toggle="pill" data-bs-target="#pills-moves" type="button" role="tab" aria-controls="pills-moves" aria-selected="false">Moves</button>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-about" role="tabpanel" aria-labelledby="pills-about-tab" tabindex="0">
                  <div class="disflex">
                  <div class="category">
                    <span>Species</span>
                    <span>Height</span>
                    <span>Weight</span>
                    <span>Abilities</span>
                  </div>
                  <div class="values">
                    <span>${selectedPokemon.types[0].type.name.charAt(0).toUpperCase() + selectedPokemon.types[0].type.name.slice(1)}</span>
                    <span>${selectedPokemon.height}0 cm</span>
                    <span>${selectedPokemon.weight / 10} Kg</span>
                    <span>${selectedPokemon.abilities[0].ability.name.charAt(0).toUpperCase() + selectedPokemon.abilities[0].ability.name.slice(1)}, ${checkAbility(selectedPokemon.abilities[1])}</span>
                  </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="pills-basestats" role="tabpanel" aria-labelledby="pills-basestats-tab" tabindex="0">
                <div class="disflex">
                  <div class="category">
                    <span>HP</span>
                    <span>Attack</span>
                    <span>Defense</span>
                    <span>Specialattack</span>
                    <span>Specialdefense</span>
                    <span>Speed</span>
                  </div>
                  <div class="values">
                    <span><b>${selectedPokemon.stats[0].base_stat}</b></span>
                    <span><b>${selectedPokemon.stats[1].base_stat}</b></span>
                    <span><b>${selectedPokemon.stats[2].base_stat}</b></span>
                    <span><b>${selectedPokemon.stats[3].base_stat}</b></span>
                    <span><b>${selectedPokemon.stats[4].base_stat}</b></span>
                    <span><b>${selectedPokemon.stats[5].base_stat}</b></span>
                  </div>
                  <div class="visual">
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style="background-color: ${cardBG}; width: ${selectedPokemon.stats[0].base_stat}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style="background-color: ${cardBG}; width: ${selectedPokemon.stats[1].base_stat}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style="background-color: ${cardBG}; width: ${selectedPokemon.stats[2].base_stat}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style="background-color: ${cardBG}; width: ${selectedPokemon.stats[3].base_stat}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style="background-color: ${cardBG}; width: ${selectedPokemon.stats[4].base_stat}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" style="background-color: ${cardBG}; width: ${selectedPokemon.stats[5].base_stat}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    
                  </div>
                  </div>
                </div>
                <div class="tab-pane fade" id="pills-evolution" role="tabpanel" aria-labelledby="pills-evolution-tab" tabindex="0">Avalable on future update.</div>
                <div class="tab-pane fade" id="pills-moves" role="tabpanel" aria-labelledby="pills-moves-tab" tabindex="0">Avalable on future update.</div>
              </div>
            </div>
        </div>
      </div>
    `;
}