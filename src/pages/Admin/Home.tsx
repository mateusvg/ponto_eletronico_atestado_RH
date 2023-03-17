import { Box } from '@mui/material'
import Clock from '../../components/Clock'
export default function () {
  return (
    <>
      HOME ADMIN
      <Box sx={{ display: 'flex' }} flexDirection={'row'} justifyContent={'center'}>
        <Clock />
      </Box>

    </>
  )
}