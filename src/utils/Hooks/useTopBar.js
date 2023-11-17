import { useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import ThemeContext from '../Theming/ThemeContext'
import { villeRecherchee, villeSelectionnee } from '../../actions/ville.action.js'
import { store } from '../../App.jsx'

export default function useTopBar() {
  const [ville, setVille] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { isDark, toggleTheme } = useContext(ThemeContext)
  const histo = useSelector((state) => state.ville.historique)

  const handleClick = () => {
    store.dispatch(villeRecherchee(ville))
    store.dispatch(villeSelectionnee(0))
    setVille('')
  }

  // Touche escape
  const handleKeyUp = (e) => {
    if (e.keyCode === 13 && e.target.value !== '') {
      handleClick()
    }
  }

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClickMenutem = (e) => {
    store.dispatch(villeSelectionnee(e.target.value))
    setAnchorEl(null)
  }
  return {
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
  }
}
