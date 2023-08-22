export const VILLE_RECHERCHEE = 'VILLE_RECHERCHEE'
export const VILLE_SELECTIONNEE = 'VILLE_SELECTIONNEE'

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
