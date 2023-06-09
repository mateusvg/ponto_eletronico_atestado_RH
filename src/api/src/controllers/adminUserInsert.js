const users = require('../models/insertUserByAdmin')

exports.insertUser = async (req, res, next) => {
    console.log("insert user by admin")
    let userName = req.body.userName
    let cpf = req.body.cpf
    let status = req.body.status
    let userPermission = req.body.userPermission
    const data = await users.insertUser(userName, cpf, status, userPermission)
    res.status(200).send();
};

exports.getAllRegistersUsersStatus = async (req, res, next) => {
    console.log("get all status user by admin")
    const data = await users.getAllRegistersUsersStatus()
    res.status(200).send(data);
};

exports.getAllColaboradores = async (req, res, next) => {
    console.log("get all colaboradores")
    const data = await users.getAllColaboradores()
    res.status(200).send(data);
};

exports.getAllExtrato = async (req, res, next) => {
    console.log("get all extrato")
    const data = await users.getAllExtrato()
    console.log(data)
    res.status(200).send(data);
};

exports.getAllStock = async (req, res, next) => {
    console.log("get all stock")
    const data = await users.getAllStock()
    console.log(data)
    res.status(200).send(data);
};

exports.insertStock = async (req, res, next) => {
    console.log("insert stock by admin")
    let nomeProduto = req.body.nomeProduto
    let quantidade = req.body.quantidade
    let preco = req.body.preco
    const data = await users.insertStock(nomeProduto, quantidade, preco)
    res.status(200).send();
};

exports.deleteStock = async (req, res, next) => {
    console.log("DELETE STOCK BY ID")
    let id = req.params.id
    const data = await users.deleteStock(id)
    res.status(200).send(data);
}

exports.updateStock = async (req, res, next) => {
    console.log("UPDATE STOCK")
    let name = req.body.productEdit
    let id = req.body.id
    let price = req.body.priceEdit
    let quantity = req.body.quantityEdit
    const data = await users.updateStock(name, price, quantity, id)
    res.status(200).send(data);
};

exports.insertSale = async (req, res, next) => {
    console.log("insert sales by admin")
    let cart = req.body
    console.log(cart)
    const data = await users.insertSale(cart)
    res.status(200).send();
};

exports.getAllSales = async (req, res, next) => {
    console.log("get all Sales")
    const data = await users.getAllSales()
    res.status(200).send(data);
};

exports.getAllSalesByDate = async (req, res, next) => {
    console.log("get all sales by date")
    let date = req.body.date
    const data = await users.getAllSalesByDate(date)
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
    //Seleciona o ultimo dia do mes seleiconado
    // var my_date = new Date(`${inicialDate}`);
    // var last_date = new Date(my_date.getFullYear(), my_date.getMonth() + 1, 0);
};

exports.updateStatusCertificateByAdmin = async (req, res, next) => {
    let status = req.body.status
    let idMedical = req.body.idMedical
    const data = await users.updateStatusCertificateByAdmin(status, idMedical)
    res.status(200).send(data);
};

