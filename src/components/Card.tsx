import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, MenuItem } from '@mui/material';

import Clock from './ClockPoint'
import { useState } from 'react';

export default function BasicCard() {


    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box m={4} p={3}>
            <Card sx={{ minWidth: 275 }}>
                <Box p={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Clock />
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} margin={3}>
            <div>
                {/* Button to open the dialog */}
                <Button  variant="outlined" onClick={() => setIsOpen(true)}>Registrar</Button>

                {/* Dialog */}
                <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                    <form>
                        <DialogTitle>Registrar</DialogTitle>
                        <DialogContent>

                            <Box display={'flex'} flexDirection={'column'} gap={'10px'} margin={3}>


                            </Box>
                        </DialogContent>
                        <DialogActions>
                            {/* Buttons */}
                            <Button variant="contained" color="error" onClick={() => setIsOpen(false)}>Cancelar</Button>
                            <Button variant="contained" color="success" type="submit">
                                Registrar
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        </Box>
                </Box>
            </Card>
        </Box>
    );
}
