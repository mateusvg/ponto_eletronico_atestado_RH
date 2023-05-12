const users = require('../models/userLoginModel')

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
