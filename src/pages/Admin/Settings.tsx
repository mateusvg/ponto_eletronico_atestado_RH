import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, MenuItem } from '@mui/material';

import { useState } from 'react';
import { mask } from "../../utils/MaskFormaterCPF"

import { insertNewUserPerson } from '../../services/Admin/insertUserPerson'

import { useContext } from 'react';
import { userIdConst } from "../../contexts/UsersId";


export default function FormDialog() {
    // Define state variables for the form data and dialog visibility

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAlterPass, setIsOpenAlterPass] = useState(false)

    //CPF mask
    const [cpf, setCPF] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    function handleChangeMask(event: any) {
        const { value } = event.target
        setCPF(mask(value))
    }
    function handleNameChange(event: any) {
        const { value } = event.target
        setName(value)
    }
    function handleStatusCHange(event: any) {
        const { value } = event.target
        setStatus(value)
    }

    // Define a function to handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await insertNewUserPerson({ userName: data.get('name'), cpf: data.get('cpf'), status: data.get('status') })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });

        // Close the dialog
        setIsOpen(false);
        setName('');
        setStatus('');
        setCPF('');
    };



    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={4}>
                Configurações
            </Box>
            <div>
                {/* Button to open the dialog */}
                <Box boxShadow={1} borderRadius={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'20px'} padding={4}>
                    <Button variant="outlined" onClick={() => setIsOpen(true)}>Adicionar colaborador</Button>
                    <Button variant="outlined" onClick={() => setIsOpenAlterPass(true)}>Alterar senha</Button>
                </Box>

                {/* Dialog */}
                <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Adicionar novo colaborador</DialogTitle>
                        <DialogContent>

                            <Box display={'flex'} flexDirection={'column'} gap={'10px'} margin={3}>

                                {/* Name Input */}
                                <TextField
                                    name="name"
                                    required
                                    label="name"
                                    fullWidth
                                    id="name"
                                    value={name}
                                    onChange={handleNameChange}
                                />

                                {/* CPF Input */}
                                <TextField
                                    name="cpf"
                                    required
                                    label="CPF"
                                    fullWidth
                                    id="cpf"
                                    value={cpf}
                                    inputProps={{ maxLength: 14 }}
                                    onChange={handleChangeMask}
                                />
                                {/* Dropdown */}
                                <TextField
                                    select
                                    fullWidth
                                    name="status"
                                    label="Status"
                                    id="status"
                                    value={status}
                                    onChange={handleStatusCHange}

                                >
                                    <MenuItem value="Ativo">Ativo</MenuItem>
                                    <MenuItem value="Inativo">Inativo</MenuItem>
                                </TextField>
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
            </div>
        </Box >
    );
}
