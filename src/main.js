const pokemonListURL = `https://pokeapi.co/api/v2/pokemon/`;
let urlPagina = ``;
const $listadoPokemones = document.querySelector("#listado-pokemones");
const $paginacion = document.querySelector("#paginacion");
const $pokemonImg = document.querySelector('#pokemon-img')
let nextPage = ``;
let previousPage = null;
let thisPage = 1;

$paginacion.onclick = function (e) {

  if (e.target.id === "next-page") {
    if (nextPage) {
      thisPage++;
      urlPagina = nextPage;
    } else if (nextPage === null) {
        previousPage = 'https://pokeapi.co/api/v2/pokemon/?offset=1259&limit=20'
        urlPagina = previousPage
    } else {
        return;
    }
  } else if (e.target.id === "previous-page") {
    if (previousPage) {
      thisPage--;
      urlPagina = previousPage;
    } else {
      return;
    }
  }
  else {
    return;
  }
  $listadoPokemones.innerHTML = ""
  fetch(urlPagina)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      
      previousPage = data.previous;
      nextPage = data.next;
      document.querySelector('#this-page').textContent = `${thisPage}`
      data.results.forEach((pokemon) => {
        ;
        $listadoPokemones.innerHTML += `
            <li id='${pokemon.name}'>
                ${pokemon.name}
            </li>
            `;
      });
    });

  e.preventDefault();
};

fetch(pokemonListURL)
  .then((res) => res.json())
  .then((data) => {
    previousPage = data.previous;
    nextPage = data.next;
    document.querySelector('#this-page').textContent = `${thisPage}`
    data.results.forEach((pokemon) => {
      $listadoPokemones.innerHTML += `
            <li id='${pokemon.name.toLowerCase()}'>
                ${pokemon.name}
            </li>
            `;
    });
  });

$listadoPokemones.onclick = function(e) {
    const fetchPokemon = `https://pokeapi.co/api/v2/pokemon/${e.target.id}`
    fetch(fetchPokemon)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            $pokemonImg.innerHTML = `
            <figure>
                <img src='${(data.sprites.other['official-artwork'].front_default) || ('../src/img/pokeapi_logo.png')}'>
                <figcaption>${e.target.id}</figcaption>
            </figure>
            `
        })

    //e.preventDefault()
}