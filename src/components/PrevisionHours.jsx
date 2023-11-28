import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import CardHour from './CardHour'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import usePrevisionHour from '../utils/Hooks/usePrevisionHour'

function PrevisionHours(props) {
  const { isLoading, error, forecast, updateDate } = usePrevisionHour(props)

  if (error) return <div>{error}</div>

  return (
    <>
      <Box sx={{ border: 1, mt: 2, borderRadius: 3, p: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', overflow: 'auto' }}>
          {forecast.map((item, index) =>
            isLoading ? (
              <Skeleton key={index} width={50} height={200} sx={{ m: 1 }}></Skeleton>
            ) : (
              <CardHour key={index} data={item}></CardHour>
            ),
          )}
        </Box>
        {isLoading ? (
          <Skeleton variant='p' />
        ) : (
          <Typography variant='p'>
            <p style={{ fontSize: '0.7rem' }}>{updateDate}</p>
          </Typography>
        )}
      </Box>
    </>
  )
}

export default PrevisionHours
