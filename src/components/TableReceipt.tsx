import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';



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
    IdStockProduct: number,

}

export default function BasicTable() {

    const [stock, setStock] = useState<saleReceiptType[] | []>([]);

    useEffect(() => {
        getAllSales()
            .then(data => setStock(data))
    }, [])

    type Sale = {
        idSales: number;
        quantity: number;
        IdStockProduct: number;
        IdSale: string;
        date: string;
        idStock: number;
        name: string;
        price: number;
    };

    let teste5 = (stock as any[]).reduce((acc: { [x: string]: any[]; }, sale: { IdSale: string | number; }) => {
        if (!acc[sale.IdSale]) {
            acc[sale.IdSale] = [sale];
        } else {
            acc[sale.IdSale].push(sale);
        }
        return acc;
    }, {} as { [key: string]: Sale[] });




    let myArray = [];
    for (const key in teste5) {

        //console.log(` ${JSON.stringify(teste5[key])}`);
        myArray.push(teste5[key])
    }



    const teste = (

        myArray?.map((product) => {
            return product?.map((innerEl: { idSale: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; quantity: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; IdSale: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => (

                
                <TableRow key={innerEl.idSale}>
                    <TableCell align="center">{innerEl.name}</TableCell>
                    <TableCell align="center">{innerEl.price}</TableCell>
                    <TableCell align="center">{innerEl.quantity}</TableCell>
                    <TableCell align="center">{innerEl.IdSale}</TableCell>

                </TableRow>
            ))
        }
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
