import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { getPointDateByUserAllHistory } from '../../services/Users/getPointDateByUserAllHistory'
import { getAllRegisterByMonthService } from '../../services/Admin/getAllRegisterByMonthService'
import { getAllRegisterByMonthServiceTotalHours } from '../../services/Admin/getAllRegisterByMonthServiceTotalHours'

import DateFnsUtils from "@date-io/date-fns";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import localept from 'date-fns/locale/pt-BR'

type personsType = {
    length: number;
    ideletronicPoint: number
    date: Date
    initialTime: string
    finalTime: string
    totalWork: string
}
type totalWork = {
    totalWork: string
}
export default function () {

    let { topicId } = useParams();

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const [totalHours, setTotalHours] = useState<totalWork[] | []>([])
    const getAllRegisterByMonth = async () => {
        const data1 = await getAllRegisterByMonthService({ inicialDate: selectedDate, userId: topicId })
        const data2 = await getAllRegisterByMonthServiceTotalHours({ inicialDate: selectedDate, userId: topicId })
        setAllHistoryRegisters(data1)
        setTotalHours(data2)
    };


    const [allHistoryRegisters, setAllHistoryRegisters] = useState<personsType[] | []>([])
    // const getAllHistoryRegisters = async () => {
    //     const data1 = await getPointDateByUserAllHistory(topicId)
    //     setAllHistoryRegisters(data1)
    // };
    // useEffect(() => {
    //     getAllHistoryRegisters()
    // }, [])


    function convert(str: any) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
    }


    return (
        <>
            <Box display={'flex'} p={2} flexDirection={'column'} alignItems={'center'} >
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={3}>
                    Historico do usuário
                    <Box display={'flex'} gap={2} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} margin={2}>

                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                <DatePicker label={'Mês/Ano'} views={['month', 'year']} value={selectedDate}
                                    onChange={handleDateChange} />
                            </DemoContainer>
                            <Button variant='contained' onClick={getAllRegisterByMonth}>Buscar</Button>
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Data</TableCell>
                                        <TableCell align="center">Entrada</TableCell>
                                        <TableCell align="center">Saida</TableCell>
                                        <TableCell align="center">Total horas</TableCell>
                                        <TableCell align="center">Editar</TableCell>
                                    </TableRow>
                                </TableHead>

                                {totalHours ?
                                    <TableBody>
                                        {allHistoryRegisters?.map((history) => (
                                            <TableRow key={history.ideletronicPoint}>
                                                <TableCell align="center">{history.date ? convert(history.date.toString()) : <>Sem dados de ponto para o usuário</>}</TableCell>
                                                <TableCell align="center">{Number(history.initialTime) == 0 ? <></> : history.initialTime}</TableCell>
                                                <TableCell align="center">{history.finalTime}</TableCell>
                                                <TableCell align="center">{history.totalWork}</TableCell>
                                                <TableCell align="center"><Button><ModeEditIcon /></Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody> : <TableRow> Escolha uma data</TableRow>}
                            </Table>
                        </TableContainer>
                        <Box>
                            Total:{totalHours?.map((total) => (
                                <Box key={total.totalWork} >{total.totalWork}</Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

            </Box>

        </>
    )
}