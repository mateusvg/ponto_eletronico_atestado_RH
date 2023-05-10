import { Box } from '@mui/material'
import TableStatus from '../../components/TableSales'
export default function () {
    return (
        <Box>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={3}>
                Venda
            </Box>
            <TableStatus />
        </Box>
    )
}