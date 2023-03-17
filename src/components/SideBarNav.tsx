import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ProfileIcon from './ProfileIcon'

import { useNavigate } from 'react-router-dom';


import PagesRoute from '../Routes';

import SettingsIcon from '@mui/icons-material/Settings';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';

import PersonIcon from '@mui/icons-material/Person';
import Assessment from '@mui/icons-material/Assessment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryIcon from '@mui/icons-material/History';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { Grid } from '@mui/material';


import { useContext } from "react";
import { PermissionConst } from "../contexts/PermissionVisibility";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { permission, setPermission } = useContext(PermissionConst);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Ponto Eletrônico
                    </Typography>
                    <Grid container justifyContent="flex-end">

                        <ProfileIcon />
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>

                    <ListItem disablePadding sx={{ display: 'block' }}>

                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                onClick={() => navigate('/home')}
                            >
                                <AccessAlarmsIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }} onClick={() => navigate('/home')}>Ponto</ListItemText>
                        </ListItemButton>

                        {permission == 1 ? <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                onClick={() => navigate('/home/point')}
                            >

                                <CalendarMonthIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }} onClick={() => navigate('/home/point')}>Agendamento</ListItemText>
                        </ListItemButton> : <></>}


                        {permission == 1 ?
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                    onClick={() => navigate('/home/person')}
                                >
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText sx={{ opacity: open ? 1 : 0 }} onClick={() => navigate('/home/person')}>Colaboradores</ListItemText>
                            </ListItemButton> : <></>}

                        {permission == 1 ? <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                onClick={() => navigate('/home/certificate')}
                            >
                                <LocalHospitalIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }} onClick={() => navigate('/home/certificate')}>Atestado</ListItemText>
                        </ListItemButton> : <></>}

                        {permission == 1 ?
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                    onClick={() => navigate('/home/reports')}
                                >
                                    <Assessment />
                                </ListItemIcon>
                                <ListItemText sx={{ opacity: open ? 1 : 0 }} onClick={() => navigate('/home/reports')}>Relatórios</ListItemText>
                            </ListItemButton> : <></>}

                        {/* MENU USUARIO */}
                        {permission == 2 ? <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                onClick={() => navigate('/home/user/history')}
                            >
                                <HistoryIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }} onClick={() => navigate('/home/user/history')}>Historico Ponto</ListItemText>
                        </ListItemButton> : <></>}

                        {permission == 2 ? <Divider /> : <></>}
                        
                        {permission == 2 ? <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                onClick={() => navigate('/home/user/certificate')}
                            >
                                <LocalHospitalIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }} onClick={() => navigate('/home/user/certificate')}>Status Atestado</ListItemText>
                        </ListItemButton> : <></>}

                        {permission == 2 ? <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                onClick={() => navigate('/home/user/certificate/send')}
                            >
                                <AddAlertIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }} onClick={() => navigate('/home/user/certificate/send')}>Enviar Atestado</ListItemText>
                        </ListItemButton> : <></>}
                    </ListItem>

                </List>

                <Divider />

                <List>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        {permission == 1 ? <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                onClick={() => navigate('/home/settings')}
                            >
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }} onClick={() => navigate('/home/settings')}>Configurações</ListItemText>
                        </ListItemButton> : <></>}


                        {permission == 2 ? <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                onClick={() => navigate('/home/settings/user')}
                            >

                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }} onClick={() => navigate('/home/settings/user')}>Ccnfigurações</ListItemText>
                        </ListItemButton> : <></>}
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <PagesRoute />
            </Box>
        </Box>
    );
}
