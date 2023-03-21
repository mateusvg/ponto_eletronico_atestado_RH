import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
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
}

export default function () {
    //Method static status color
    const setStatusColorIcon = (Status: string) => {
        if (Status === 'Inapto') {
            return 'error'
        } else {
            return 'success'
        }
    }
    const [persons, setPerson] = useState<personsType[] | []>([]);
    const { userId } = useContext(userIdConst);
    useEffect(() => {
        getAllStatusCertificate(userId)
            .then(data => setPerson(data))
    }, [])

    return (
        <>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome Colaborador</TableCell>
                            <TableCell>Cpf</TableCell>
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
                                <TableCell><CircleIcon color={`${setStatusColorIcon(person.fitness)}`} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}