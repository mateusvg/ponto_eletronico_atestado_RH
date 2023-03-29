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
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';

//services
import { getAllUsers } from '../services/Users/getAllUsers'
import { Box, Button, IconButton, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type personsType = {
  userName: string
  status: string
  cpf: string
  iduser: number
}

export default function BasicTable() {
  const navigate = useNavigate();
  const [persons, setPerson] = useState<personsType[] | []>([]);

  useEffect(() => {
    getAllUsers()
      .then(data => setPerson(data))
  }, [])


  //Search
  const [searchInput, setSearchInput] = useState("")
  const handleChange = (e: any) => {
    e.preventDefault()
    console.log(searchInput)
    setSearchInput(e.target.value)
  }
  if (searchInput.length > 0) {
    persons.filter((data) => {
      console.log(`dados: ${data.userName}`)
      return data.userName.includes(searchInput)
    })
  }

  return (
    <Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} margin={3}>

        <TextField fullWidth label="Procurar Colaborador" id="fullWidth" onChange={handleChange}
          value={searchInput} />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nome Colaborador</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">CPF</TableCell>
              <TableCell align="center">Editar</TableCell>
              <TableCell align="center">Deletar</TableCell>
              <TableCell align="center">Historico Ponto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              persons?.filter(post => {
                if (searchInput === '') {
                  return post;
                } else if (post.userName.toLowerCase().includes(searchInput.toLowerCase())) {
                  return post;
                }
              }).map((person) => (
                
                <TableRow key={person.userName}>
                  <TableCell align="center">{person.userName}</TableCell>
                  <TableCell align="center">{person.status}</TableCell>
                  <TableCell align="center">{person.cpf}</TableCell>
                  <TableCell align="center"><Button><ModeEditIcon /></Button></TableCell>
                  <TableCell align="center"><Button><DeleteIcon /></Button></TableCell>
                  <TableCell align="center"><Button onClick={() => navigate(`/home/user/point/history/${person.iduser}`, {state:{topicId:person.iduser}})}><VisibilityIcon /></Button></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box >
  );
}
