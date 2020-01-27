import {
  BASE_URL,
  LIMIT,
  LOAD_POKEMON_SUCCESS,
  LOAD_POKEMON_FAILURE,
  RESET_POKEMON_LIST
} from '../constants';

// COUNT OWNED POKEMON
export const countOwned = (name, myPokemonList = []) => (
  myPokemonList.filter((item) => (item.name === name)).length
)

// START LOAD
const loadPokemonSuccess = ({ results = [], next }) => ({
  type: LOAD_POKEMON_SUCCESS,
  pokemon: results,
  next,
});

const loadPokemonFailed = () => ({ type: LOAD_POKEMON_FAILURE });

export function loadPokemon({ firstload = true, next }, cb = () => { }) {
  return dispatch => {

    let url = firstload ? BASE_URL + `pokemon?limit=${LIMIT}&offset=0` : next;
    firstload = false;

    fetch(url, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(response => {
        const { next, results } = response;
        dispatch(loadPokemonSuccess({ results, next, firstload }));
        cb();
      })
      .catch(() => {
        dispatch(loadPokemonFailed());
        cb();
      });
  };
}
// END LOAD TODO

// RESET STATE LIST
const resetPokemonSuccess = () => ({ type: RESET_POKEMON_LIST });

export function resetPokemonList() {
  return dispatch => {
    dispatch(resetPokemonSuccess());
  };
}