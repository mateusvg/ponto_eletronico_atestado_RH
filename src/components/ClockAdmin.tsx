import { Box, Card, DialogContent } from '@mui/material';
import React, { useState, useEffect } from 'react';

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  });

  const tick = () => {
    setTime(new Date());
  };

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  function dataAtualFormatada() {
    var data = new Date(),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  }


  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <Box display={'flex'} p={2} flexDirection={'column'} alignItems={'center'} >
          <h2>Relógio Digital</h2>
          <h2>{dataAtualFormatada()}</h2>
          <h2>
            {formatTime(time.getHours())}:
            {formatTime(time.getMinutes())}:
            {formatTime(time.getSeconds())}
          </h2>
        </Box>
      </Card>

    </>
  );
};

export default DigitalClock;
