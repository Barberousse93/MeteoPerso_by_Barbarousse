import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Container, FormControl, InputLabel, MenuItem, Select, Skeleton } from '@mui/material'
import { store } from '../App'
import { villeSelectionnee, addHistorique } from '../actions/ville.action'

function ListeVilles() {
  const [liste, setListe] = useState([])
  const [erreur, setErreur] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const Ville = useSelector((state) => state.ville.villeRecherchee)
  const insee = useSelector((state) => state.ville.villeSelectionnee)

  useEffect(() => {
    if (Ville.length === 0) {
      return
    }
    fetchCities()
  }, [Ville])

  useEffect(() => {
    if (insee !== 0) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [insee])

  const [villeChoisie, setVilleChoisie] = useState()

  const handleChange = (e) => {
    setVilleChoisie(e.target.value)
  }

  // const NewState = store.getState()
  // console.log('NewState ListeVilles', NewState)

  async function fetchCities() {
    setIsLoading(true)
    const urlBase = 'https://api.meteo-concept.com/api/'
    const token2 = 'c90958e683691c5251a4ecc2aec3e22349c67d7f262f60ed04fce5741552d263'
    const url = urlBase + 'location/cities/?token=' + token2 + '&search=' + Ville
    const response = await fetch(url)
    if (!response.ok) {
      const message = `Oups !! Il y a eu un problème : ${response.status} ${response.statusText}`
      setErreur(message)
      throw new Error(message)
    }
    const data = await response.json()
    const liste = data['cities']

    if (liste.length === 1) {
      store.dispatch(villeSelectionnee(liste[0].insee))
      store.dispatch(addHistorique(liste[0].insee, liste[0].name))
      setIsVisible(false)
    } else {
      setListe(liste)
      // setIsVisible(true)
    }
    setIsLoading(false)
  }

  if (erreur) {
    return <div>{erreur} </div>
  }

  if ((Ville.length !== 0) & (liste.length == 0)) {
    return <div>Aucun résultat...</div>
  }

  return (
    <div>
      {/* {isLoading ? <div>Chargement en cours...</div> : null} */}
      {isVisible ? (
        <Container sx={{ width: 1 / 2, display: 'flex', justifyContent: 'center' }}>
          {isLoading ? (
            <Skeleton width={300} height={50} />
          ) : (
            <FormControl fullWidth sx={{ margin: 2, left: '25%' }}>
              <InputLabel variant='outlined'>Sélectionnez dans la liste</InputLabel>
              <Select
                value={villeChoisie}
                onChange={handleChange}
                defaultValue=''
                sx={{ width: 1 / 2 }}
                label='Sélectionnez dans la liste'
              >
                {liste.map((item) => (
                  <MenuItem
                    key={item.insee}
                    value={item.insee}
                    onClick={() => {
                      store.dispatch(villeSelectionnee(item.insee)),
                        setIsVisible(false),
                        store.dispatch(addHistorique({ insee: item.insee, name: item.name }))
                    }}
                  >
                    {item.name} ({item.cp})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Container>
      ) : null}
    </div>
  )
}

export default ListeVilles
