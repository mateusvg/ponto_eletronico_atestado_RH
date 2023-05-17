import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';


import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { mask } from "../utils/MaskFormaterCPF"
import { phoneMask } from '../utils/MaskPhone';

import SearchUserSchedule from './SeachUserSchedule'

//services
import { getAllUsers } from '../services/Users/getAllUsers'
import { insertNewSchedule } from '../services/Admin//Schedule/insertNewSchedule'
import { getAllSchedules } from '../services/Admin/Schedule/getAllSchedules'
import { deleteScheduleApointmentByAdmin } from '../services/Admin/Schedule/deleteScheduleApointmentByAdmin'
import { updateStatusScheduleByAdmin } from '../services/Admin/Schedule/updateStatusScheduleByAdmin'


type personsType = {
  userName: string
  status: string
  cpf: string
}

type sheduleType = {
  userName: string
  idschedule: number
  userCpf: string
  status: string
  userPhone: string
  schaduleDate: string
}

export default function BasicTable() {



  const [valueDate, onChange] = useState<Date | null>(new Date())

  function convert(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }
  let dateToday = convert(valueDate)



  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);

  const [persons, setPerson] = useState<personsType[] | []>([]);

  const [shedules, setShedules] = useState<sheduleType[] | []>([]);

  const getAllHistoryRegisters = async () => {
    const data1 = await getAllUsers(valueDate)
    setPerson(data1)
    const data2 = await getAllSchedules(valueDate?.toISOString().slice(0, 10))
    setShedules(data2)
  };

  useEffect(() => {
    getAllHistoryRegisters()
  }, [valueDate])


  const [cpf, setCPF] = useState('');
  function handleChangeMask(event: any) {
    const { value } = event.target
    setCPF(mask(value))
  }
  const [phone, setPhone] = useState('');
  function handlePhoneMask(event: any) {
    const { value } = event.target
    setPhone(phoneMask(value))
  }


  const [userName, setUserName] = useState();
  const pull_data = (data: any) => {
    setUserName(data);
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await insertNewSchedule({ userName: userName, cpf: data.get('cpf'), status: data.get('status'), data: selectedDate, telefone: data.get('phone') })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });

    // Close the dialog
    setIsOpen(false);
    setCPF('')
    setPhone('')
    getAllHistoryRegisters()
  }

  const handleSubmitEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await updateStatusScheduleByAdmin({ status: status, id: idEdit })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });

    // // Close the dialog
    setIsOpenModalEdit(false);
    // setCPF('')
    // setPhone('')
    getAllHistoryRegisters()
  }

  const handleSubmitDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await deleteScheduleApointmentByAdmin({ scheduleId: idModal })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });

    // // Close the dialog
    setIsOpenModalDelete(false);
    // setCPF('')
    // setPhone('')
    getAllHistoryRegisters()
  }

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };


  //DeleteModal
  const [idModal, setIdModal] = useState('')
  function handleOpenModalDelete(idschedule: any) {
    setIdModal(idschedule)
    setIsOpenModalDelete(true)
  }

  //EditModal
  const [idEdit, setIdEdit] = useState('')
  function handleOpenModalEdit(idschedule: any) {
    setIdEdit(idschedule)
    setIsOpenModalEdit(true)
  }

  const [status, setStatus] = useState('');
  function handleStatusChange(event: any) {
    const { value } = event.target
    setStatus(value)
  }


  const setStatusColorIcon = (Status: string) => {
    if (Status === 'Agendado') {
      return 'warning'
    } else if (Status === 'Cancelado') {
      return 'error'
    }
    else {
      return 'success'
    }
  }


  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={1}>
      Agendamentos do dia {dateToday}
      <Calendar onChange={onChange} value={valueDate} locale={'pt'} />
      <Box margin={3}>
        <Button variant="contained" onClick={() => setIsOpen(true)}>Adicionar agendamento</Button>
      </Box>
      {shedules.length > 0 ?
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome Colaborador</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Deletar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shedules?.map((shedule) => (
                <TableRow key={shedule.idschedule} >
                  <TableCell>{shedule.userName}</TableCell>
                  <TableCell>{shedule.userPhone}</TableCell>
                  <TableCell>{shedule.userCpf}</TableCell>
                  <TableCell><Button variant='contained' size='small' color={`${setStatusColorIcon(shedule.status)}`}>{shedule.status}</Button></TableCell>
                  <TableCell><Button onClick={() => handleOpenModalEdit(shedule.idschedule)}><ModeEditIcon /></Button></TableCell>
                  <TableCell><Button onClick={() => handleOpenModalDelete(shedule.idschedule)}><DeleteIcon /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        : <> <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome Colaborador</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Deletar</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>

          <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} margin={4} >
            Sem agendamentos
          </Box>
        </>}




      {/* Dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Adicionar agenda</DialogTitle>
          <DialogContent>

            <Box display={'flex'} flexDirection={'column'} gap={'10px'} margin={3}>

              {/* Name Input */}
              <SearchUserSchedule func={pull_data} />

              {/* CPF Input */}
              <TextField
                name="cpf"
                required
                label="CPF"
                value={cpf}
                inputProps={{ maxLength: 14 }}
                onChange={handleChangeMask}
                fullWidth
                id="cpf"
              />

              {/* telefone Input */}
              <TextField
                name="phone"
                required
                label="Telefone"
                value={phone}
                inputProps={{ maxLength: 14 }}
                onChange={handlePhoneMask}
                fullWidth
                id="phone"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Selecione a data"
                    value={selectedDate}
                    onChange={handleDateChange} />
                </DemoContainer>
              </LocalizationProvider>


            </Box>
          </DialogContent>
          <DialogActions>
            {/* Buttons */}
            <Button variant="contained" color="error" onClick={() => setIsOpen(false)}>Cancelar</Button>
            <Button variant="contained" color="success" type="submit">
              Enviar
            </Button>
          </DialogActions>
        </form>
      </Dialog>


      {/* BOX DELETAR */}
      <div>
        <Dialog open={isOpenModalDelete} onClose={() => setIsOpenModalDelete(false)}>
          <form onSubmit={handleSubmitDelete}>
            <Box display={'flex'} flexDirection={'column'} gap={'10px'} margin={3}>
              <DialogTitle>Deseja deletar agendamento ?</DialogTitle>
              <DialogContent>
                {idModal}
              </DialogContent>
              <Box display={'flex'} flexDirection={'column'} gap={'10px'} margin={3}>
                <DialogActions>
                  {/* Buttons */}
                  <Button variant="contained" color="error" onClick={() => setIsOpenModalDelete(false)}>Cancelar</Button>
                  <Button variant="contained" color="success" type="submit">
                    Deletar
                  </Button>
                </DialogActions>
              </Box>
            </Box>
          </form>
        </Dialog>
      </div>




      {/* MODAL EDIT */}
      <Dialog open={isOpenModalEdit} onClose={() => setIsOpenModalEdit(false)}>
        <form onSubmit={handleSubmitEdit}>
          <DialogTitle>Editar agendamento </DialogTitle>
          <DialogContent>
            <Box display={'flex'} flexDirection={'column'} gap={'10px'} margin={3}>

              <TextField
                select
                fullWidth
                name="status"
                label="Status"
                id="status"
                value={status}
                onChange={handleStatusChange}

              >
                <MenuItem value="Agendado">Agendado</MenuItem>
                <MenuItem value="Cancelado">Cancelado</MenuItem>
                <MenuItem value="Confirmado">Confirmado</MenuItem>
              </TextField>


            </Box>
          </DialogContent>
          <DialogActions>
            {/* Buttons */}
            <Button variant="contained" color="error" onClick={() => setIsOpenModalEdit(false)}>Cancelar</Button>
            <Button variant="contained" color="success" type="submit">
              Enviar
            </Button>
          </DialogActions>
        </form>
      </Dialog>



    </Box>
  );
}
