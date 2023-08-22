import { Container } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box'
import thermometre from '../assets/icons/WeatherIcon - 2-3.png'
import rain from '../assets/icons/WeatherIcon - 1-17.png'
import wind from '../assets/icons/WeatherIcon - 2-6.png'
import { weatherCodes } from '../utils/weatherCodes'

function PrevisionJour(data) {
  const dateISO = new Date(data.data.datetime)
  const dateLocale = dateISO.toLocaleDateString()
  console.log(data.data.weather)

  return (
    <div>
      <Container
        sx={{
          border: 1,
          width: 0.99,
          borderRadius: '3px',
          p: 1,
          mt: 2,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <img
          src={`../icons/${weatherCodes[data.data.weather].icone}.png`}
          alt={weatherCodes[data.data.weather].libelle}
          width='98px'
          style={{ marginRight: '10px' }}
        />
        <Box>
          {data.data.day === 0 ? "Aujourd'hui" : data.data.day === 1 ? 'Demain' : dateLocale}
          <br />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
              <img src={thermometre} width='24px' />
              {data.data.tmin}° / {data.data.tmax}°
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
              <img src={rain} width='24px' /> {data.data.probarain}% ({data.data.rr1}mm)
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
              <img src={wind} width='24px' /> {data.data.wind10m}km/h ({data.data.gust10m}km/h)
            </Box>
          </Box>
        </Box>
        {/* <br /> */}
      </Container>
    </div>
  )
}

export default PrevisionJour
