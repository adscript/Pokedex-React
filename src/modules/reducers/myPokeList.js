import {
  CATCH_POKEMON_SUCCESS,
  CATCH_POKEMON_FAILURE,
  RELEASE_MYPOKE_SUCCESS
} from '../constants'

const initialState = {
  pokemonOwned: JSON.parse(localStorage.getItem('pokemonOwned')) || [],
};

const myPokemon = (state = initialState, action) => {

  let { type, pokemon } = action;

  switch (type) {
    case CATCH_POKEMON_SUCCESS:
      localStorage.setItem('pokemonOwned', JSON.stringify([...state.pokemonOwned, pokemon]))
      return {
        ...state,
        pokemonOwned: [...state.pokemonOwned, pokemon]
      };

    case RELEASE_MYPOKE_SUCCESS:
      localStorage.setItem('pokemonOwned', JSON.stringify([...state.pokemonOwned.filter(item => (item.nickname !== pokemon.nickname))]))
      return {
        ...state,
        pokemonOwned: state.pokemonOwned.filter(item => (item.nickname !== pokemon.nickname)),
      }

    case CATCH_POKEMON_FAILURE:
    default:
      return state;
  }
}

export default myPokemon;