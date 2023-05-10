import { Box } from '@mui/material'
import TableStatus from '../../components/TableStock'
export default function () {
    return (
        <Box>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={3}>
                Estoque
            </Box>
            <TableStatus />
        </Box>
    )
}