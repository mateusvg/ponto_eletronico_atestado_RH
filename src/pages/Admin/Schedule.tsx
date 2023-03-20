import { Box } from '@mui/material';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
export default function () {
  return (
  <>
  SCHEDULE
  <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>

    <Calendar  locale={'pt'} />
  </Box>
  </>
  )
}