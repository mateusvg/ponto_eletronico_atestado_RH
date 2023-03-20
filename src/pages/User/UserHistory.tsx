import { useContext, useEffect } from 'react';
import { userIdConst } from '../../contexts/UsersId';
import { getPointDateByUserAllHistory } from '../../services/Users/getPointDateByUserAllHistory'
import TableUserHistoryPoint from '../../components/TableUserHistoryPoint'


export default function () {
    const { userId } = useContext(userIdConst);

    //Get AllPoint from USER by date
    useEffect(() => {
        getPointDateByUserAllHistory(userId)
    }, [])
    return (
        <>
            USER HISTORY POINT
            <TableUserHistoryPoint />

        </>
    )
}