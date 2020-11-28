import {
  LOAD_POKEMON_SUCCESS,
  LOAD_POKEMON_FAILURE,
  LOAD_POKEMON_BY_TYPE_SUCCESS,
  LOAD_LIST_TYPE_SUCCESS,
  LOAD_LIST_TYPE_FAILURE,
  RESET_POKEMON_LIST,
} from "../constants";

const initialState = {
  pokemon: [],
  listType: [],
  next: null,
};

const pokeList = (state = initialState, action) => {
  let { type, pokemon, next, listType, firstload } = action;
  switch (type) {
    case LOAD_POKEMON_SUCCESS:
      return {
        ...state,
        pokemon: firstload ? pokemon : [...state.pokemon, ...pokemon],
        next,
      };

    case LOAD_POKEMON_BY_TYPE_SUCCESS:
      return {
        ...state,
        pokemon,
      };

    case LOAD_LIST_TYPE_SUCCESS:
      return {
        ...state,
        listType,
      };

    case RESET_POKEMON_LIST:
      return initialState;

    case LOAD_POKEMON_FAILURE:
    case LOAD_LIST_TYPE_FAILURE:
    default:
      return state;
  }
};

export default pokeList;
