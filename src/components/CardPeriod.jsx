import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import React from 'react'
import { weatherCodes } from '../utils/weatherCodes'
import thermometre from '../assets/icons/WeatherIcon - 2-3.png'
import rain from '../assets/icons/WeatherIcon - 1-17.png'
import wind from '../assets/icons/WeatherIcon - 2-6.png'

const periode = {
  0: { libelle: 'nuit' },
  1: { libelle: 'matin' },
  2: { libelle: 'après-midi' },
  3: { libelle: 'soir' },
}
function CardPeriod(props) {
  //   console.log(props)
  if (!weatherCodes[props.dataPeriod.weather]) {
    return <p>Code manquant : {props.dataPeriod.weather} </p>
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          m: 1,
          border: 1,
          p: 1,
          borderRadius: 3,
        }}
      >
        <Tooltip title={weatherCodes[props.dataPeriod.weather].libelle} arrow>
          <img
            src={`../icons/${weatherCodes[props.dataPeriod.weather].icone}.png`}
            alt={weatherCodes[props.dataPeriod.weather].libelle}
            width='72px'
            style={{ marginBottom: '5px' }}
          />
        </Tooltip>
        <Divider></Divider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '5px',
          }}
        >
          <Tooltip title='Température'>
            <img src={thermometre} width='24px' />
          </Tooltip>
          <p style={{ fontSize: '0.9rem', marginLeft: '3px' }}>{props.dataPeriod.temp2m}°</p>
        </Box>
        <Divider></Divider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '5px',
          }}
        >
          <Tooltip title='Probabilité de pluie (quantité en mm)'>
            <img src={rain} width='16px' />
          </Tooltip>
          <p style={{ fontSize: '0.9rem', marginLeft: '3px' }}>{props.dataPeriod.probarain}%</p>
          <p style={{ fontSize: '0.7rem', marginLeft: '3px' }}>({props.dataPeriod.rr10}mm)</p>
        </Box>
        <Divider></Divider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '5px',
          }}
        >
          <Tooltip title='Viteese moyenne du vent (rafales)'>
            <img src={wind} width='24px' />
          </Tooltip>
          <p style={{ fontSize: '0.9rem', marginLeft: '3px' }}>{props.dataPeriod.wind10m}km/h</p>{' '}
          <p style={{ fontSize: '0.7rem', marginLeft: '3px' }}>({props.dataPeriod.gust10m}km/h)</p>
        </Box>
        <Divider></Divider>
        <p>
          <strong>
            <em>{periode[props.dataPeriod.period].libelle}</em>
          </strong>
        </p>
      </Box>
    </div>
  )
}

export default CardPeriod
