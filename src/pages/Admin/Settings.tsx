import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Box, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Snackbar, Stack } from '@mui/material';

import { useState } from 'react';
import { mask } from "../../utils/MaskFormaterCPF"

import { insertNewUserPerson } from '../../services/Admin/insertUserPerson'

import { useContext } from 'react';
import { userIdConst } from "../../contexts/UsersId";


export default function FormDialog() {


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
        await insertNewUserPerson({ userName: data.get('name'), cpf: data.get('cpf'), status: data.get('status'), userPermission: radio })
            .catch((error) => {
                // Handle the error
                console.error(error);
            });

        setIsOpen(false)
        setOpen(true);
        setName('');
        setStatus('');
        setCPF('');
    };

    const [radio, setRadio] = useState('');
    function handleChangeRadio(event: any) {
        const { value } = event.target
        console.log(value)
        setRadio(value)
    }

    //ALERT
    const [open, setOpen] = React.useState(false);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
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
                                    label="Nome"
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

                                <FormControl >
                                    <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="1"
                                        name="radio-buttons-group"
                                        value={radio}
                                        onChange={handleChangeRadio}
                                    >
                                        <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                                            <FormControlLabel value="2" control={<Radio />} label="Colaborador" />
                                            <FormControlLabel value="3" control={<Radio />} label="Vendedor" />
                                        </Box>
                                    </RadioGroup>
                                </FormControl>
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


                {/* Dialog */}
                <Dialog open={isOpenAlterPass} onClose={() => setIsOpenAlterPass(false)}>
                    <form >
                        <DialogTitle>Alterar senha</DialogTitle>
                        <DialogContent>

                            <Box display={'flex'} flexDirection={'column'} gap={'10px'} margin={3}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Senha atual"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Nova senha"
                                    type="password"
                                    id="passwordNew"
                                    autoComplete="current-password"
                                />

                            </Box>
                        </DialogContent>
                        <DialogActions>
                            {/* Buttons */}
                            <Button variant="contained" color="error" onClick={() => setIsOpenAlterPass(false)}>Cancelar</Button>
                            <Button variant="contained" color="success" onClick={() => setIsOpenAlterPass(false)}>
                                Alterar
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>




                {/* alert colaborador registrado */}
                <Stack spacing={2} sx={{ width: '100%' }} justifyContent={'center'}>
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Colaborador registrado com sucesso!
                        </Alert>
                    </Snackbar>
                </Stack>


            </div>
        </Box >
    );
}
