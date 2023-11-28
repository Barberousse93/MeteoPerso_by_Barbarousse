import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import thermometre from '../assets/icons/WeatherIcon - 2-3.png'
import rain from '../assets/icons/WeatherIcon - 1-17.png'
import wind from '../assets/icons/WeatherIcon - 2-6.png'
import { weatherCodes } from '../utils/weatherCodes'
import PrevisionDetail from './PrevisionDetail'
import usePrevisionJour from '../utils/Hooks/usePrevisionJour'

function PrevisionJour(data) {
  if (!weatherCodes[data.data.weather]) {
    return <div>Code manquant : {data.data.weather} </div>
  }

  const { dateLocale, modalIsOpen, setModalIsOpen, handleClick } = usePrevisionJour(data)

  return (
    <div>
      {modalIsOpen && (
        <PrevisionDetail
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          data={data.data}
        />
      )}

      <Container
        onClick={handleClick}
        sx={{
          border: 1,
          width: 0.99,
          borderRadius: '3px',
          p: 1,
          mt: 2,
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          // alignItems: 'center',
          flexDirection: 'row',
          overflow: 'auto',
          cursor: 'pointer',
        }}
      >
        <Tooltip title={weatherCodes[data.data.weather].libelle} arrow>
          <img
            src={`../icons/${weatherCodes[data.data.weather].icone}.png`}
            alt={weatherCodes[data.data.weather].libelle}
            width='98px'
            style={{ marginRight: '10px' }}
          />
        </Tooltip>
        <Box sx={{ display: 'flex', width: '75%', justifyContent: 'space-around' }}>
          <p>{data.data.day === 0 ? "Aujourd'hui" : data.data.day === 1 ? 'Demain' : dateLocale}</p>
          <br />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
              <Tooltip title='Température min/max'>
                <img src={thermometre} width='24px' />
              </Tooltip>
              {data.data.tmin}° / {data.data.tmax}°
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
              <Tooltip title='Probabilité de pluie (quantité en mm)'>
                <img src={rain} width='24px' />
              </Tooltip>
              {data.data.probarain}% ({data.data.rr1}mm)
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
              <Tooltip title='Viteese moyenne du vent (rafales)'>
                <img src={wind} width='24px' />
              </Tooltip>
              {data.data.wind10m}km/h ({data.data.gust10m}km/h)
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default PrevisionJour
