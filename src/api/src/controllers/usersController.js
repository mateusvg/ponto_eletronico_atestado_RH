const users = require('../models/usersModel')

exports.getAllUsers = async (req, res, next) => {
    const data = await users.selectUser()
    res.status(200).send(data);
};

exports.insertUserPoint = async (req, res, next) => {
    let idUser = req.body.userId
    let time = req.body.time
    let date = req.body.date
    const data = await users.insertUserPoint(idUser, time, date)
    res.send().status(200)
};

exports.getPointDateByUser = async (req, res, next) => {
    let  id  = req.params.id
    const data = await users.getPointDateByUser(id)
    res.status(200).send(data);
};


exports.getPointDateByUserAllHistory = async (req, res, next) => {
    let  id  = req.params.id
    const data = await users.getPointDateByUser(id)
    res.status(200).send(data);
};

