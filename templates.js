function templateHeader() {
    return /* html */ `
          <div class="headerContainer">
              <nav class="navbar navbar-light bg-info fixed-top">
                <div class="container-fluid">
                  <!-- <a class="navbar-brand" href="#"><h1>Pokedex</h1></a> -->
                  <img class="headerBG" src="img/banner.png" alt="">
                  <div class="d-flex">
                        <input id="searchInput" class="me-2 searchHeadlineHide" placeholder="Search" aria-label="Search">
                        <button onclick="search()" class="btn btn-outline-success searchHeadlineHide">Search</button>
                      </div>
                  <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="offcanvas offcanvas-end canvasBG" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                      <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Pokedex</h5>
                      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                      <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                          <a onclick="init()" class="nav-link" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="https://pokeapi.co">used API</a>
                        </li>
                        <li class="nav-item">
                          <a onclick="alert('avalable on future update!')" class="nav-link" href="#">Impressum</a>
                        </li>
                      </ul>
                      <div class="d-flex">
                        <input id="searchInput2" class="me-2" placeholder="Search" aria-label="Search">
                        <button onclick="search2()" class="btn btn-outline-success" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">Search</button>
                      </div>
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
  
  function templateShowPokemons(id, currentPokemon, cardBG, hide) {
    return /* html */ `
          <div id="cardContent"></div>
          <div onclick="loadPokemonCard(${id})" class="pokemon" style="background-color: ${cardBG}">
              <h4>${pokemons.results[id].name.charAt(0).toUpperCase() + pokemons.results[id].name.slice(1)}</h4>
              <p class="pokemonType">${currentPokemon.types[0].type.name}</p>
              <p class="pokemonType ${hide}">${checkType(currentPokemon.types[1])}</p>
              <img src="${currentPokemon.sprites.front_default}">
              <p class="pokeID">#${currentPokemon.id}</p>
          </div>
      `;
  
  }
  
  function templatePokemonCard(id, cardBG, hide) {
    return /* html */ `
        <div id="pokemonCardBG" class="pokemonCardBG">
          <div class="pokemonCard" style="background-color: ${cardBG}">
          <button onclick="closePokemoncard()" id="xBtn" class="btn-close"></button>
              <h2>${selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</h2>
              <p class="pokemonType">${selectedPokemon.types[0].type.name}</p>
              <p class="pokemonType ${hide}">${checkType(selectedPokemon.types[1])}</p>
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