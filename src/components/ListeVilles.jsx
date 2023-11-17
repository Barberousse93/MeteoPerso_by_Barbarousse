import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Skeleton from '@mui/material/Skeleton'
import { store } from '../App'
import { villeSelectionnee, addHistorique, villeRecherchee } from '../actions/ville.action'
import useFetch from '../utils/Hooks/useFetch'
import useListeVille from '../utils/Hooks/useListeVille'

function ListeVilles() {
  const [url, setUrl] = useState('')
  const [liste, setListe] = useState([])

  const { data, isLoading, error } = useFetch(url)

  const Ville = useSelector((state) => state.ville.villeRecherchee)
  const insee = useSelector((state) => state.ville.villeSelectionnee)

  useEffect(() => {
    if (Ville.length > 0) {
      fetchCities()
    }
  }, [Ville])

  useEffect(() => {
    if (data && data['cities']) {
      const liste = data['cities']

      if (liste.length === 1) {
        store.dispatch(villeSelectionnee(liste[0].insee))
        store.dispatch(addHistorique({ insee: liste[0].insee, name: liste[0].name }))
        setIsVisible(false)
      } else {
        setListe(liste)
      }
    }
  }, [data])

  const { isVisible, setIsVisible, villeChoisie, handleChange } = useListeVille()

  async function fetchCities() {
    const urlBase = 'https://api.meteo-concept.com/api/'
    const token2 = 'c90958e683691c5251a4ecc2aec3e22349c67d7f262f60ed04fce5741552d263'
    const url = urlBase + 'location/cities/?token=' + token2 + '&search=' + Ville
    setUrl(url)
  }

  if (error) {
    return <div>{error} </div>
  }

  if (Ville.length !== 0 && liste.length === 0 && insee === 0) {
    return <div>Aucun résultat...</div>
  }

  return (
    <div>
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
                        store.dispatch(villeRecherchee('')),
                        setIsVisible(false),
                        setListe([])
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
