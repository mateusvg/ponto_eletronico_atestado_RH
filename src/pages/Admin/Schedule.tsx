import { Box } from '@mui/material';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
export default function () {
  return (
    <>
      < Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={3}>
        Agenda
        </Box>
        <Calendar locale={'pt'} />
      </Box>
    </>
  )
}