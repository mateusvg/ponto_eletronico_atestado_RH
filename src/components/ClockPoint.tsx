import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

import { useContext } from 'react';
import { userIdConst } from "../contexts/UsersId";
//Services
import { insertTimePointUser } from '../services/Users/insertTimePointUser'
import { insertTimePointUserExit } from '../services/Users/insertTimePointUserExit'
import { getUserPointByDate } from '../services/Users/getUserPointByDate'

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

type personsType = {
  ideletronicPoint: number
  date: Date
  initialTime: string
  finalTime: string
  totalWork: string
  todayEnter: boolean
  finishWork:boolean
}

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const timeBRL = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }).split(',')[1]

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
  const { userId } = useContext(userIdConst);

  const [registerUserToday, setRegisterUserToday] = useState<personsType[] | []>([])

  const getAllHistoryRegisters = async () => {
    const data1 = await getUserPointByDate(userId)
    setRegisterUserToday(data1)
  };

  useEffect(() => {
    getAllHistoryRegisters()
  }, [])


  // Define a function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let newRegister = registerUserToday.map((key) => (key.todayEnter))
    let idEletronicPointMap = registerUserToday.map((key) => (key.ideletronicPoint))

    if (Number(newRegister) === 0) {
      await insertTimePointUser({ userId: userId, time: timeBRL, date: time })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    }
    if (Number(newRegister) === 1) {
      await insertTimePointUserExit({ idEletronicPoint: idEletronicPointMap, finalTime: timeBRL })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    }

    // Close the dialog
    setIsOpen(false);
  };


  //TOAST-STACK BAR
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
    getAllHistoryRegisters()
  };
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    getAllHistoryRegisters()
  };

  //Get AllPoint from USER by date
  useEffect(() => {
    getUserPointByDate(userId)
  }, [])

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Card sx={{ minWidth: 275 }}>
          <Box display={'flex'} p={2} flexDirection={'column'} alignItems={'center'} >
            <h2>Relógio Digital</h2>
            <h2>{dataAtualFormatada()}</h2>
            <h2>
              {formatTime(time.getHours())}:
              {formatTime(time.getMinutes())}:
              {formatTime(time.getSeconds())}
            </h2>
            <Box  >
              <div>
                {/* Button to open the dialog */}
                {registerUserToday.map(history => {
                  return Number(history.finishWork) != 0 ? <>Hora do descanço</> :
                    <Button variant="outlined" onClick={() => setIsOpen(true)}>Registrar</Button>  
                })}

                {/* Dialog */}
                <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                  <form onSubmit={handleSubmit}>
                    <DialogTitle>Deseja registrar o ponto?</DialogTitle>
                    <Box display={'flex'} flexDirection={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'}>
                      <DialogContent>
                        <h2>{dataAtualFormatada()}</h2>
                        <h2>
                          {formatTime(time.getHours())}:
                          {formatTime(time.getMinutes())}:
                          {formatTime(time.getSeconds())}
                        </h2>
                      </DialogContent>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'}>
                      <DialogActions>

                        {/* Buttons */}
                        <Button variant="contained" color="error" onClick={() => setIsOpen(false)}>Cancelar</Button>

                        {registerUserToday.map(history => {
                          return Number(history.todayEnter) == 1 ?
                            <Button variant="contained" color="success" type="submit" onClick={handleClick}>
                              Registrar Saida
                            </Button> : <Button variant="contained" color="success" type="submit" onClick={handleClick}>
                              Registrar Entrada
                            </Button>
                        })}
                      </DialogActions>
                    </Box>
                  </form>
                </Dialog>
              </div>
            </Box>
          </Box>
        </Card>

        {/* Cards inferior */}
        <Box display={'flex'} flexDirection={'row'} gap={'10px'} justifyContent={'center'} alignItems={'center'} m={1} p={3}>
          <Card sx={{ minWidth: 275 }} style={{ backgroundColor: "#C6DEEC" }}>
            <Box p={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
              <h2>Entrada</h2>
              {registerUserToday.map(history => {

                return Number(history.todayEnter) == 1 ?
                  <h2 key={history.ideletronicPoint}>{history.initialTime}</h2> :
                  <h3>Sem registros</h3>
              })}
            </Box>
          </Card>
          <Card sx={{ minWidth: 275 }} style={{ backgroundColor: "#C6DEEC" }}>
            <Box p={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
              <h2>Saida</h2>
              {registerUserToday.map(history => {

                return history.finalTime === null ?

                  <h3>Sem registros</h3> : <h2 key={history.ideletronicPoint}>{history.finalTime}</h2>
              })}
            </Box>
          </Card>
        </Box>

        {/* alert after register point */}
        <Stack spacing={2} sx={{ width: '100%' }} justifyContent={'center'}>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Registrado com sucesso!
            </Alert>
          </Snackbar>
        </Stack>

      </Box>
    </>
  );
};

export default DigitalClock;
