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
import CircleIcon from '@mui/icons-material/Circle';

//services
import { getAllRegistersUsersStatus } from '../services/Admin/getAllRegistersUsersStatus'
import { Button } from '@mui/material';

type personsType = {
  idmedicalCertificate: string
  patientName: string
  patientCpf: string
  fitness: string
}

export default function BasicTable() {

  const [persons, setPerson] = useState<personsType[] | []>([]);

  useEffect(() => {
    getAllRegistersUsersStatus()          
    .then(data => setPerson(data))
  }, [])



      //Method static status color
    const setStatusColorIcon = (Status: string) => {
        if (Status === 'Inapto') {
            return 'error'
        } else {
            return 'success'
        }
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome Colaborador</TableCell>
            <TableCell>Cpf</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {persons?.map((person) => (
            <TableRow key={person.idmedicalCertificate}>
              <TableCell>{person.patientName}</TableCell>
              <TableCell>{person.patientCpf}</TableCell>
              <TableCell>{person.fitness}</TableCell>
              <TableCell><CircleIcon color={`${setStatusColorIcon(person.fitness)}`} /></TableCell>
              <TableCell><Button><ModeEditIcon/></Button></TableCell>
              <TableCell><Button><DeleteIcon/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
