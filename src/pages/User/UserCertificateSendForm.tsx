import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Alert, Button, MenuItem, Snackbar, Stack } from '@mui/material';
import { useState } from 'react';
import { postFormUser } from '../../services/Users/postFormUser'
import { useContext } from 'react';
import { userIdConst } from "../../contexts/UsersId";
import { mask } from "../../utils/MaskFormaterCPF"


export default function BasicTextFields() {
    const { userId, setUserId } = useContext(userIdConst);
    const [status, setStatus] = useState('');
    function handleStatusCHange(event: any) {
        const { value } = event.target
        setStatus(value)
    }
    const [postImage, setPostImage] = useState({
        myFile: '',
    });
    // Convert to base64
    const convertToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, myFile: `${base64}` });
    }
    const handleNomePacienteChange = async (e: any) => {
        setNomePaciente(e.target.value)
    }
    const handleNomeMedicoChange = async (e: any) => {
        setNomeMedico(e.target.value)
    }

    function handleCPFChange(event: any) {
        const { value } = event.target
        setCPF(mask(value))
    }


    const [nomePaciente, setNomePaciente] = useState('');
    const [cpf, setCPF] = useState('');
    const [nomeMedico, setNomeMedico] = useState('');
    const [data, setData] = useState('');

    // Post form
    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const postForm = async () => {

            const response = await postFormUser({ nomePaciente: nomePaciente, cpf: cpf, nomeMedico: nomeMedico, data: data, aptidao: status, postImage: postImage, userId: userId })
                .catch((error) => {
                    // Handle the error
                    console.error(error);
                });
            setTimeout(() => {
                setNomeMedico('')
                setNomePaciente('')
                setCPF('')
                setData('')
                setPostImage({myFile: ''})
            }, 100)
        }
        postForm()
    }

    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);

    };
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            display={'flex'} flexDirection={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'}
        >
            Formulário Atestado
            <Box boxShadow={1} display={'flex'} borderRadius={2} flexDirection={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'} p={5}>
                <TextField id="nomePaciente" name={nomePaciente} required label="Nome Paciente" onChange={handleNomePacienteChange} value={nomePaciente} variant="outlined" />
                <TextField id="cpf" name={cpf} label="CPF" required onChange={handleCPFChange} value={cpf} inputProps={{ maxLength: 14 }} variant="outlined" />
                <TextField id="nomeMedico" name={nomeMedico} onChange={handleNomeMedicoChange} value={nomeMedico} label="Nome Médico" variant="outlined" />
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
                        <MenuItem value="Apto">Apto</MenuItem>
                        <MenuItem value="Inapto">Inapto</MenuItem>
                    </TextField>

                </Box>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker onChange={ (e) => handleDataChange(e)} localeText={{ clearButtonLabel: 'Empty', todayButtonLabel: 'Now' }} value={data}/>
                </LocalizationProvider> */}
                <input
                    placeholder='Anexo'
                    name='myFile'
                    type="file"
                    required
                    id=''
                    accept="image/png, image/jpeg"
                    onChange={(e) => handleFileUpload(e)}
                />
            </Box>
            <Button variant="contained" color="success" type="submit" onClick={handleClick}>
                Enviar
            </Button>

            {/* alert after register point */}
            <Stack spacing={2} sx={{ width: '100%' }} justifyContent={'center'}>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Registrado com sucesso!
                    </Alert>
                </Snackbar>
            </Stack>
        </Box>

    );
}
