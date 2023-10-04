import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Skeleton from '@mui/material/Skeleton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import './Ephemeride.css'
import PrevisionHours from './PrevisionHours'
import sunrise from '../assets/icons/WeatherIcon - 1-24.png'
import sunset from '../assets/icons/WeatherIcon - 1-23.png'

function Ephemeride() {
  const insee = useSelector((state) => state.ville.villeSelectionnee)
  const [infos, setInfos] = useState({})
  const [ephemeride, setEphemeride] = useState({})
  const [jour, setJour] = useState(0)
  const [leftIsVisible, setLeftIsVisible] = useState(true)
  const [rightIsVisible, setRightIsVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const bloc = useRef(null)

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
    setIsLoading(true)
    const urlBase = 'https://api.meteo-concept.com/api/'
    const token = 'd4caf9a6a50b0fa4ff74f43ecee19bcd175c673b14b2c56aa1668fb67dd62c1e'
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
    setInfos(infos)
    setEphemeride(ephemeride)
    const date = new Date(ephemeride.datetime)
    const dateFormat = date.toLocaleDateString()
    const newEphemeride = { ...ephemeride }
    newEphemeride.datetime = dateFormat
    setEphemeride(newEphemeride)
    setIsLoading(false)
  }

  // const bloc = document.querySelector('#bloc') // <==== Remplacer par useRef
  const handleNext = () => {
    bloc.current.classList.remove('LefttoRight')
    bloc.current.classList.remove('RightToLeft')
    window.requestAnimationFrame(function (time) {
      window.requestAnimationFrame(function (time) {
        bloc.current.classList.add('LefttoRight')
      })
    })
    setJour(jour + 1)
  }
  const handlePrevious = () => {
    bloc.current.classList.remove('RightToLeft')
    bloc.current.classList.remove('LefttoRight')
    window.requestAnimationFrame(function (time) {
      window.requestAnimationFrame(function (time) {
        bloc.current.classList.add('RightToLeft')
      })
    })
    setJour(jour - 1)
  }

  return (
    <div>
      {insee !== 0 ? (
        <Container id='box' sx={{ border: 1, width: 1 / 2, borderRadius: '5px', p: 2, mt: 2 }}>
          <Typography variant='h3'>{isLoading ? <Skeleton width='50%' /> : infos.name} </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant='h6' style={{ display: 'inline' }}>
              <p style={{ marginRight: '5px' }}>Latitude : </p>
            </Typography>
            {isLoading ? <Skeleton width={100} /> : <p>{infos.latitude} </p>}
            <p> / </p>
            <Typography variant='h6' style={{ display: 'inline' }}>
              <p style={{ marginRight: '5px' }}>Longitude : </p>
            </Typography>
            {isLoading ? <Skeleton width={100} /> : infos.longitude}

            {
              <Link
                href={`https://www.google.fr/maps/@${infos.latitude},${infos.longitude},13z?entry=ttu`}
                target='_blank'
                underline='hover'
              >
                {isLoading ? (
                  <Skeleton width={30} />
                ) : (
                  <p style={{ marginLeft: '5px' }}> (Carte)</p>
                )}
              </Link>
            }
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography variant='h6' style={{ display: 'inline' }}>
              <p style={{ marginRight: '5px' }}>Altitude : </p>
            </Typography>
            {isLoading ? <Skeleton width={20} /> : infos.altitude + 'm'}
          </Box>

          <Container sx={{ display: 'flex', alignItems: 'center', width: 0.9 }}>
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
              ref={bloc}
              title='Ephéùéride'
            >
              {isLoading ? <Skeleton width={150} /> : <p>Date : {ephemeride.datetime}</p>}
              {isLoading ? (
                <Skeleton width={200} height={75} />
              ) : (
                <Box>
                  <Tooltip title='Lever du soleil'>
                    <img src={sunrise} width='24px' />
                  </Tooltip>
                  {ephemeride.sunrise} <br />
                  <Tooltip title='Coucher du soleil'>
                    <img src={sunset} width='24px' />
                  </Tooltip>{' '}
                  {ephemeride.sunset} ({ephemeride.diff_duration_day}
                  mn)
                </Box>
              )}
            </Container>

            {rightIsVisible ? (
              <ChevronRightIcon style={{ cursor: 'pointer' }} onClick={handleNext} id='next' />
            ) : (
              <ChevronRightIcon color='disabled' />
            )}
          </Container>
          <PrevisionHours insee={insee}></PrevisionHours>
        </Container>
      ) : null}
    </div>
  )
}
export default Ephemeride
