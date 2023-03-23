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
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

//services
import { getAllRegistersUsersStatus } from '../services/Admin/getAllRegistersUsersStatus'
import { deletePersonStatusCertificateId } from '../services/Admin/deletePersonStatusCertificateId'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';

type personsType = {
  idmedicalCertificate: string
  patientName: string
  attachment: any
  patientCpf: string
  fitness: string
}

export default function BasicTable() {

  const [isOpen, setIsOpen] = useState(false);
  const [persons, setPerson] = useState<personsType[] | []>([]);

  useEffect(() => {
    getAllRegistersUsersStatus()
      .then(data => setPerson(data))
  }, [])

  const getAllHistoryRegisters = async () => {
    const data1 = await getAllRegistersUsersStatus()
    setPerson(data1)
  };

  useEffect(() => {
    getAllHistoryRegisters()
  }, [])

  //Method static status color
  const setStatusColorIcon = (Status: string) => {
    if (Status === 'Inapto') {
      return 'error'
    } else {
      return 'success'
    }
  }

  const [nameModal, setNameModal] = useState('')
  const [idModal, setIdModal] = useState('')
  function handleOpenModal(idMedical: any, personName: any) {
    setIdModal(idMedical)
    setNameModal(personName)
    setIsOpen(true)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await deletePersonStatusCertificateId({ idMedical: idModal })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });

    // Close the dialog
    setIsOpen(false);
    getAllHistoryRegisters()
  };

  const handleDownload = (anexo: any) => {
    anexo = anexo.replace('data:image/png;base64,', '')
    const payload = { anexo: anexo }
     //console.log(payload.anexo)
    var a = document.createElement("a"); //Create <a>
    a.href = "data:image/png;base64," + payload.anexo; //Image Base64 Goes here
    a.download = "Image.png"; //File name Here
    a.click(); //Downloaded file
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome Colaborador</TableCell>
              <TableCell>Cpf</TableCell>
              <TableCell>Anexo</TableCell>
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
                <TableCell><Button onClick={() => handleDownload(person.attachment)}><CloudDownloadIcon /></Button></TableCell>
                <TableCell>{person.fitness}</TableCell>
                <TableCell><CircleIcon color={`${setStatusColorIcon(person.fitness)}`} /></TableCell>
                <TableCell><Button><ModeEditIcon /></Button></TableCell>
                <TableCell><Button onClick={() => handleOpenModal(person.idmedicalCertificate, person.patientName)}><DeleteIcon /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* BOX DELETAR */}

      <div>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <form onSubmit={handleSubmit}>
            <Box display={'flex'} flexDirection={'column'} gap={'10px'} margin={3}>
              <DialogTitle>Deseja deletar status ?</DialogTitle>
              <DialogContent>
                {nameModal}
              </DialogContent>
              <Box display={'flex'} flexDirection={'column'} gap={'10px'} margin={3}>
                <DialogActions>
                  {/* Buttons */}
                  <Button variant="contained" color="error" onClick={() => setIsOpen(false)}>Cancelar</Button>
                  <Button variant="contained" color="success" type="submit">
                    Deletar
                  </Button>
                </DialogActions>
              </Box>
            </Box>
          </form>
        </Dialog>
      </div>


    </Box>
  );
}
