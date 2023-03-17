const express = require('express');
const app = express();

const cors = require('cors');
var corsOptions = {
	origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

//Rotas
const index = require('./routes/index');
const login = require('./routes/userLogin')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index);
app.use('/login', login)

module.exports = app;