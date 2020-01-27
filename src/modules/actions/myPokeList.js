import {
  IMAGE_BASE_URL,
  PROBABILITY,
  RELEASE_MYPOKE_SUCCESS,
  CATCH_POKEMON_SUCCESS,
  CATCH_POKEMON_FAILURE,
} from '../constants';
import Swal from 'sweetalert2';


// CATCH POKEMON
const catchPokemonSuccess = (pokemon = {}) => ({
  type: CATCH_POKEMON_SUCCESS,
  pokemon,
})

const catchPokemonFailure = () => ({
  type: CATCH_POKEMON_FAILURE
})

export function catchPokemon(pokemon = {}, myPokemon = [], index) {
  return dispatch => {
    if (Math.random() <= PROBABILITY) {
      Swal.fire({
        title: 'Successfully Captured',
        input: 'text',
        inputAttributes: {
          placeholder: 'Nickname ?',
          autocapitalize: 'on'
        },
        confirmButtonText: 'Save',
        showLoaderOnConfirm: true,
        preConfirm: (nickname) => {
          if (myPokemon.map(pokeData => (pokeData.nickname)).includes(nickname))
            return (
              Swal.showValidationMessage(
                `Nickname already in use`
              )
            )
          if (!nickname) 
              return (
                Swal.showValidationMessage(
                  `Nickname cannot be empty`
                )
              )
          return nickname
        },
        allowOutsideClick: false
      }).then(nickname => {
        Swal.fire({
          title: `${nickname.value}`,
          text: `Saved Successfully`,
          imageUrl: `${IMAGE_BASE_URL}${index}.png`
        }).then(() => {
          pokemon = { ...pokemon, nickname: nickname.value }
          dispatch(catchPokemonSuccess(pokemon))
        })
      })
    } else {
      Swal.fire(
        'Capture Failed',
        'Try Again Next Time',
        'error'
      ).then(() => {
        dispatch(catchPokemonFailure())
      })
    }
  }
}

//RELEASE POKEMON
const releasePokemonSuccess = (pokemon = {}) => ({
  type: RELEASE_MYPOKE_SUCCESS,
  pokemon,
})

export function releasePokemon(pokemon = {}) {
  return dispatch => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Release it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: `${pokemon.nickname}`,
          text: `Released Successfully`,
          imageUrl: `${pokemon.sprites.back_default}`
        }).then(() => {
          dispatch(releasePokemonSuccess(pokemon))
        })
      }
    })
  }
}