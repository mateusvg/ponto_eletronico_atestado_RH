import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogoX from '../assets/img/people.jpeg'
import { mask } from '../utils/MaskFormaterCPF'

import { useNavigate } from 'react-router-dom';

//Service
import { insertNewUser } from '../services/Login/insertNewUser'
import { FormControl, FormLabel, RadioGroup, Radio, Alert, Snackbar, Stack } from '@mui/material';
import { useState } from 'react';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">

            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInSide(props: any) {

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const [user, setUser] = useState('');
    function handleChangeUser(event: any) {
        const { value } = event.target
        console.log(value)
        setUser(value)
    }

    const [cpf, setCPF] = useState('');
    function handleChangeMask(event: any) {
        const { value } = event.target
        setCPF(mask(value))
    }

    const handleSubmitNewUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // await insertNewUser({ user: data.get('user'), password: data.get('password') })
        //     .catch((error) => {
        //         console.error(error);
        //     });

        setOpen(true);
        setTimeout(function () {
            //do what you need here
            navigate('/')
        }, 4000);
    };
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    container justifyContent="center"
                >
                    <Grid container direction="column" justifyContent="center" alignContent={'center'}>
                        <img src={LogoX} alt="Logo" width={"80%"} />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}

                    >
                        <Typography  >Gestão Inteligente</Typography>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <VpnKeyIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Lembrar a senha
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmitNewUser} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="user"
                                label="Usuário"
                                name="user"
                                onChange={handleChangeUser}
                                autoComplete="user"
                                autoFocus
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

                            <Button
                                type="submit"
                                fullWidth
                                color="success"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Lembrar-me
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        {"Voltar"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 2 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {/* alert after register point */}
            <Stack spacing={2} sx={{ width: '100%' }} justifyContent={'center'}>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Um e-mail foi enviado para o usuário  <br></br>
                        {user}
                    </Alert>
                </Snackbar>
            </Stack>
        </ThemeProvider>


    );
}

