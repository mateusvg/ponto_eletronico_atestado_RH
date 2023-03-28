import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle';
import { useState, useEffect } from 'react'
import { getAllStatusCertificate } from '../../services/Users/getAllStatusCertificate'

import { useContext } from 'react';
import { userIdConst } from "../../contexts/UsersId";

type personsType = {
    idmedicalCertificate: string
    patientName: string
    patientCpf: string
    fitness: string
    status: string
}

export default function () {
    //Method static status color
    const setStatusColorIcon = (Status: string) => {
        if (Status === 'Em processamento') {
            return 'primary'
        } else if (Status === 'Aprovado'){
            return 'success'
        } else{
            return 'error'
        }
    }
    const [persons, setPerson] = useState<personsType[] | []>([]);
    const { userId } = useContext(userIdConst);
    useEffect(() => {
        getAllStatusCertificate(userId)
            .then(data => setPerson(data))
    }, [])

    return (

        <Box display={'flex'} flexDirection={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'} p={2}>
            Status de Atestados enviados

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome Colaborador</TableCell>
                            <TableCell>Cpf</TableCell>
                            <TableCell>Aptidão</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons?.map((person) => (
                            <TableRow key={person.idmedicalCertificate}>
                                <TableCell>{person.patientName}</TableCell>
                                <TableCell>{person.patientCpf}</TableCell>
                                <TableCell>{person.fitness}</TableCell>
                                <TableCell>{person.status}</TableCell>
                                <TableCell><CircleIcon color={`${setStatusColorIcon(person.status)}`} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}