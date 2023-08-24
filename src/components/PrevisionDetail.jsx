import React from 'react'
import Modal from '@mui/material/Modal'
// import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

const PaperStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'primary',
  border: '2px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  padding: 10,
}

function PrevisionDetail(props) {
  console.log(props)
  const dateISO = new Date(props.data.datetime)
  const dateLocale = dateISO.toLocaleDateString()

  const handleClose = () => {
    props.setModalIsOpen(false)
  }
  return (
    <Modal open={props.modalIsOpen} onClose={handleClose}>
      <Paper style={PaperStyle}>
        <div>
          {dateLocale}
          <br />
          {props.data.day} {props.data.insee}{' '}
        </div>
        <Button onClick={() => props.setModalIsOpen(false)} variant='contained'>
          FERMER
        </Button>
      </Paper>
    </Modal>
  )
}

export default PrevisionDetail
