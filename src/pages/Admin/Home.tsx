import { Box } from '@mui/material'
import Clock from '../../components/ClockAdmin'
export default function () {
  return (
    <>
      <Box display={'flex'} p={2} flexDirection={'column'} alignItems={'center'} >
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={3}>
          Home Admin
        </Box>
        <Clock />
      </Box>

    </>
  )
}