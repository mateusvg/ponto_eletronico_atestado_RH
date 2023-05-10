import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SearchIcon from '@mui/icons-material/Search';


//services
import { getAllStock } from '../services/Admin/getAllStock'
import { insertProduct } from '../services/Admin/insertProduct'
import { deleteProduct } from '../services/Admin/deleteProduct'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';


type stockType = {
  idStock: string
  name: string
  price: number
  quantity: number
}

export default function BasicTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);



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

  const [nomeProduto, setNomeProduto] = useState('');
  function handleNomeChange(event: any) {
    const { value } = event.target
    setNomeProduto(value)
  }
  const [quantidade, setQuantidade] = useState('');
  function handleQuantidadeChange(event: any) {
    const { value } = event.target
    setQuantidade(value)
  }

  const [preco, setPreco] = useState('');
  function handlePrecoChange(event: any) {
    const { value } = event.target
    setPreco(value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await insertProduct({ nomeProduto: nomeProduto, quantidade: data.get('quantidade'), preco: preco })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });

    // Close the dialog
    setIsOpen(false);
    getAllStock()
      .then(data => setStock(data))
  }




  //DeleteModal
  const [idStock, setIdStock] = useState('')
  const [nameProduct, setNameProduct] = useState('')
  function handleOpenModalDelete(idStock: any, name: any) {
    setIdStock(idStock)
    setNameProduct(name)
    setIsOpenModalDelete(true)
  }
  const handleSubmitDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await deleteProduct({ idStock: idStock })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });

    // // Close the dialog
    setIsOpenModalDelete(false);
    getAllStock()
      .then(data => setStock(data))
  }

  return (
    <Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} margin={3}>

        <TextField fullWidth label="Procurar produto" id="fullWidth" onChange={handleChange}
          value={searchInput} />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>
      <Box margin={3}>
        <Button variant="contained" onClick={() => setIsOpen(true)} >Adicionar produto</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nome Produto</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Editar</TableCell>
              <TableCell align="center">Deletar</TableCell>
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
                  <TableCell align="center"><Button><ModeEditIcon /></Button></TableCell>
                  <TableCell align="center"><Button onClick={() => handleOpenModalDelete(product.idStock, product.name)}><DeleteIcon /></Button></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>




      {/* Dialog CADASTRAR */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Adicionar produto</DialogTitle>
          <DialogContent>

            <Box display={'flex'} flexDirection={'column'} gap={'10px'} margin={3}>

              {/* Nome Produto Input */}
              <TextField
                name="nomeProduto"
                required
                label="Nome Produto"
                value={nomeProduto}
                onChange={handleNomeChange}
                fullWidth
                id="nomeProduto"
              />

              {/* quantidade Input */}
              <TextField
                name="quantidade"
                required
                label="Quant"
                value={quantidade}
                onChange={handleQuantidadeChange}
                fullWidth
                id="quantidade"
              />

              {/* quantidade Input */}
              <TextField
                name="quantidade"
                required
                label="Preço R$"
                value={preco}
                onChange={handlePrecoChange}
                fullWidth
                id="preco"
              />

            </Box>
          </DialogContent>
          <DialogActions>
            {/* Buttons */}
            <Button variant="contained" color="error" onClick={() => setIsOpen(false)}>Cancelar</Button>
            <Button variant="contained" color="success" type="submit">
              Cadastrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>





      {/* BOX DELETAR */}
      <div>
        <Dialog open={isOpenModalDelete} onClose={() => setIsOpenModalDelete(false)}>
          <form onSubmit={handleSubmitDelete}>
            <Box display={'flex'} flexDirection={'column'} gap={'10px'} margin={3}>
              <DialogTitle>Deseja deletar produto ?</DialogTitle>
              <DialogContent>
                {nameProduct}
              </DialogContent>
              <Box display={'flex'} flexDirection={'column'} gap={'10px'} margin={3}>
                <DialogActions>
                  {/* Buttons */}
                  <Button variant="contained" color="error" onClick={() => setIsOpenModalDelete(false)}>Cancelar</Button>
                  <Button variant="contained" color="success" type="submit">
                    Deletar
                  </Button>
                </DialogActions>
              </Box>
            </Box>
          </form>
        </Dialog>
      </div>

    </Box >
  );
}
