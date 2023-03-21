const users = require('../models/usersModel')

exports.getAllUsers = async (req, res, next) => {
    const data = await users.selectUser()
    res.status(200).send(data);
};

exports.insertUserPoint = async (req, res, next) => {
    let idUser = req.body.userId
    let time = req.body.time
    let date = req.body.date
    let counter = req.body.counter
    const data = await users.insertUserPoint(idUser, time, date, counter)
    res.send().status(200)
};

exports.insertUserPointExit = async (req, res, next) => {
    let idEletronicPoint = req.body.idEletronicPoint
    let finalTime = req.body.finalTime
    const data = await users.insertUserPointExit(idEletronicPoint, finalTime)
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

