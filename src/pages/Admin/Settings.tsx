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

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [openSecond, setOpenSecond] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenSecond = () => {
        setOpenSecond(true);
    };

    const handleCloseSecond = () => {
        setOpenSecond(false);
    };

    const [cpf, setCPF] = useState('');
    //CPF mask
    function handleChangeMask(event: any) {
        const { value } = event.target
        setCPF(mask(value))
    }
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={3}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={3}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Alterar senha
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </Box>


            <Button variant="outlined" onClick={handleClickOpenSecond}>
                Adicionar Colaborador
            </Button>
            <Dialog open={openSecond} onClose={handleCloseSecond}>
                <DialogTitle>Adicionar Colaborador</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Adicionar novo colaborador ao sistema
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome"
                        type="name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="CPF"
                        type="name"
                        onChange={handleChangeMask}
                        value={cpf}
                        inputProps={{ maxLength: 14 }}
                        fullWidth
                        variant="standard"
                    />
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <InputLabel id="demo-select-small">Status</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small">
                            <MenuItem value={10}>Ativo</MenuItem>
                            <MenuItem value={20}>Inativo</MenuItem>
                        </Select>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleCloseSecond}>Cancelar</Button>
                    <Button color="success" onClick={handleCloseSecond}>Cadastrar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
