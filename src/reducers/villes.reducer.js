import { VILLE_RECHERCHEE, VILLE_SELECTIONNEE, ADD_HISTORIQUE } from '../actions/ville.action.js'

const initialState = {
  villeRecherchee: '',
  villeSelectionnee: 0,
  historique: [],
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
    case ADD_HISTORIQUE:
      console.log('action.payload.insee', action.payload.insee)
      const histo = [...state.historique]
      // console.log('histo', histo)
      for (let i = 0; i < histo.length; i++) {
        if (histo[i].insee === action.payload.insee) {
          console.log('pas ajouté')
          return state
        }
      }
      return {
        ...state,
        historique: [...state.historique, action.payload],
      }

    default:
      return state
  }
}
