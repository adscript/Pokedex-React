import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import pokeList from "./pokeList";
import myPokemon from "./myPokeList";
import pokeDetail from './pokeDetail';

export default history =>
  combineReducers({ router: connectRouter(history), pokeList, myPokemon, pokeDetail });