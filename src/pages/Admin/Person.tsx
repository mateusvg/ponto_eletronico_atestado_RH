import { Box } from '@mui/material'
import TablePerson from '../../components/TablePerson'
export default function () {
    return (
        <Box>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={3}>
                Colaboradores
            </Box>
            <TablePerson />
        </Box>
    )
}