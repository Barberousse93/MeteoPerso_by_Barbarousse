import { store } from '../App'

export const VILLE_RECHERCHEE = 'VILLE_RECHERCHEE'
export const VILLE_SELECTIONNEE = 'VILLE_SELECTIONNEE'
export const ADD_HISTORIQUE = 'ADD_HISTORIQUE'
export const DELETE_HISTORIQUE = 'DELETE_HISTORIQUE'

export const villeRecherchee = (ville) => {
  // console.log('ville payload', ville)
  return (dispatch) => {
    dispatch({ type: VILLE_RECHERCHEE, payload: ville })
  }
}

export const villeSelectionnee = (insee) => {
  return (dispatch) => {
    dispatch({ type: VILLE_SELECTIONNEE, payload: insee })
  }
}

export const addHistorique = (insee, name) => {
  return (dispatch) => {
    dispatch({ type: ADD_HISTORIQUE, payload: insee })
  }
}

export const deleteHistorique = (insee) => {
  return (dispatch) => {
    dispatch({ type: DELETE_HISTORIQUE, payload: insee })
  }
}
