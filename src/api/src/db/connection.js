const mysql = require('mysql2')
require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
  })
const conn = mysql.createConnection({
    host: `${process.env.HOST}`, 
    user: `${process.env.USER}`, 
    password: `${process.env.PASSWORD}`, 
    database: `${process.env.DATA_BASE}` 
});
module.exports = conn;