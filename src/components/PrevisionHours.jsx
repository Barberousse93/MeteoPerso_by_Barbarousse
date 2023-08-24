import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import CardHour from './CardHour'
import { Typography } from '@mui/material'

function PrevisionHours(props) {
  const [erreur, setErreur] = useState(false)
  const [forecast, setForecast] = useState([])
  const [updateDate, setUpdateDate] = useState('')

  useEffect(() => {
    fetchPrevisonHours()
  }, [])

  async function fetchPrevisonHours() {
    const urlBase = 'https://api.meteo-concept.com/api/'
    const token = 'd4caf9a6a50b0fa4ff74f43ecee19bcd175c673b14b2c56aa1668fb67dd62c1e'
    // const token2 = 'c90958e683691c5251a4ecc2aec3e22349c67d7f262f60ed04fce5741552d263'
    const url =
      urlBase + `forecast/nextHours?token=` + token + '&insee=' + props.insee + '&hourly=true'
    const response = await fetch(url)
    if (!response.ok) {
      const message = `Oups !! Il y a eu un problème : ${response.status} ${response.statusText}`
      setErreur(message)
      throw new Error(message)
    }
    const data = await response.json()
    const forecastHourly = data.forecast
    setForecast(forecastHourly)
    const updatedate = new Date(data.update)
    const updatedateFormat = updatedate.toLocaleDateString()
    const updateTimeFormat = updatedate.toLocaleTimeString()
    const miseAjour = 'MAJ ' + updatedateFormat + ' à ' + updateTimeFormat
    setUpdateDate(miseAjour)
  }

  if (erreur) return <div>Erreur de chargement des données</div>

  return (
    <Box sx={{ border: 1, mt: 2, borderRadius: 3, p: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
        {forecast.map((item, index) => (
          <CardHour key={index} data={item}></CardHour>
        ))}
      </Box>
      <Typography variant='p'>
        <p style={{ fontSize: '0.7rem' }}>{updateDate}</p>
      </Typography>
    </Box>
  )
}

export default PrevisionHours
