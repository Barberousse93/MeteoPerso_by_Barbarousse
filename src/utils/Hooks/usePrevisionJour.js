import { useState } from 'react'

export default function usePrevisionJour(data) {
  const dateISO = new Date(data.data.datetime)
  const dateLocale = dateISO.toLocaleDateString()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleClick = () => {
    setModalIsOpen(true)
  }

  return {
    dateLocale,
    modalIsOpen,
    setModalIsOpen,
    handleClick,
  }
}
