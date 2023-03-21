import { Box } from '@mui/material'
import Clock from '../../components/ClockAdmin'
export default function () {
  return (
    <>
      <Box display={'flex'} p={2} flexDirection={'column'} alignItems={'center'} >
        ADMIN
        <Clock />
      </Box>

    </>
  )
}