import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPointDateByUserAllHistory } from '../../services/Users/getPointDateByUserAllHistory'


type personsType = {
    ideletronicPoint: number
    date: Date
    initialTime: string
    finalTime: string
    totalWork: string
}
export default function () {

    const [allHistoryRegisters, setAllHistoryRegisters] = useState<personsType[] | []>([])
    let { topicId } = useParams();

    const getAllHistoryRegisters = async () => {
        const data1 = await getPointDateByUserAllHistory(topicId)
        setAllHistoryRegisters(data1)
    };
    useEffect(() => {
        getAllHistoryRegisters()
    }, [])


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
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Entrada</TableCell>
                                        <TableCell>Saida</TableCell>
                                        <TableCell>Total horas</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allHistoryRegisters.map((history) => (
                                        <TableRow key={history.ideletronicPoint}>
                                            <TableCell>{history.date ? convert(history.date.toString()) : <>Sem dados de ponto para o usuário</>}</TableCell>
                                            <TableCell>{Number(history.initialTime) == 0 ? <></> : history.initialTime}</TableCell>
                                            <TableCell>{history.finalTime}</TableCell>
                                            <TableCell>{history.totalWork}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>

            </Box>

        </>
    )
}