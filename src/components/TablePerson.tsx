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

//services
import { getAllUsers } from '../services/Users/getAllUsers'
import { Button } from '@mui/material';

type personsType = {
  userName: string
  status: string
  cpf: string
}

export default function BasicTable() {

  const [persons, setPerson] = useState<personsType[] | []>([]);

  useEffect(() => {
    getAllUsers()          
    .then(data => setPerson(data))
  }, [])

  return (
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
          {persons.map((person) => (
            <TableRow key={person.userName}>
              <TableCell>{person.userName}</TableCell>
              <TableCell>{person.status}</TableCell>
              <TableCell>{person.cpf}</TableCell>
              <TableCell><Button><ModeEditIcon/></Button></TableCell>
              <TableCell><Button><DeleteIcon/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
