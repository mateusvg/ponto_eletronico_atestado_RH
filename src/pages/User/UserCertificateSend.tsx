import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, MenuItem } from '@mui/material';
import { useState } from 'react';

export default function BasicTextFields() {
    const [status, setStatus] = useState('');
    function handleStatusCHange(event: any) {
        const { value } = event.target
        setStatus(value)
    }
    return (
        <Box
            component="form"
            display={'flex'} flexDirection={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'}
        >
        Formulário Atestado
            <Box boxShadow={1} display={'flex'} borderRadius={2} flexDirection={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'} p={5}>
            <TextField id="outlined-basic" label="Nome Paciente" variant="outlined" />
            <TextField id="outlined-basic" label="CPF" variant="outlined" />
            <TextField id="outlined-basic" label="Nome Médico" variant="outlined" />
            <TextField id="outlined-basic" label="Nome Médico" variant="outlined" />
            {/* Dropdown */}
            <Box width={210}>

                <TextField
                    fullWidth
                    select
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
            </LocalizationProvider>
            <input
            style={{marginBottom:20}}
            name='myFile'
            type="file"
            required
            id=''
            accept="image/png, image/jpeg"
            />
            </Box>
            <Button variant="contained" color="success" type="submit" >
                Enviar
            </Button>
        </Box>

    );
}
