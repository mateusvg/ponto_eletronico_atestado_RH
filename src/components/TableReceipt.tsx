import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';



//services
import { getAllSales } from '../services/Admin/getAllSales'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { access } from 'fs';


type saleReceiptType = {
    [x: string]: any;
    idStock: string
    name: string
    price: number
    quantity: number
    IdSale: string
    date: string
    idSale: string
    

}

export default function BasicTable() {

    const [stock, setStock] = useState<saleReceiptType[] | []>([]);

    useEffect(() => {
        getAllSales()
            .then(data => setStock(data))
    }, [])

    const teste = (
        stock?.map((product) =>

            <TableRow key={product.idSale}>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.price}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
                <TableCell align="center">{product.IdSale}</TableCell>

            </TableRow>
        )
    )


    return (
        <Box>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} margin={3}>
                DATE

            </Box>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nome Produto</TableCell>
                            <TableCell align="center">Preço</TableCell>
                            <TableCell align="center">Quantidade</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teste}
                    </TableBody>
                </Table>
            </TableContainer>


        </Box >
    );
}
