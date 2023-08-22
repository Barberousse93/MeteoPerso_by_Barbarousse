import React, { useState, useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Switch from '@mui/material/Switch'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import ThemeContext from '../utils/Theming/ThemeContext'
import { store } from '../App'
import { villeRecherchee, villeSelectionnee } from '../actions/ville.action'

export default function TopBar() {
  const [ville, setVille] = useState('')

  const handleClick = () => {
    store.dispatch(villeRecherchee(ville))
    store.dispatch(villeSelectionnee(0))
    setVille('')
  }

  // const NewState = store.getState()
  // console.log('NewState', NewState)

  const { isDark, toggleTheme } = useContext(ThemeContext)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <Switch name='switchTheme' checked={isDark} onChange={toggleTheme} />
        Theme {isDark ? 'clair' : 'sombre'}
      </Box>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='h1'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            METEO
          </Typography>
          <TextField
            style={{
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: '5px',
            }}
            onChange={(e) => setVille(e.target.value)}
            value={ville}
            size='small'
            placeholder='Rechercher une ville...'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon style={{ cursor: 'pointer' }} onClick={handleClick} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <ClearIcon onClick={() => setVille('')} style={{ cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
