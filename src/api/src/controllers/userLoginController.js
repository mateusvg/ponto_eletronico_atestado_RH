const users = require('../models/userLoginModel')

exports.getAllUsers = async (req, res, next) => {
    console.log("get all users login")
    let user = req.body.user
    const data = await users.selectUser(user)
    res.status(200).send(data);
};
