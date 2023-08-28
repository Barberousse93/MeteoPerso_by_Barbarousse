import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
// import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import CardPeriod from './CardPeriod'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import thermometre from '../assets/icons/WeatherIcon - 2-3.png'
import rain from '../assets/icons/WeatherIcon - 1-17.png'
import frost from '../assets/icons/WeatherIcon - 1-21.png'
import fog from '../assets/icons/WeatherIcon - 2-27.png'
import wind from '../assets/icons/WeatherIcon - 2-6.png'
import NavigationIcon from '@mui/icons-material/Navigation'

const PaperStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'primary',
  border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  padding: 10,
}

function PrevisionDetail(props) {
  const [erreur, setErreur] = useState(false)
  const [updateDate, setUpdateDate] = useState('')
  const [forecast, setForecast] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchPeriodes()
  }, [])

  async function fetchPeriodes() {
    setIsLoading(true)
    const urlBase = 'https://api.meteo-concept.com/api/'
    //  const token = 'd4caf9a6a50b0fa4ff74f43ecee19bcd175c673b14b2c56aa1668fb67dd62c1e'
    const token2 = 'c90958e683691c5251a4ecc2aec3e22349c67d7f262f60ed04fce5741552d263'
    const url =
      urlBase +
      `forecast/daily/${props.data.day}/periods?token=` +
      token2 +
      '&insee=' +
      props.data.insee
    const response = await fetch(url)
    if (!response.ok) {
      const message = `Oups !! Il y a eu un problème : ${response.status} ${response.statusText}`
      setErreur(message)
      throw new Error(message)
    }
    const dataPeriodes = await response.json()
    // console.log(dataPeriodes)
    const forecastPeriodes = dataPeriodes.forecast
    setForecast(forecastPeriodes)
    // console.log('forecastPeriodes', forecastPeriodes)
    // console.log('forecast', forecast)
    const updatedate = new Date(dataPeriodes.update)
    const updatedateFormat = updatedate.toLocaleDateString()
    const updateTimeFormat = updatedate.toLocaleTimeString()
    const miseAjour = 'MAJ ' + updatedateFormat + ' à ' + updateTimeFormat
    setUpdateDate(miseAjour)
    setIsLoading(false)
  }
  // console.log(props)
  const dateISO = new Date(props.data.datetime)
  const dateLocale = dateISO.toLocaleDateString()

  const handleClose = () => {
    props.setModalIsOpen(false)
  }
  return (
    <>
      {/* {isLoading ? <div>Chargement en cours...</div> : null} */}
      <Modal open={props.modalIsOpen} onClose={handleClose}>
        <Paper style={PaperStyle}>
          <Box sx={{ border: 1, m: 1, p: 1, borderRadius: 3 }}>
            <Typography variant='h6' component='h2'>
              <strong>{dateLocale}</strong>
            </Typography>
            {/* // */}
            <Divider textAlign='left'>
              <Typography sx={{ fontSize: '0.8rem' }} variant='h6' component='h2'>
                Prévisions détaillées
              </Typography>
            </Divider>
            <Box sx={{ border: 1, borderRadius: 3, p: 1, m: 1, overflow: 'auto' }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  {/* Température */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Tooltip title='Température'>
                      <img src={thermometre} width='32px' style={{ margin: '10px' }} />
                    </Tooltip>
                    <Box>
                      <p> min :{props.data.tmin}°</p>
                      <p> max : {props.data.tmax}°</p>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Pluie */}
                  <Tooltip title='Prévisions relatives à la pluie'>
                    <img src={rain} width='24px' style={{ margin: '10px' }} />
                  </Tooltip>
                  <Box>
                    <p>Probabilité : {props.data.probarain}% </p>
                    <p>Cumul : {props.data.rr10}mm</p>
                    <p>Cumul max : {props.data.rr1}mm</p>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  {/* Gel / brouillard */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Tooltip title='Probabilité de gel'>
                      <img src={frost} width='24px' style={{ margin: '10px' }} />
                    </Tooltip>
                    <p>Probalité : {props.data.probafrost}%</p>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Tooltip title='Probabilité de brouillard'>
                      <img src={fog} width='24px' style={{ margin: '10px' }} />
                    </Tooltip>
                    <p>Probabilité : {props.data.probafog}%</p>
                  </Box>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                sx={{
                  mt: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title='Prévisions relatives au vent'>
                    <img src={wind} width='48px' style={{ margin: '10px' }} />
                  </Tooltip>
                  <Box>
                    <p>Vitesse moyenne : {props.data.wind10m}km/h</p>
                    <p>Rafales : {props.data.gust10m}km/h</p>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <p>Direction :</p>
                      <NavigationIcon
                        sx={{ transform: `rotate(${props.data.dirwind10m}deg)`, ml: 1 }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyItems: 'center',
                  }}
                >
                  <p>Proba. vent fort (70 à 100km/h) : {props.data.probawind70}%</p>
                  <p>Proba. vent très fort (&gt;100km/h) : {props.data.probawind100}%</p>
                </Grid>
              </Grid>
            </Box>
            {/* // */}
            <Divider textAlign='left'>
              <Typography sx={{ fontSize: '0.8rem' }} variant='h6' component='h2'>
                1/4 de journée
              </Typography>
            </Divider>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                // justifyContent: 'space-evenly',
                m: 1,
                p: 1,
                border: 1,
                borderRadius: 3,
                overflow: 'auto',
              }}
            >
              {forecast.map((item, index) =>
                isLoading ? (
                  <Skeleton width={250} height={300} sx={{ m: 1 }} />
                ) : (
                  <CardPeriod key={index} dataPeriod={item} />
                ),
              )}
            </Box>
            <Typography variant='p'>
              <p style={{ fontSize: '0.7rem' }}>{updateDate}</p>
            </Typography>
          </Box>
          <Button sx={{ m: 1 }} onClick={() => props.setModalIsOpen(false)} variant='contained'>
            FERMER
          </Button>
        </Paper>
      </Modal>
    </>
  )
}

export default PrevisionDetail
