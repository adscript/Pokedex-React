import {
  CATCH_POKEMON_SUCCESS,
  CATCH_POKEMON_FAILURE,
  RELEASE_MYPOKE_SUCCESS
} from '../constants'

const initialState = {
  pokemonOwned: [],
};

const myPokemon = (state = initialState, action) => {

  let { type, pokemon } = action;

  switch (type) {
    case CATCH_POKEMON_SUCCESS:
      return {
        ...state,
        pokemonOwned: [...state.pokemonOwned, pokemon]
      };

    case RELEASE_MYPOKE_SUCCESS:
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