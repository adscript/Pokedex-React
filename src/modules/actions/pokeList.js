import {
  BASE_URL,
  LIMIT,
  LOAD_POKEMON_SUCCESS,
  LOAD_POKEMON_FAILURE,
  LOAD_POKEMON_BY_TYPE_SUCCESS,
  LOAD_LIST_TYPE_SUCCESS,
  LOAD_LIST_TYPE_FAILURE,
  RESET_POKEMON_LIST,
} from "../constants";

// COUNT OWNED POKEMON
export const countOwned = (name, myPokemonList = []) =>
  myPokemonList.filter((item) => item.name === name).length;

// START LOAD
const loadPokemonSuccess = ({ results = [], next, firstload }) => {
  return {
    type: LOAD_POKEMON_SUCCESS,
    pokemon: results,
    next,
    firstload
  };
};

const loadPokemonFailed = () => ({ type: LOAD_POKEMON_FAILURE });

export function loadPokemon({ firstload = true, next }, cb = () => {}) {
  return (dispatch) => {
    let url = firstload ? BASE_URL + `pokemon?limit=${LIMIT}&offset=0` : next;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        const { next, results } = response;
        Promise.all(
          results.map((item) => fetch(item.url).then((resp) => resp.json()))
        ).then((detailPokemon) => {
          results.map((pokemon, idx) => (pokemon.detail = detailPokemon[idx]));
          dispatch(loadPokemonSuccess({ results, next, firstload }));
          cb();
        });
      })
      .catch(() => {
        dispatch(loadPokemonFailed());
        cb();
      });
  };
}
// END LOAD

// START LOAD
const loadPokemonByTypeSuccess = ({ results = [] }) => {
  return {
    type: LOAD_POKEMON_BY_TYPE_SUCCESS,
    pokemon: results,
  };
};

const loadPokemonByTypeFailed = () => ({ type: LOAD_POKEMON_FAILURE });

export function loadPokemonByType({ typeUrl }, cb = () => {}) {
  return (dispatch) => {
    let url = typeUrl;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        const { pokemon } = response;
        Promise.all(
          pokemon.map((item) =>
            fetch(item.pokemon.url).then((resp) => resp.json())
          )
        ).then((detailPokemon) => {
          let newPokemon = [];
          pokemon.map(
            (item, idx) =>
              (newPokemon[idx] = {
                name: item.pokemon.name,
                url: item.pokemon.url,
                detail: detailPokemon[idx],
              })
          );
          dispatch(loadPokemonByTypeSuccess({ results: newPokemon }));
          cb();
        });
      })
      .catch(() => {
        dispatch(loadPokemonByTypeFailed());
        cb();
      });
  };
}
// END LOAD

// START LOAD
const loadListTypeSuccess = ({ results = [] }) => ({
  type: LOAD_LIST_TYPE_SUCCESS,
  listType: results,
});

const loadListTypeFailed = () => ({ type: LOAD_LIST_TYPE_FAILURE });

export function loadListType(cb = () => {}) {
  return (dispatch) => {
    let url = BASE_URL + `type?limit=30&offset=0`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(loadListTypeSuccess({ results: response.results }));
      })
      .catch(() => {
        dispatch(loadListTypeFailed());
        cb();
      });
  };
}
// END LOAD

// RESET STATE LIST
const resetPokemonSuccess = () => ({ type: RESET_POKEMON_LIST });

export function resetPokemonList() {
  return (dispatch) => {
    dispatch(resetPokemonSuccess());
  };
}
