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


    const [radio, setRadio] = useState('');
    function handleChangeRadio(event: any) {
        const { value } = event.target
        console.log(value)
        setRadio(value)
    }

    const handleSubmitNewUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        await insertNewUser({ user: data.get('email'), password: data.get('password'), radio: radio })
            .catch((error) => {
                console.error(error);
            });

        setOpen(true);
        setTimeout(function(){
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
                            CADASTRAR
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmitNewUser} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Usuário"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <Box display={'flex'} margin={1} flexDirection={'row'} justifyContent={'center'} >
                                <Typography variant='h5'>Escolha o tipo de conta:</Typography>
                            </Box>

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
                                        <FormControlLabel value="1" control={<Radio />} label="Administrador" />
                                        <FormControlLabel value="2" control={<Radio />} label="Colaborador" />
                                        <FormControlLabel value="3" control={<Radio />} label="Vendedor" />
                                    </Box>
                                </RadioGroup>
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                color="success"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Cadastrar
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
                        Usuário cadastrado com sucesso <br></br>
                        Aguarde aprovação
                    </Alert>
                </Snackbar>
            </Stack>
        </ThemeProvider>


    );
}

