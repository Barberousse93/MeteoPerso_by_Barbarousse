import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import useFetch from './useFetch'

export default function useEphemeride() {
  const insee = useSelector((state) => state.ville.villeSelectionnee)
  const [infos, setInfos] = useState({})
  const [ephemeride, setEphemeride] = useState({})
  const [jour, setJour] = useState(0)
  const [leftIsVisible, setLeftIsVisible] = useState(true)
  const [rightIsVisible, setRightIsVisible] = useState(true)
  const bloc = useRef(null)
  const [url, setUrl] = useState('')
  const { data, isLoading, error } = useFetch(url)

  useEffect(() => {
    if (insee !== 0) {
      fetchEphemeride()

      if (jour === 0) {
        setLeftIsVisible(false)
      } else {
        setLeftIsVisible(true)
      }
      if (jour === 14) {
        setRightIsVisible(false)
      } else {
        setRightIsVisible(true)
      }
    }
  }, [insee, jour])

  useEffect(() => {
    if (data && data.city) {
      const infos = data.city
      const ephemeride = data.ephemeride
      setInfos(infos)
      setEphemeride(ephemeride)
      const date = new Date(ephemeride.datetime)
      const dateFormat = date.toLocaleDateString()
      const newEphemeride = { ...ephemeride }
      newEphemeride.datetime = dateFormat
      setEphemeride(newEphemeride)
    }
  }, [data])

  async function fetchEphemeride() {
    // setIsLoading(true)
    const urlBase = 'https://api.meteo-concept.com/api/'
    const token = 'd4caf9a6a50b0fa4ff74f43ecee19bcd175c673b14b2c56aa1668fb67dd62c1e'
    const url = urlBase + `ephemeride/${jour}?token=` + token + '&insee=' + insee
    setUrl(url)
  }

  const handleNext = () => {
    bloc.current.classList.remove('LefttoRight')
    bloc.current.classList.remove('RightToLeft')
    window.requestAnimationFrame(function (time) {
      window.requestAnimationFrame(function (time) {
        bloc.current.classList.add('LefttoRight')
      })
    })
    setJour(jour + 1)
  }
  const handlePrevious = () => {
    bloc.current.classList.remove('RightToLeft')
    bloc.current.classList.remove('LefttoRight')
    window.requestAnimationFrame(function (time) {
      window.requestAnimationFrame(function (time) {
        bloc.current.classList.add('RightToLeft')
      })
    })
    setJour(jour - 1)
  }

  return {
    insee,
    isLoading,
    error,
    infos,
    leftIsVisible,
    rightIsVisible,
    handlePrevious,
    handleNext,
    bloc,
    ephemeride,
  }
}
