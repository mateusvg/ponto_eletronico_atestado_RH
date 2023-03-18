const users = require('../models/insertUserByAdmin')

exports.insertUser = async (req, res, next) => {
    console.log("insert user by admin")
    let userName = req.body.userName
    let cpf = req.body.cpf
    let status = req.body.status
    const data = await users.insertUser(userName, cpf, status)
    res.status(200).send();
};
