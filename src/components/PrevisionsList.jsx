import { Container, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PrevisionJour from './PrevisionJour'

function PrevisionsList() {
  const insee = useSelector((state) => state.ville.villeSelectionnee)
  const [erreur, setErreur] = useState(false)
  const [forecastList, setForecastList] = useState([])
  const [updateDate, setUpdateDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchPrevisions()
  }, [insee])

  async function fetchPrevisions() {
    setIsLoading(true)
    const urlBase = 'https://api.meteo-concept.com/api/'
    const token2 = 'c90958e683691c5251a4ecc2aec3e22349c67d7f262f60ed04fce5741552d263'
    const url = urlBase + `forecast/daily?token=` + token2 + '&insee=' + insee
    const response = await fetch(url)
    if (!response.ok) {
      const message = `Oups !! Il y a eu un problème : ${response.status} ${response.statusText}`
      setErreur(message)
      throw new Error(message)
    }
    const data = await response.json()
    const forecast = data.forecast
    const updatedate = new Date(data.update)
    const updatedateFormat = updatedate.toLocaleDateString()
    const updateTimeFormat = updatedate.toLocaleTimeString()
    const miseAjour = 'MAJ ' + updatedateFormat + ' à ' + updateTimeFormat
    setForecastList(forecast)
    setUpdateDate(miseAjour)
    setIsLoading(false)
  }

  if (erreur) return <div>Erreur de chargement des données</div>

  return (
    <div>
      {insee !== 0 ? (
        <Container id='box' sx={{ border: 1, width: 1 / 2, borderRadius: '5px', p: 2, mt: 2 }}>
          {forecastList.map((item, index) =>
            isLoading ? (
              <Skeleton key={index} width='95%' height={100} sx={{ m: 1 }}></Skeleton>
            ) : (
              <PrevisionJour key={index} data={item} />
            ),
          )}
          {isLoading ? (
            <Skeleton variant='p'></Skeleton>
          ) : (
            <p style={{ fontSize: '0.8rem' }}>{updateDate}</p>
          )}
        </Container>
      ) : null}
    </div>
  )
}

export default PrevisionsList
