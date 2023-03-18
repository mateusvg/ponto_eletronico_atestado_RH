import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { mask } from "../../utils/MaskFormaterCPF"
import { useState } from 'react';
import { insertNewUserPerson } from '../../services/Admin/insertUserPerson'

import { useContext } from 'react';
import { userIdConst } from "../../contexts/UsersId";

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [openSecond, setOpenSecond] = React.useState(false);
    const { userId, setUserId } = useContext(userIdConst);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenSecond = () => {
        setOpenSecond(true);
        setCPF('')
    };

    const handleCloseSecond = () => {
        setOpenSecond(false);
        setCPF('')
    };

    const [cpf, setCPF] = useState('');
    //CPF mask
    function handleChangeMask(event: any) {
        const { value } = event.target
        setCPF(mask(value))
    }

    const [age, setAge] = useState('');
    function handleChange(event: any) {
        const { value } = event.target
        setAge(value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleCloseSecond()
        const data = new FormData(event.currentTarget);
        console.log(data.get('name'))
        try {
            insertNewUserPerson({ user: data.get('name'), password: data.get('cpf'), status: data.get('demo-select-small') })
            handleCloseSecond()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={3}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={3}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Alterar senha {userId}
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Alterar senha admin </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Para alterar sua senha atual:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Usuário"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Senha Atual"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nova Senha"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" onClick={handleClose}>Cancelar</Button>
                        <Button color="success" onClick={handleClose}>Alterar</Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Button variant="outlined" onClick={handleClickOpenSecond}>
                Adicionar Colaborador
            </Button>
            <Dialog open={openSecond} onClose={handleCloseSecond}>
                <DialogTitle>Adicionar Colaborador</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            Adicionar novo colaborador ao sistema
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="name"
                            label="Nome"
                            type="name"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="cpf"
                            label="CPF"
                            name="cpf"
                            type="name"
                            onChange={handleChangeMask}
                            value={cpf}
                            inputProps={{ maxLength: 14 }}
                            fullWidth
                            variant="standard"
                        />
                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </Box>
                    </DialogContent>
                </form>
                <DialogActions>
                    <Button color="error" variant="contained" onClick={handleCloseSecond}>Cancelar</Button>
                    <Button color="success" type="submit" variant="contained"  >Cadastrar</Button>
                    <input type="submit" hidden />
                </DialogActions>
            </Dialog>

        </Box>
    );
}
