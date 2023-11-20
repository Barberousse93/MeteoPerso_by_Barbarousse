import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import useFetch from '../../utils/Hooks/useFetch'
import { store } from '../../App'
import { villeSelectionnee, addHistorique, villeRecherchee } from '../../actions/ville.action'

export default function useListeVille() {
  const [isVisible, setIsVisible] = useState(true)
  const [villeChoisie, setVilleChoisie] = useState('')
  const [url, setUrl] = useState('')
  const [liste, setListe] = useState([])
  const { data, isLoading, error } = useFetch(url)

  const Ville = useSelector((state) => state.ville.villeRecherchee)

  useEffect(() => {
    if (Ville.length > 0) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [Ville])

  const handleChange = (e) => {
    setVilleChoisie(e.target.value)
  }

  const handleClickItem = (insee, name) => {
    console.log(insee, name)
    store.dispatch(villeSelectionnee(insee)),
      store.dispatch(villeRecherchee('')),
      setIsVisible(false),
      setListe([])
    store.dispatch(addHistorique({ insee, name }))
  }

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

  async function fetchCities() {
    const urlBase = 'https://api.meteo-concept.com/api/'
    const token2 = 'c90958e683691c5251a4ecc2aec3e22349c67d7f262f60ed04fce5741552d263'
    const url = urlBase + 'location/cities/?token=' + token2 + '&search=' + Ville
    setUrl(url)
  }

  return {
    isLoading,
    error,
    liste,
    isVisible,
    villeChoisie,
    handleChange,
    handleClickItem,
  }
}
