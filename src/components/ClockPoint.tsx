import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, MenuItem } from '@mui/material';

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      <Box m={4} p={3}>
        <Card sx={{ minWidth: 275 }}>
          <Box p={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <h2>Relógio Digital</h2>
            <h2>{dataAtualFormatada()}</h2>
            <h2>
              {formatTime(time.getHours())}:
              {formatTime(time.getMinutes())}:
              {formatTime(time.getSeconds())}
            </h2>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={3}>
              <div>
                {/* Button to open the dialog */}
                <Button variant="outlined" onClick={() => setIsOpen(true)}>Registrar</Button>

                {/* Dialog */}
                <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                  <form>
                    <DialogTitle>Registrar Ponto</DialogTitle>
                    <DialogContent>
                      <Box display={'flex'} flexDirection={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'}>
                        <h2>{dataAtualFormatada()}</h2>
                        <h2>
                          {formatTime(time.getHours())}:
                          {formatTime(time.getMinutes())}:
                          {formatTime(time.getSeconds())}
                        </h2>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      {/* Buttons */}
                      <Button variant="contained" color="error" onClick={() => setIsOpen(false)}>Cancelar</Button>
                      <Button variant="contained" color="success" type="submit">
                        Registrar
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </div>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default DigitalClock;
