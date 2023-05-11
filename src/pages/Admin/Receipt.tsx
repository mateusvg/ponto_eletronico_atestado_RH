import { Box } from '@mui/material'
import Receipt from '../../components/TableReceipt'
export default function () {
    return (
        <Box>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={3}>
                Venda Recibos
            </Box>
            <Receipt />
        </Box>
    )
}