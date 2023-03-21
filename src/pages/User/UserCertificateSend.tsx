import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, MenuItem } from '@mui/material';
import { useState } from 'react';
import { postFormUser } from '../../services/Users/postFormUser'


export default function BasicTextFields() {
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
    const handleCPFChange = async (e: any) => {
        setCPF(e.target.value)
    }
    const handleDataChange = async (e: any) => {
        setData(e.target.value)
    }

    const [nomePaciente, setNomePaciente] = useState('');
    const [cpf, setCPF] = useState('');
    const [nomeMedico, setNomeMedico] = useState('');
    const [data, setData] = useState('');

    // Post form
    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const postForm = async () => {
            try {
                await postFormUser({ nomePaciente: nomePaciente, cpf: cpf, nomeMedico: nomeMedico, data: data, aptidao: status, postImage: postImage })

            } catch (err) {
                console.log(err);
            }
        }
        postForm()
        setNomeMedico('')
        setNomePaciente('')
        setCPF('')
        setData('')
        setPostImage({ myFile: '' })
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            display={'flex'} flexDirection={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'}
        >
            Formulário Atestado
            <Box boxShadow={1} display={'flex'} borderRadius={2} flexDirection={'column'} gap={'10px'} justifyContent={'center'} alignItems={'center'} p={5}>
                <TextField id="nomePaciente" name={nomePaciente}  label="Nome Paciente" onChange={ (e) => handleNomePacienteChange(e)} variant="outlined" />
                <TextField id="cpf" name={cpf} label="CPF" onChange={ (e) => handleCPFChange(e)} variant="outlined" />
                <TextField id="nomeMedico"  name={nomeMedico} onChange={ (e) => handleNomeMedicoChange(e)} label="Nome Médico" variant="outlined" />
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
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker onChange={ (e) => handleDataChange(e)} localeText={{ clearButtonLabel: 'Empty', todayButtonLabel: 'Now' }} value={data}/>
                </LocalizationProvider>
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
            <Button variant="contained" color="success" type="submit" >
                Enviar
            </Button>
        </Box>

    );
}
