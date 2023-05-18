const users = require('../models/userLoginModel')
const sendEmail = require("../emailSend")



exports.getAllUsers = async (req, res, next) => {
    console.log("get all users login")
    let user = req.body.user
    const data = await users.selectUser(user)
    res.status(200).send(data);
};

exports.insertNewUser = async (req, res, next) => {
    console.log("insertNewUser")
    let user = req.body.user
    let password = req.body.password
    let permission = req.body.radio
    const data = await users.insertNewUser(user, password, permission)
    res.status(200).send(data);
};

exports.recover = async (req, res, next) => {
    console.log("recover")
    let user = req.body.user
    let cpf = req.body.cpf
    let email = req.body.email
    const data = await users.recover(user, cpf, email)
    sendEmail.sendEmail(data)
    res.status(200).send(data);
};