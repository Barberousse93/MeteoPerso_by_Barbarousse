import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Switch from '@mui/material/Switch'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'

import { store } from '../App'
import { deleteHistorique } from '../actions/ville.action'
import useTopBar from '../utils/Hooks/useTopBar'

export default function TopBar() {
  const {
    handleClick,
    handleKeyUp,
    handleClickMenu,
    handleClose,
    handleClickMenutem,
    open,
    isDark,
    toggleTheme,
    histo,
    anchorEl,
    ville,
    setVille,
  } = useTopBar()
  return (
    <Box sx={{ flexGrow: 1, mb: 10 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            onClick={handleClickMenu}
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem disabled>
              <em>Historique</em>
            </MenuItem>
            {histo.map((item) => (
              <Box
                key={item.insee}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <MenuItem value={item.insee} onClick={handleClickMenutem}>
                  {item.name}
                </MenuItem>
                <ListItemIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    store.dispatch(deleteHistorique(item.insee))
                  }}
                >
                  <DeleteIcon />
                </ListItemIcon>
              </Box>
            ))}
            <Divider></Divider>
            <MenuItem>
              <Switch
                name='switchTheme'
                checked={isDark}
                onChange={toggleTheme}
                onClick={handleClose}
              />
              <label htmlFor='switchTheme'> Theme&nbsp;</label> {isDark ? 'Clair' : 'Sombre'}
            </MenuItem>
          </Menu>

          <Typography
            variant='h6'
            noWrap
            component='h1'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            METEO (FRANCE)
          </Typography>
          <TextField
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '5px',
            }}
            onChange={(e) => setVille(e.target.value)}
            onKeyUp={handleKeyUp}
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
