import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import useFetch from './useFetch'

export default function usePrevisionList() {
  const insee = useSelector((state) => state.ville.villeSelectionnee)
  const [url, setUrl] = useState('')
  const [forecastList, setForecastList] = useState([])
  const [updateDate, setUpdateDate] = useState('')
  const { data, isLoading, error } = useFetch(url)

  useEffect(() => {
    fetchPrevisions()
  }, [insee])

  useEffect(() => {
    if (data && data.forecast) {
      const forecast = data.forecast
      const updatedate = new Date(data.update)
      const updatedateFormat = updatedate.toLocaleDateString()
      const updateTimeFormat = updatedate.toLocaleTimeString()
      const miseAjour = 'MAJ ' + updatedateFormat + ' à ' + updateTimeFormat
      setForecastList(forecast)
      setUpdateDate(miseAjour)
    }
  }, [data])

  async function fetchPrevisions() {
    const urlBase = 'https://api.meteo-concept.com/api/'
    const token2 = 'c90958e683691c5251a4ecc2aec3e22349c67d7f262f60ed04fce5741552d263'
    const url = urlBase + `forecast/daily?token=` + token2 + '&insee=' + insee
    setUrl(url)
  }
  return {
    isLoading,
    error,
    forecastList,
    updateDate,
    insee,
  }
}
