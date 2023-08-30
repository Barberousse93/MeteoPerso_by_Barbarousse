import {
  VILLE_RECHERCHEE,
  VILLE_SELECTIONNEE,
  ADD_HISTORIQUE,
  DELETE_HISTORIQUE,
} from '../actions/ville.action.js'

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
      const addHisto = [...state.historique]
      // console.log('histo', histo)
      for (let i = 0; i < addHisto.length; i++) {
        if (addHisto[i].insee === action.payload.insee) {
          // console.log('pas ajouté')
          return state
        }
      }
      return {
        ...state,
        historique: [...state.historique, action.payload],
      }

    case DELETE_HISTORIQUE:
      const deleteHisto = [...state.historique]
      const newHisto = deleteHisto.filter((ville) => ville.insee !== action.payload)
      return {
        ...state,
        historique: newHisto,
      }

    default:
      return state
  }
}
