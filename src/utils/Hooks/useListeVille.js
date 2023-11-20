import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

export default function useListeVille() {
  const [isVisible, setIsVisible] = useState(true)
  const [villeChoisie, setVilleChoisie] = useState('')

  const Ville = useSelector((state) => state.ville.villeRecherchee)

  useEffect(() => {
    if (Ville.length > 0) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [Ville])

  const handleChange = (e) => {
    setVilleChoisie(e.target.value)
  }

  return {
    isVisible,
    setIsVisible,
    villeChoisie,
    handleChange,
  }
}
