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
    let id = req.params.id
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
    console.log("get all schedule by admin ")
    let date = req.body[0]
    const data = await users.getAllSchedules(date)
    res.status(200).send(data);
};

exports.deleteScheduleApointmentByAdmin = async (req, res, next) => {
    let id = req.params.id
    console.log(id)
    const data = await users.deleteScheduleApointmentByAdmin(id)
    res.status(200).send(data);
};


exports.updateStatusScheduleByAdmin = async (req, res, next) => {
    let status = req.body.status
    let id = req.body.id
    console.log(status)
    const data = await users.updateStatusScheduleByAdmin(status, id)
    res.status(200).send(data);
};

exports.getAllRegisterByMonthService = async (req, res, next) => {
    let inicialDateMonth = req.body.inicialDate
    var my_month = new Date(`${inicialDateMonth}`).getMonth() + 1
    let userId = req.body.userId
    const data = await users.getAllRegisterByMonthService(my_month, userId)
    res.status(200).send(data);
};

exports.getAllRegisterByMonthServiceTotalHours = async (req, res, next) => {
    let inicialDateMonth = req.body.inicialDate
    var my_month = new Date(`${inicialDateMonth}`).getMonth() + 1
    let userId = req.body.userId
    const data = await users.getAllRegisterByMonthServiceTotalHours(my_month, userId)
    res.status(200).send(data);
};


//Seleciona o ultimo dia do mes seleiconado
// var my_date = new Date(`${inicialDate}`);
// var last_date = new Date(my_date.getFullYear(), my_date.getMonth() + 1, 0);