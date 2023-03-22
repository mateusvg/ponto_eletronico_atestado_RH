import { Box } from '@mui/material'
import TableCertificateStatusAdmin from '../../components/TableCertificateStatusAdmin'
export default function () {
    return (
        <Box>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={3}>
                Atestado Médico
            </Box>
            <TableCertificateStatusAdmin />
        </Box>
    )
}