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

import { mask } from "../utils/MaskFormaterCPF"
import { phoneMask } from '../utils/MaskPhone';
import {insertNewSchedule} from '../services/Admin/insertNewSchedule'

import SearchUserSchedule from './SeachUserSchedule'

//services
import { getAllUsers } from '../services/Users/getAllUsers'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

type personsType = {
  userName: string
  status: string
  cpf: string
}

export default function BasicTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [persons, setPerson] = useState<personsType[] | []>([]);

  useEffect(() => {
    getAllUsers()
      .then(data => setPerson(data))
  }, [])

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
  const [date, setDate] = useState("");

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = event.target.value;
    const formattedDate = inputDate
      .replace(/\D/g, "") // remove all non-numeric characters
      .replace(/(\d{2})(\d)/, "$1/$2") // add a slash after the first two digits
      .replace(/(\d{2})(\d)/, "$1/$2") // add a slash after the next two digits
      .replace(/(\d{4})\d+?$/, "$1"); // limit the year to four digits

    setDate(formattedDate);
  };

  const [userName, setUserName] =useState();
  const pull_data = (data: any) => {
      setUserName(data);
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data)



    await insertNewSchedule({ userName: userName, cpf: data.get('cpf'), status: data.get('status') })
        .catch((error) => {
            // Handle the error
            console.error(error);
        });

    // Close the dialog
    setIsOpen(false);

  };


  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={1}>
      <Box margin={3}>
        <Button variant="contained" onClick={() => setIsOpen(true)}>Adicionar agendamento</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome Colaborador</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow >
              <TableCell>asd</TableCell>
              <TableCell><Button color='success' variant='contained' size='small'>Confirmado</Button></TableCell>
              <TableCell>ads</TableCell>
              <TableCell><Button><ModeEditIcon /></Button></TableCell>
              <TableCell><Button><DeleteIcon /></Button></TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>






      {/* Dialog */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Adicionar agenda</DialogTitle>
          <DialogContent>

            <Box display={'flex'} flexDirection={'column'} gap={'10px'} margin={3}>

              {/* Name Input */}
              <SearchUserSchedule func={pull_data}/>

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
                name="cpf"
                required
                label="Telefone"
                value={phone}
                inputProps={{ maxLength: 14 }}
                onChange={handlePhoneMask}
                fullWidth
                id="cpf"
              />


              <TextField
                name="date"
                required
                label="dd/mm/yyyy"
                value={date}
                onChange={handleChangeDate}
                fullWidth
                id="date"
                inputProps={{ maxLength: 14 }}
              />
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
    </Box>
  );
}
