const users = require('../models/insertUserByAdmin')

exports.insertUser = async (req, res, next) => {
    console.log("insert user by admin")
    let userName = req.body.userName
    let cpf = req.body.cpf
    let status = req.body.status
    const data = await users.insertUser(userName, cpf, status)
    res.status(200).send();
};

exports.getAllRegistersUsersStatus = async (req, res, next) => {
    console.log("get all status user by admin")
    const data = await users.getAllRegistersUsersStatus()
    res.status(200).send(data);
};


exports.deletePersonStatusCertificateId = async (req, res, next) => {
    console.log("DELETE CERTIFICATE BY ID")
    let  id  = req.params.id
    const data = await users.deletePersonStatusCertificateId(id)
    res.status(200).send(data);
}

exports.getAllUserSchedule = async (req, res, next) => {
    console.log("get all schedule user by admin ")
    const data = await users.getAllUserSchedule()
    res.status(200).send(data);
};


exports.insertNewSchedule = async (req, res, next) => {
    console.log("insert user by admin schedule")
    let userName = req.body.userName
    let cpf = req.body.cpf
    let date = req.body.data
    let phone = req.body.telefone
    const data = await users.insertNewSchedule(userName, cpf, date, phone)
    res.status(200).send();
};

exports.getAllSchedules = async (req, res, next) => {
    console.log("get all schedule user by admin ")
    let date = req.body.data
    const data = await users.getAllSchedules(date)
    res.status(200).send(data);
};
