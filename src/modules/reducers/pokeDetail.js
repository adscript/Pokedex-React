import {
  LOAD_DETAIL_SUCCESS,
  LOAD_DETAIL_FAILURE,
} from '../constants'

const initialState = {
  pokemonDetail: {},
};

const pokeDetail = (state = initialState, action) => {

  let { type, pokemonDetail } = action;

  switch (type) {
    case LOAD_DETAIL_SUCCESS:
      return { pokemonDetail };

    case LOAD_DETAIL_FAILURE:
    default:
      return state;
  }
}

export default pokeDetail;