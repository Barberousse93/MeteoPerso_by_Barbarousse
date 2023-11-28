import { useState, useEffect } from 'react'
import useFetch from './useFetch'

export default function usePrevisionHour(props) {
  const [forecast, setForecast] = useState([])
  const [updateDate, setUpdateDate] = useState('')
  const [url, setUrl] = useState('')
  const { data, isLoading, error } = useFetch(url)

  useEffect(() => {
    fetchPrevisonHours()
  }, [props.insee])

  useEffect(() => {
    if (data && data.forecast) {
      const forecastHourly = data.forecast
      setForecast(forecastHourly)
      const updatedate = new Date(data.update)
      const updatedateFormat = updatedate.toLocaleDateString()
      const updateTimeFormat = updatedate.toLocaleTimeString()
      const miseAjour = 'MAJ ' + updatedateFormat + ' à ' + updateTimeFormat
      setUpdateDate(miseAjour)
    }
  }, [data])

  async function fetchPrevisonHours() {
    const urlBase = 'https://api.meteo-concept.com/api/'
    const token = 'd4caf9a6a50b0fa4ff74f43ecee19bcd175c673b14b2c56aa1668fb67dd62c1e'
    const url =
      urlBase + `forecast/nextHours?token=` + token + '&insee=' + props.insee + '&hourly=true'
    setUrl(url)
  }

  return {
    isLoading,
    error,
    forecast,
    updateDate,
  }
}
