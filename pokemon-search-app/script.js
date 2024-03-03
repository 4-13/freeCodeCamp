const API_ENDPOINT = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon';

const $searchForm = document.getElementById('search-form');
const $searchInput = document.getElementById('search-input');

const $pokemonName = document.getElementById("pokemon-name");
const $pokemonId = document.getElementById("pokemon-id");
const $sprite = document.getElementById("sprite");
const $weight = document.getElementById("weight");
const $height = document.getElementById("height");
const $types = document.getElementById("types");
const $hp = document.getElementById("hp");
const $attack = document.getElementById("attack");
const $defense = document.getElementById("defense");
const $specialAttack = document.getElementById("special-attack");
const $specialDefense = document.getElementById("special-defense");
const $speed = document.getElementById("speed");

const data = {
  "base_experience": 64,
  "height": 7,
  "id": 1,
  "name": "bulbasaur",
  "order": 1,
  "sprites": {
    "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
    "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"
  },
  "stats": [
    {
      "base_stat": 45,
      "effort": 0,
      "stat": {
        "name": "hp",
        "url": "https://pokeapi.co/api/v2/stat/1/"
      }
    },
    {
      "base_stat": 49,
      "effort": 0,
      "stat": {
        "name": "attack",
        "url": "https://pokeapi.co/api/v2/stat/2/"
      }
    },
    {
      "base_stat": 49,
      "effort": 0,
      "stat": {
        "name": "defense",
        "url": "https://pokeapi.co/api/v2/stat/3/"
      }
    },
    {
      "base_stat": 65,
      "effort": 1,
      "stat": {
        "name": "special-attack",
        "url": "https://pokeapi.co/api/v2/stat/4/"
      }
    },
    {
      "base_stat": 65,
      "effort": 0,
      "stat": {
        "name": "special-defense",
        "url": "https://pokeapi.co/api/v2/stat/5/"
      }
    },
    {
      "base_stat": 45,
      "effort": 0,
      "stat": {
        "name": "speed",
        "url": "https://pokeapi.co/api/v2/stat/6/"
      }
    }
  ],
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "grass",
        "url": "https://pokeapi.co/api/v2/type/12/"
      }
    },
    {
      "slot": 2,
      "type": {
        "name": "poison",
        "url": "https://pokeapi.co/api/v2/type/4/"
      }
    }
  ],
  "weight": 69
}

const DEFAULT_POKEMON_DATA = {
  "id": null,
  "name": null,
  "height": null,
  "weight": null,
  "hp": null,
  "attack": null,
  "defense": null,
  "special-attack": null,
  "special-defense": null,
  "speed": null,
  "types": null,
  "sprite": null,
}

const transformPokemonData = (data) => {
  try {
    const types = { 'types': data.types.map(item => item.type.name) }
    const stats = Object.fromEntries(data.stats.map(item => {
      return [
        item.stat.name,
        item.base_stat
      ];
    }))

    const sprite = {
      'sprite': data.sprites.front_default
    }

    const restInfo = {
      "id": data.id,
      "name": data.name,
      "height": data.height,
      "weight": data.weight,
    }

    return Object.assign(restInfo, sprite, stats, types)
  } catch (err) {
    return DEFAULT_POKEMON_DATA;
  }
}

const createList = (arr) => {
  return `
      ${arr.map((item) => `<p>${item}</p>`).join(' ')}
  
  `;
}

const updatePokemonCard = (data) => {
  const $fields = {
    "id": $pokemonId,
    "name": $pokemonName,
    "height": $height,
    "weight": $weight,
    "hp": $hp,
    "attack": $attack,
    "defense": $defense,
    "special-attack": $specialAttack,
    "special-defense": $specialDefense,
    "speed": $speed,
    "types": $types,
    "sprite": $sprite
  }

  const { sprite, ...restData } = data

  $sprite.src = sprite ? sprite : ''

  for (const [key, $el] of Object.entries($fields)) {
    if (!restData[key] || Array.isArray(restData[key]) && restData[key].length === 0) {
      $el.innerHTML = '';
    } else if (Array.isArray(restData[key])) {
      $el.innerHTML = createList(restData[key]);
    } else {
      $el.innerHTML = restData[key];
    }
  }
}

const resetInput = () => {
  $searchInput.value = '';
}

const resetPokemonCard = () => {
  updatePokemonCard(DEFAULT_POKEMON_DATA);
}

const reset = () => {
  resetInput();
  resetPokemonCard();
}

const fetchPokemon = async (nameOrId) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/${nameOrId}`)
    const data = await res.json();
    return data
  } catch (err) {
    return null;
  }
}

const submitHandler = async (e) => {
  e.preventDefault();

  const pokemonData = await fetchPokemon($searchInput.value.trim().toLowerCase());
  if (!pokemonData) {
    alert('Pokémon not found');
    reset();
    return;
  }

  updatePokemonCard(transformPokemonData(pokemonData));
  resetInput();
}

$searchForm.addEventListener('submit', submitHandler)
