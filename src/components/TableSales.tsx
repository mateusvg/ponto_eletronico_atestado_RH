import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { TextField, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';


//services
import { getAllStock } from '../services/Admin/getAllStock'

type Anchor = 'bottom'

type stockType = {
    idStock: string
    name: string
    price: number
    quantity: number
}



export default function TemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    interface ObjectInterface {
        idStock: number
        name: string
        price: number
        quantidade: number
    }

    const [cart, setCart] = useState<ObjectInterface[]>([]);
    const [totalGeral, setTotalGeral] = useState<number>(0)



    function deleteObject(id: number, preco: number) {
        const filteredArray = cart.filter((obj) => obj.idStock !== id);
        setCart(filteredArray);
        setTotalGeral(totalGeral - preco)
    }

    function handleCloseSale() {
        //onOpenFinalSale()
    }

    function clearProducts() {
        setCart([]);
        setTotalGeral(0)
    }

    

    function addOnCart(...data: any) {
        setCart([...cart, data[0]]);
        setTotalGeral(totalGeral + data[0].price)
    }




    const [stock, setStock] = useState<stockType[] | []>([]);
    useEffect(() => {
        getAllStock()
            .then(data => setStock(data))
    }, [])

    //Search
    const [searchInput, setSearchInput] = useState("")
    const handleChange = (e: any) => {
        e.preventDefault()
        console.log(searchInput)
        setSearchInput(e.target.value)
    }
    if (searchInput.length > 0) {
        stock.filter((data) => {
            console.log(`dados: ${data.name}`)
            return data.name.includes(searchInput)
        })
    }




    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
        //onClick={toggleDrawer(anchor, false)}
        //onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} margin={3}>

                <TextField fullWidth label="Procurar produto" id="fullWidth" onChange={handleChange}
                    value={searchInput} />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Box>

            <Divider />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nome Produto</TableCell>
                            <TableCell align="center">Preço</TableCell>
                            <TableCell align="center">Quantidade no estoque</TableCell>
                            <TableCell align="center">Adicionar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            stock?.filter(post => {
                                if (searchInput === '') {
                                    return post;
                                } else if (post.name.toLowerCase().includes(searchInput.toLowerCase())) {
                                    return post;
                                }
                            }).map((product) => (

                                <TableRow key={product.idStock}>
                                    <TableCell align="center">{product.name}</TableCell>
                                    <TableCell align="center">{product.price}</TableCell>
                                    <TableCell align="center">{product.quantity}</TableCell>
                                    <TableCell align="center"><Button onClick={() => addOnCart({ idStock: product.idStock, name: product.name, price: product.price })} onClickCapture={toggleDrawer("bottom", false)}><AddShoppingCartIcon /></Button></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );

    return (
        <div>
            {(['bottom'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} margin={3}>

                        <IconButton color="primary" aria-label="add to shopping cart" onClick={toggleDrawer(anchor, true)}>
                            <AddShoppingCartIcon sx={{ minWidth: 100, minHeight: 100 }} />
                        </IconButton>
                    </Box>


                    {totalGeral === 0 ?
                        <Box>

                            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} margin={3}><Typography variant="h3" >Carrinho Vazio</Typography></Box>
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} margin={3}>
                                <Typography>Clique no icone para adicionar itens</Typography>

                            </Box>
                        </Box>
                        :
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Nome Produto</TableCell>
                                        <TableCell align="center">Preço</TableCell>
                                        <TableCell align="center">Quantidade</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cart?.map((product) => (

                                            <TableRow key={product.idStock}>
                                                <TableCell align="center">{product.name}</TableCell>
                                                <TableCell align="center">{product.price}</TableCell>
                                                <TableCell align="center">1</TableCell>
                                                <TableCell align="center"><Button onClick={() => deleteObject(product.idStock, product.price)} ><DeleteIcon /></Button></TableCell>

                                            </TableRow>
                                        ))}
                                </TableBody>

                            </Table>

                            <Box marginTop={3} marginLeft={3}>
                                <Typography variant="h5">Total:</Typography>
                                <Typography variant="h3" >R$ {totalGeral}</Typography>
                            </Box>

                            <Box marginTop={5} marginLeft={2}>
                                <Button
                                    variant="outlined"
                                    onClick={() => { clearProducts() }}>
                                    Limpar produtos
                                </Button>
                            </Box>

                            <Grid container justifyContent="flex-end" marginLeft={-2} marginBottom={2}>
                                <Button
                                    variant="contained"
                                    onClick={handleCloseSale}>
                                    Finalizar Venda
                                </Button>
                            </Grid>

                        </TableContainer>
                    }

                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>


                </React.Fragment>
            ))}
        </div>
    );
}