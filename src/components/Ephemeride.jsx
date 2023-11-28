import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Skeleton from '@mui/material/Skeleton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import React from 'react'
import './Ephemeride.css'
import PrevisionHours from './PrevisionHours'
import sunrise from '../assets/icons/WeatherIcon - 1-24.png'
import sunset from '../assets/icons/WeatherIcon - 1-23.png'
import useTheme from '@mui/material/styles/useTheme'
import useEphemeride from '../utils/Hooks/useEphemeride'

function Ephemeride() {
  const theme = useTheme()

  const {
    insee,
    isLoading,
    error,
    infos,
    leftIsVisible,
    rightIsVisible,
    handlePrevious,
    handleNext,
    bloc,
    ephemeride,
  } = useEphemeride()

  if (error) {
    return <div>{error} </div>
  }

  return (
    <div>
      {insee !== 0 ? (
        <Container
          id='box'
          sx={{
            border: 1,
            width: 1 / 2,
            borderRadius: '5px',
            p: 2,
            mt: 2,
            [theme.breakpoints.down('md')]: {
              // Styles pour les écrans de taille "900" et inférieurs
              width: '100%',
            },
            [theme.breakpoints.up('md')]: {
              // Styles pour les écrans de taille "900" et supérieurs
              width: '75%',
            },
            [theme.breakpoints.up('lg')]: {
              // Styles pour les écrans de taille "1200" et supérieurs
              width: '50%',
            },
          }}
        >
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
              title='Ephéméride'
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
