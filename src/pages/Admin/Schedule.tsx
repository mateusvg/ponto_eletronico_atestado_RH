import { Box } from '@mui/material';
import { useState } from 'react';

import TableScheduleAdmin from '../../components/TableScheduleAdmin';


export default function () {

  return (
    <>
      < Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={3}>
          Agenda
        </Box>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={3}>
          <TableScheduleAdmin  />
        </Box>
      </Box>
    </>
  )
}