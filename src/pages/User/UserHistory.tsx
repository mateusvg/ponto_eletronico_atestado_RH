import { useContext, useEffect } from 'react';
import { userIdConst } from '../../contexts/UsersId';
import { getPointDateByUserAllHistory } from '../../services/Users/getPointDateByUserAllHistory'
import TableUserHistoryPoint from '../../components/TableUserHistoryPoint'
import { Box } from '@mui/material';


export default function () {
    const { userId } = useContext(userIdConst);

    //Get AllPoint from USER by date
    useEffect(() => {
        getPointDateByUserAllHistory(userId)
    }, [])
    return (
        <Box textAlign={"center"}>
            Histórico de ponto eletrônico
            <TableUserHistoryPoint />

        </Box>
    )
}