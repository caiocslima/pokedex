const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemonData = async (pokemon) => {

    pokemonName.innerHTML = 'Searching...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = ''; 
    searchPokemon = data.id;
   }
   else {
    pokemonName.innerHTML = 'Not found';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
    input.value = ''; 
   }
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemonData(input.value);
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemonData(searchPokemon.toString());
    }
    else {
        searchPokemon = 1;
        //renderPokemonData(searchPokemon.toString());
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemonData(searchPokemon.toString());
})

renderPokemonData(searchPokemon.toString());