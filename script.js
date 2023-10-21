let pokemons;
let currentPokemon;
let selectedPokemon;
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
  let search = document.getElementById('searchInput');
  search = search.value.toLowerCase();
  if (search == '') {
    init();
  } else {
    filterSearch(search);
  }
}

function search2() {
  let search = document.getElementById('searchInput2');
  search = search.value.toLowerCase();
  if (search == '') {
    init();
  } else {
    filterSearch(search);
  }
}

async function filterSearch(search) {
  let searchcontent = document.getElementById('mainContent');
  searchcontent.innerHTML = ``;
  for (let i = 0; i <= pokemons.results.length - 1; i++) {
    if (pokemons.results[i].name.includes(search)) {
      let pokemonPATH = pokemons.results[i].url;
      let responses = await fetch(pokemonPATH);
      currentPokemon = await responses.json();
      let cardBG = drawCardBackground(currentPokemon.types[0].type.name);
      let hide = hideType(currentPokemon.types[1]);
      searchcontent.innerHTML += templateShowPokemons(i, currentPokemon, cardBG, hide);
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
    if (pokemonCount <= 898) {
      let pokemonPATH = pokemons.results[id].url;
      let responses = await fetch(pokemonPATH);
      currentPokemon = await responses.json();
      let cardBG = drawCardBackground(currentPokemon.types[0].type.name);
      let hide = hideType(currentPokemon.types[1]);
      content.innerHTML += templateShowPokemons(id, currentPokemon, cardBG, hide);
      pokemonCount++
    } else {
      break;
    }
  }
  loading = false;
}

async function loadPokemonCard(id) {
  let pokemonURL = pokemons.results[id].url;
  let response = await fetch(pokemonURL);
  selectedPokemon = await response.json();
  showPokemonCard(id);

  document.getElementById("cardContent").classList.remove("hide");
  document.getElementById("xBtn").classList.remove("hide");
}

function showPokemonCard(id) {
  let cardBG = drawCardBackground(selectedPokemon.types[0].type.name);
  let content = document.getElementById('cardContent');
  let hide = hideType(selectedPokemon.types[1]);
  content.innerHTML = templatePokemonCard(id, cardBG, hide);
}

function showMoves(pokemon){
  let content = document.getElementById('moveContent');
  content.innerHTML = ``;
  for (let i = 0; i < pokemon.moves.length; i++) {
    const move = pokemon.moves[i].move.name;
    content.innerHTML += templateShowMove(move);
  };
}

function drawCardBackground(type) {
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
      return '#c2a4c9';
    case 'dragon':
      return '#58cf59';
    case 'dark':
      return ' #8d6f6f';
    case 'ice':
      return '#bbc8fd';
    case 'steel':
      return '#cdcdcd';
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

function hideType(check) {
  if (!check) {
    return 'hide';
  } else {
    return '';
  }
}

function checkType(check, id) {
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

function closePokemoncard() {
  document.getElementById("cardContent").classList.add("hide");
  document.getElementById("xBtn").classList.add("hide");
}