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


exports.getAllStatusCertificate = async (req, res, next) => {
    let  id  = req.params.id
    const data = await users.getAllStatusCertificate(id)
    res.status(200).send(data);
};


exports.postFormUser = async(req, res, next) => {
    let idForm = 0
    let nomePacienteBody = req.body.nomePaciente
    let cpfBody =  req.body.cpf
    let nomeMedicoBody = req.body.nomeMedico
    let dataBody =  new Date()
    let aptidaoBody = req.body.aptidao
    let anexo = req.body.postImage.myFile
    let userId = req.body.userId
    console.log("form Controller ")
    const data = await users.postFormUser(idForm, nomePacienteBody, cpfBody,nomeMedicoBody, dataBody, aptidaoBody, anexo, userId)
    res.status(201).send('Formulario recebido com sucesso');
};