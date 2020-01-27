import {
  LOAD_POKEMON_SUCCESS,
  LOAD_POKEMON_FAILURE,
  RESET_POKEMON_LIST
} from '../constants'

const initialState = {
  pokemon: [],
  next: null,
};

const pokeList = (state = initialState, action) => {
  
  let { type, pokemon, next } = action;

  switch (type) {
    case LOAD_POKEMON_SUCCESS:
      return {
        pokemon: [...state.pokemon, ...pokemon],
        next,
      };

    case RESET_POKEMON_LIST:
      return initialState

    case LOAD_POKEMON_FAILURE:
    default:
      return state;
  }
}

export default pokeList;