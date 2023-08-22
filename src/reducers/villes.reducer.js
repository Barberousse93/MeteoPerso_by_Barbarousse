import { VILLE_RECHERCHEE, VILLE_SELECTIONNEE } from '../actions/ville.action.js'

const initialState = {
  villeRecherchee: '',
  villeSelectionnee: 0,
}

export function ville(state = initialState, action) {
  switch (action.type) {
    case VILLE_RECHERCHEE:
      return {
        ...state,
        villeRecherchee: action.payload,
      }
    case VILLE_SELECTIONNEE:
      return {
        ...state,
        villeSelectionnee: action.payload,
      }
    default:
      return state
  }
}
