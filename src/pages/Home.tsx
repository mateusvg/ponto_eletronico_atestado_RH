import { Box } from '@mui/material'
import Card from '../components/Card'
export default function () {
  return (
    <>
      Ponto
      <Box sx={{ display: 'flex' }} flexDirection={'row'} justifyContent={'center'}>
        <Card />
      </Box>

    </>
  )
}