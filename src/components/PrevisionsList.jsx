import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PrevisionJour from './PrevisionJour'

function PrevisionsList() {
  const insee = useSelector((state) => state.ville.villeSelectionnee)
  const [forecastList, setForecastList] = useState([])
  const [updateDate, setUpdateDate] = useState('')

  useEffect(() => {
    if (insee !== 0) {
      fetchPrevisions()
    }
  }, [insee])

  async function fetchPrevisions() {
    const urlBase = 'https://api.meteo-concept.com/api/'
    // const token = 'd4caf9a6a50b0fa4ff74f43ecee19bcd175c673b14b2c56aa1668fb67dd62c1e'
    const token2 = 'c90958e683691c5251a4ecc2aec3e22349c67d7f262f60ed04fce5741552d263'
    // https://api.meteo-concept.com/api/forecast/daily?token=d4caf9a6a50b0fa4ff74f43ecee19bcd175c673b14b2c56aa1668fb67dd62c1e&insee=35238
    const url = urlBase + `forecast/daily?token=` + token2 + '&insee=' + insee
    const response = await fetch(url)
    if (!response.ok) {
      const message = `Oups !! Il y a eu un problème : ${response.status} ${response.statusText}`
      setErreur(message)
      throw new Error(message)
    }
    const data = await response.json()
    const forecast = data.forecast
    setForecastList(forecast)

    const updatedate = new Date(data.update)
    const updatedateFormat = updatedate.toLocaleDateString()
    const updateTimeFormat = updatedate.toLocaleTimeString()
    const miseAjour = 'MAJ ' + updatedateFormat + ' à ' + updateTimeFormat
    setUpdateDate(miseAjour)
  }
  return (
    <div>
      {insee !== 0 ? (
        <Container id='box' sx={{ border: 1, width: 1 / 2, borderRadius: '5px', p: 2, mt: 2 }}>
          {forecastList.map((item, index) => (
            <PrevisionJour key={index} data={item} />
          ))}
          <p style={{ fontSize: '0.8rem' }}>{updateDate}</p>
        </Container>
      ) : null}
    </div>
  )
}

export default PrevisionsList
