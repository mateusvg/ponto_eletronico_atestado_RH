import { Box } from '@mui/material';
import { useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import TableScheduleAdmin from '../../components/TableScheduleAdmin';


export default function () {
  const [value, onChange] = useState(new Date())

  function convert(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }

  let dateToday = convert(value)

  return (
    <>
      < Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={3}>
          Agenda
        </Box>
        <Calendar onChange={onChange} value={value} locale={'pt'} />
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={3}>
          Agendamentos do dia {dateToday}
          <TableScheduleAdmin date={value} />
        </Box>
      </Box>
    </>
  )
}