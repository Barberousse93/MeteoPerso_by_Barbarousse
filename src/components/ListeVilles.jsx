import React from 'react'
import { useSelector } from 'react-redux'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Skeleton from '@mui/material/Skeleton'
import useListeVille from '../utils/Hooks/useListeVille'

function ListeVilles() {
  const { isLoading, error, liste, isVisible, villeChoisie, handleChange, handleClickItem } =
    useListeVille()

  const Ville = useSelector((state) => state.ville.villeRecherchee)
  const insee = useSelector((state) => state.ville.villeSelectionnee)

  if (error) {
    return <div>{error} </div>
  }

  if (Ville.length !== 0 && liste.length === 0 && insee === 0) {
    return <div>Aucun résultat...</div>
  }

  return (
    <div>
      {isVisible ? (
        <Container sx={{ width: 1 / 2, display: 'flex', justifyContent: 'center' }}>
          {isLoading ? (
            <Skeleton width={300} height={50} />
          ) : (
            <FormControl fullWidth sx={{ margin: 2, left: '25%' }}>
              <InputLabel variant='outlined'>Sélectionnez dans la liste</InputLabel>
              <Select
                value={villeChoisie}
                onChange={handleChange}
                defaultValue=''
                sx={{ width: 1 / 2 }}
                label='Sélectionnez dans la liste'
              >
                {liste.map((item) => (
                  <MenuItem
                    key={item.insee}
                    value={item.insee}
                    onClick={(e) => handleClickItem(item.insee, item.name)}
                  >
                    {item.name} ({item.cp})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Container>
      ) : null}
    </div>
  )
}

export default ListeVilles
