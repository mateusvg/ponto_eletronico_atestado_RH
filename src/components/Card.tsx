import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Clock from './Clock'
import { Button } from '@mui/material';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >

    </Box>
);

export default function BasicCard() {
    return (
        <Box m={4} p={3}>
            <Card sx={{ minWidth: 275 }}>
                <Box p={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Clock />
                    <Button variant="contained">Registrar</Button>
                </Box>
            </Card>
        </Box>
    );
}
