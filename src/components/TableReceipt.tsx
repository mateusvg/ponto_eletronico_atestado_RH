import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import localept from 'date-fns/locale/pt-BR'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DateFnsUtils from "@date-io/date-fns";

//services
import { getAllSales } from '../services/Admin/getAllSales'
import { getAllSalesByDateService } from '../services/Admin/getAllSalesByDate'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';




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

    let teste5 = (stock as any[])?.reduce((acc: { [x: string]: any[]; }, sale: { IdSale: string | number; }) => {
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
    //console.log(myArray)


    const teste = (
        myArray.length == 0 ? 
        <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} margin={5}>
            <Typography variant="h5">Sem vendas realizadas no dia</Typography>
        </Box>
            :
            myArray?.map((product, index) => {
                //console.log(JSON.stringify(product) + "o produto");
                return (
                    <Box margin={5}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Venda - {index} </Typography>
                            </AccordionSummary>
                            <Typography marginLeft={3}>Sumário da venda: </Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Nome Produto</TableCell>
                                            <TableCell align="center">Preço</TableCell>
                                            <TableCell align="center">Quantidade</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    {product.map((innerEl: { idSale: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; quantity: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; IdSale: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => (

                                        <TableBody>
                                            <TableRow key={innerEl.idSale}>
                                                <TableCell align="center">{innerEl.name}</TableCell>
                                                <TableCell align="center">{innerEl.price}</TableCell>
                                                <TableCell align="center">1</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    ))}

                                </Table>

                            </TableContainer>
                        </Accordion>
                    </Box>
                )
            })


    )


    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    function convert(str: any) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    let dateToday = convert(selectedDate)

    const getAllSalesByDate = async () => {
        const data1 = await getAllSalesByDateService({ date: dateToday })
        setStock(data1)
    }




    return (
        <Box>
            <Box display={'flex'} gap={2} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} margin={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs} locale={localept} utils={DateFnsUtils}>
                    <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                        <DatePicker label={'Mês/Ano'} views={['day', 'month', 'year']} value={selectedDate}
                            onChange={handleDateChange} />
                    </DemoContainer>
                    <Button variant='contained' onClick={getAllSalesByDate} >Buscar</Button>
                </LocalizationProvider>
            </Box>
            <Box>
                Vendas do Dia :
            </Box>
            {teste}
        </Box >
    );
}
