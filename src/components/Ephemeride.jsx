import Container from '@mui/material/Container'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Ephemeride.css'
import { Link, Tooltip, Typography } from '@mui/material'
import sunrise from '../assets/icons/WeatherIcon - 1-24.png'
import sunset from '../assets/icons/WeatherIcon - 1-23.png'

function Ephemeride() {
  const insee = useSelector((state) => state.ville.villeSelectionnee)
  const [infos, setInfos] = useState({})
  const [ephemeride, setEphemeride] = useState({})
  const [jour, setJour] = useState(0)
  const [leftIsVisible, setLeftIsVisible] = useState(true)
  const [rightIsVisible, setRightIsVisible] = useState(true)

  useEffect(() => {
    if (insee !== 0) {
      fetchEphemeride()

      if (jour === 0) {
        setLeftIsVisible(false)
      } else {
        setLeftIsVisible(true)
      }
      if (jour === 14) {
        setRightIsVisible(false)
      } else {
        setRightIsVisible(true)
      }
    }
  }, [insee, jour])

  async function fetchEphemeride() {
    const urlBase = 'https://api.meteo-concept.com/api/'
    const token = 'd4caf9a6a50b0fa4ff74f43ecee19bcd175c673b14b2c56aa1668fb67dd62c1e'
    // const token2 = 'c90958e683691c5251a4ecc2aec3e22349c67d7f262f60ed04fce5741552d263'
    const url = urlBase + `ephemeride/${jour}?token=` + token + '&insee=' + insee
    const response = await fetch(url)
    if (!response.ok) {
      const message = `Oups !! Il y a eu un problème : ${response.status} ${response.statusText}`
      setErreur(message)
      throw new Error(message)
    }
    const data = await response.json()
    const infos = data.city
    const ephemeride = data.ephemeride
    // console.log('infos', infos)
    setInfos(infos)
    // console.log('ephemeride', ephemeride)
    setEphemeride(ephemeride)
    const date = new Date(ephemeride.datetime)
    const dateFormat = date.toLocaleDateString()
    const newEphemeride = { ...ephemeride }
    newEphemeride.datetime = dateFormat
    setEphemeride(newEphemeride)
  }

  const bloc = document.querySelector('#bloc')
  const handleNext = () => {
    bloc.classList.remove('LefttoRight')
    bloc.classList.remove('RightToLeft')
    window.requestAnimationFrame(function (time) {
      window.requestAnimationFrame(function (time) {
        bloc.classList.add('LefttoRight')
      })
    })
    setJour(jour + 1)
  }
  const handlePrevious = () => {
    bloc.classList.remove('RightToLeft')
    bloc.classList.remove('LefttoRight')
    window.requestAnimationFrame(function (time) {
      window.requestAnimationFrame(function (time) {
        bloc.classList.add('RightToLeft')
      })
    })
    setJour(jour - 1)
  }

  return (
    <div>
      {insee !== 0 ? (
        <Container id='box' sx={{ border: 1, width: 1 / 2, borderRadius: '5px', p: 2, mt: 2 }}>
          <Typography variant='h3'>{infos.name} </Typography>
          <br />
          <Typography variant='h6' style={{ display: 'inline' }}>
            Latitude :{' '}
          </Typography>
          {infos.latitude} /{' '}
          <Typography variant='h6' style={{ display: 'inline' }}>
            Longitude :{' '}
          </Typography>
          {infos.longitude}{' '}
          {
            <Link
              href={`https://www.google.fr/maps/@${infos.latitude},${infos.longitude},13z?entry=ttu`}
              target='_blank'
              underline='hover'
            >
              (Carte)
            </Link>
          }
          <br />
          <Typography variant='h6' style={{ display: 'inline' }}>
            Altitude :{' '}
          </Typography>
          {infos.altitude}m<br />
          <Container sx={{ display: 'flex', alignItems: 'center', width: 0.75 }}>
            {leftIsVisible ? (
              <ChevronLeftIcon
                style={{ cursor: 'pointer' }}
                onClick={handlePrevious}
                id='previous'
              />
            ) : (
              <ChevronLeftIcon color='disabled' />
            )}

            <Container
              sx={{ width: 1, border: 1, borderRadius: '5px', p: 1 }}
              id='bloc'
              title='Ephéùéride'
            >
              Date : {ephemeride.datetime} <br />
              <Tooltip title='Lever du soleil'>
                <img src={sunrise} width='24px' />
              </Tooltip>{' '}
              {ephemeride.sunrise} <br />
              <Tooltip title='Coucher du soleil'>
                <img src={sunset} width='24px' />
              </Tooltip>{' '}
              {ephemeride.sunset} ({ephemeride.diff_duration_day}
              mn)
            </Container>

            {rightIsVisible ? (
              <ChevronRightIcon style={{ cursor: 'pointer' }} onClick={handleNext} id='next' />
            ) : (
              <ChevronRightIcon color='disabled' />
            )}
          </Container>
        </Container>
      ) : null}
    </div>
  )
}
export default Ephemeride
