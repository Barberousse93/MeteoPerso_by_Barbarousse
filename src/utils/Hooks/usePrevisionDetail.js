import { useState, useEffect } from 'react'
import useFetch from './useFetch'

export default function usePrevisionDetail(props) {
  const [updateDate, setUpdateDate] = useState('')
  const [forecast, setForecast] = useState([])
  const [url, setUrl] = useState('')
  const { data, isLoading, error } = useFetch(url)

  useEffect(() => {
    fetchPeriodes()
  }, [])

  useEffect(() => {
    if (data && data.forecast) {
      const forecastPeriodes = data.forecast
      setForecast(forecastPeriodes)
      const updatedate = new Date(data.update)
      const updatedateFormat = updatedate.toLocaleDateString()
      const updateTimeFormat = updatedate.toLocaleTimeString()
      const miseAjour = 'MAJ ' + updatedateFormat + ' à ' + updateTimeFormat
      setUpdateDate(miseAjour)
    }
  }, [data])

  async function fetchPeriodes() {
    const urlBase = 'https://api.meteo-concept.com/api/'
    const token2 = 'c90958e683691c5251a4ecc2aec3e22349c67d7f262f60ed04fce5741552d263'
    const url =
      urlBase +
      `forecast/daily/${props.data.day}/periods?token=` +
      token2 +
      '&insee=' +
      props.data.insee
    setUrl(url)
  }

  const dateISO = new Date(props.data.datetime)
  const dateLocale = dateISO.toLocaleDateString()

  const handleClose = () => {
    props.setModalIsOpen(false)
  }

  return {
    handleClose,
    dateLocale,
    forecast,
    updateDate,
    isLoading,
    error,
  }
}
