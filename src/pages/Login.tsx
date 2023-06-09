import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LogoX from '../assets/img/people.jpeg'

import { useNavigate } from 'react-router-dom';
//Context
import { useContext, useState } from "react";
import { Login } from "../contexts/Login";
import { PermissionConst } from "../contexts/PermissionVisibility";
import { userIdConst } from '../contexts/UsersId'

//Service
import { getLoginUserUser } from '../services/Login/getLoginUser'

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
    const { login, setLogin } = useContext(Login);
    const { permission, setPermission } = useContext(PermissionConst);
    const { setUserId, setUserName } = useContext(userIdConst)
    const [notUser, setNotUser] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const parsedValue = await getLoginUserUser({ user: data.get('email'), password: data.get('password') })
            const response = await parsedValue[0]?.userName
            const senha = await parsedValue[0]?.userPassword
            const userPermission = await parsedValue[0]?.userPermission
            const userId = await parsedValue[0]?.iduser
            const userName = await parsedValue[0]?.userName
            //User permissions
            if (response === data.get('email') && senha === data.get('password')) {
                if (userPermission == 1) {
                    setPermission(1)
                    navigate('home')
                } else if (userPermission == 2) {
                    setPermission(2)
                    navigate('home/user')
                } else if (userPermission == 3) {
                    setPermission(3)
                    navigate('home/seler')
                }

                setUserId(userId)
                setUserName(userName)
                setLogin(true)
            } else {
                setNotUser("Usuário não cadastrado ou senha inválida")
            }

        } catch (err) {
            console.log(err);
        }
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
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Lembrar-me"
                            />
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                <Typography color={'red'}>{notUser}</Typography>
                            </Box>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            // onClick={() => {handleSubmit}}
                            >
                                Acessar
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/forgot" variant="body2">
                                        Esqueceu a senha?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Não possui uma conta? Cadastrar"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}