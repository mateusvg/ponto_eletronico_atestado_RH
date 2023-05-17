import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Box, Snackbar, Stack } from '@mui/material';

import { useContext } from 'react';
import { userIdConst } from "../../contexts/UsersId";

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const { userId, setUserId } = useContext(userIdConst);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openAlert, setOpenAlert] = React.useState(false);
    const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    const handleOpenAlert = () => {
        handleClose()
        setOpenAlert(true);
        setTimeout(function () {
            handleCloseAlert()
        }, 4000);
    };

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={3}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={3}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Alterar senha
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Alterar senha</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Para alterar a senha digite sua senha atual:
                        </DialogContentText>
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button onClick={handleOpenAlert}>Alterar</Button>
                    </DialogActions>
                </Dialog>
            </Box>

            {/* alert after register point */}
            <Stack spacing={2} sx={{ width: '100%' }} justifyContent={'center'}>
                <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                        Senha alterada com sucesso <br></br>
                    </Alert>
                </Snackbar>
            </Stack>
        </Box>
    );
}
