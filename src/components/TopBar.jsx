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
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { store } from '../App'
import { villeRecherchee, villeSelectionnee } from '../actions/ville.action'
import { Menu, MenuItem } from '@mui/material'

export default function TopBar() {
  const [ville, setVille] = useState('')

  const handleClick = () => {
    store.dispatch(villeRecherchee(ville))
    store.dispatch(villeSelectionnee(0))
    setVille('')
  }
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  // const NewState = store.getState()
  // console.log('NewState', NewState)

  const { isDark, toggleTheme } = useContext(ThemeContext)

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <Box>
        <Switch name='switchTheme' checked={isDark} onChange={toggleTheme} />
        <label htmlFor='switchTheme'> Theme </label> {isDark ? 'clair' : 'sombre'}
      </Box> */}
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={handleClickMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>
              <Box>
                <Switch name='switchTheme' checked={isDark} onChange={toggleTheme} />
                <label htmlFor='switchTheme'> Theme </label> {isDark ? 'clair' : 'sombre'}
              </Box>
            </MenuItem>
          </Menu>

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
