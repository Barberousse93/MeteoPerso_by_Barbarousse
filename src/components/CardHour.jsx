import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import { weatherCodes } from '../utils/weatherCodes'
import thermometre from '../assets/icons/WeatherIcon - 2-3.png'
import rain from '../assets/icons/WeatherIcon - 1-17.png'
import wind from '../assets/icons/WeatherIcon - 2-6.png'
import useCardHour from '../utils/Hooks/useCardHour'

function CardHour(props) {
  if (!weatherCodes[props.data.weather]) {
    return <p>Code manquant : {props.data.weather} </p>
  }

  const { dateLocale, timeLocale } = useCardHour(props)

  return (
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
      <Tooltip title={weatherCodes[props.data.weather].libelle} arrow>
        <img
          src={`../icons/${weatherCodes[props.data.weather].icone}.png`}
          alt={weatherCodes[props.data.weather].libelle}
          width='48px'
          style={{ marginBottom: '5px' }}
        />
      </Tooltip>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <Tooltip title='Température'>
          <img src={thermometre} width='16px' />
        </Tooltip>
        <p style={{ fontSize: '0.8rem', marginLeft: '3px' }}>{props.data.temp2m}°</p>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <Tooltip title='Probabilité de pluie (quantité en mm)'>
          <img src={rain} width='8px' />
        </Tooltip>
        <p style={{ fontSize: '0.8rem', marginLeft: '3px' }}>{props.data.probarain}%</p>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
        <Tooltip title='Viteese moyenne du vent (rafales)'>
          <img src={wind} width='16px' />
        </Tooltip>
        <p style={{ fontSize: '0.8rem', marginLeft: '3px' }}>{props.data.wind10m}km/h</p>
      </Box>
      <p style={{ fontSize: '0.75rem' }}>
        <strong>{timeLocale}</strong>
      </p>
      <p style={{ fontSize: '0.6rem' }}>
        <em>({dateLocale})</em>
      </p>
    </Box>
  )
}

export default CardHour
