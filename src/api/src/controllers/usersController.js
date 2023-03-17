const users = require('../models/usersModel')

exports.getAllUsers = async (req, res, next) => {
    const data = await users.selectUser()
    res.status(200).send(data);
};
