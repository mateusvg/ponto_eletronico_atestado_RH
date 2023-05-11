const conn = require('../db/connection')

async function insertUser(userName, cpf, statusReq) {

    try {
        const insertUser = await new Promise((resolve, reject) => {
            conn.query('INSERT INTO user (userName, userPassword, userPermission) VALUES (?, 123, 2)', [userName], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

        const select = await new Promise((resolve, reject) => {
            conn.query('SELECT idUser from user order by idUser desc LIMIT 1;', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

        let userLastId = select[0].idUser

        function changeStatus(status) {
            if (status === 'Ativo') {
                return 1
            } else if (status === 'Inativo') {
                return 2
            }
        }

        let teste = changeStatus(statusReq)
        const insertCpf = await new Promise((resolve, reject) => {
            conn.query('INSERT INTO `ponto_atestado`.`userPersonalData` (`iduserPersonalData`, `cpf`, `user_iduser`, `statusUser_idtable1`) VALUES (0, ?, ?, ?);', [cpf, userLastId, teste], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

    } catch (err) {
        console.log(err)
    }

}


async function getAllRegistersUsersStatus() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM medicalcertificate inner join user_has_medicalcertificate ON user_has_medicalcertificate.medicalCertificate_idmedicalCertificate = medicalcertificate.idmedicalCertificate INNER join user ON user.iduser = user_has_medicalcertificate.user_iduser inner join statusbycpf on statusbycpf.idstatusByCpf = medicalcertificate.statusByCpf_idstatusByCpf order by medicalcertificate.idmedicalCertificate asc', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function getAllColaboradores() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM `user` inner join userpersonaldata on userpersonaldata.user_iduser = user.iduser where user.userPermission = "2" ', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function getAllExtrato() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM `eletronicpoint` inner join eletronicpoint_has_user on eletronicpoint_has_user.eletronicPoint_ideletronicPoint = eletronicpoint.ideletronicPoint INNER join user ON user.iduser = eletronicpoint_has_user.user_iduser', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function getAllStock() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM `stock`', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}


async function insertStock(nomeProduto, quantidade, preco) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('INSERT INTO stock (name, price, quantity) VALUES (?,?,?)', [nomeProduto, preco, quantidade], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function deleteStock(id) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('DELETE from stock where idStock = ?', [id], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function updateStock(name, price, quantity, id) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('update `stock` SET name =?, price = ?, quantity=? where idStock  = ?', [name, price, quantity, id], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}





const strGeneretor = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


let date = new Date()
date = date.toISOString().split('T')[0]



async function insertSale(values) {

    let quantidadesStockUpdate = values
    let idSale = strGeneretor(10)

    try {
        let idSales = 0
        const insertValues = await values.map(obj => [idSales, 1, obj.idStock, idSale, date]);
        console.log(JSON.stringify(insertValues))

        const query = 'INSERT into sales (idSales, quantity, idStockProduct, idSale, date) VALUES ?'
        await new Promise((resolve, reject) => {
            conn.query(query, [insertValues], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        })

        let quantidade = -1
        const updateStockQuantity = await quantidadesStockUpdate.map(obj => [obj.idStock]);
        await new Promise((resolve, reject) => {
            updateStockQuantity.forEach(function (item) {
                conn.query('update stock set  quantity = quantity ?  where idStock = ?', [quantidade, item], (error, results, fields) => {
                    if (error) return reject(error);
                    return resolve(results);
                })
            })
        })

    } catch (err) {
        console.log(err)
    }
}


async function getAllSales() {

    
    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    let dateToday = convert(new Date())

    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM `sales` inner join stock ON sales.IdStockProduct = stock.idStock where date =?',[dateToday], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function getAllSalesByDate(date) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM `sales` inner join stock ON sales.IdStockProduct = stock.idStock WHERE date = ?',[date], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}


async function getAllUserSchedule() {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('select * from user where user.userPermission = 2', (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        //console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function deletePersonStatusCertificateId(id) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('DELETE from medicalcertificate where idmedicalCertificate = ?', [id], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}


async function insertNewSchedule(userName, cpf, date, phone) {

    let status = 'Agendado'

    try {
        const insertUser = await new Promise((resolve, reject) => {
            conn.query('INSERT INTO schedule ( userName, userCpf, scheduleDate, userPhone, status) VALUES (?,?,?,?,?)', [userName, cpf, date, phone, status], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });

    } catch (err) {
        console.log(err)
    }

}

async function getAllSchedules(date) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT * FROM `schedule` where scheduleDate  = ?', [date], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}


async function deleteScheduleApointmentByAdmin(id) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('DELETE FROM `schedule` where idSchedule  = ?', [id], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}
async function updateStatusScheduleByAdmin(status, id) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('update `schedule` SET status =? where idSchedule  = ?', [status, id], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function getAllRegisterByMonthService(my_month, userId) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('select * from eletronicpoint INNER JOIN eletronicpoint_has_user ON eletronicpoint.ideletronicPoint = eletronicpoint_has_user.eletronicPoint_ideletronicPoint inner join user ON user.iduser = eletronicpoint_has_user.user_iduser where user.iduser = ? and month(eletronicpoint.date) = ?', [userId, my_month], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function getAllRegisterByMonthServiceTotalHours(my_month, userId) {
    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(eletronicpoint.totalWork))) as totalWork FROM eletronicpoint INNER JOIN eletronicpoint_has_user ON eletronicpoint.ideletronicPoint = eletronicpoint_has_user.eletronicPoint_ideletronicPoint inner join user ON user.iduser = eletronicpoint_has_user.user_iduser where user.iduser = ? and month(eletronicpoint.date) = ?', [userId, my_month], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}

async function updateStatusCertificateByAdmin(status, idMedical) {

    function statusNumber(status) {
        if (status == 'Em processamento') {
            return 1
        } else if (status == 'Aprovado') {
            return 2
        } else if (status == 'Reprovado') {
            return 3
        }
    }
    let statusNumberVar = statusNumber(status)

    try {
        const result = await new Promise((resolve, reject) => {
            conn.query('update medicalcertificate SET medicalcertificate.statusByCpf_idstatusByCpf = ? where medicalcertificate.idmedicalCertificate = ? ', [statusNumberVar, idMedical], (error, results, fields) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
        console.log(JSON.stringify(result))
        let tratado = JSON.stringify(result)
        return tratado
    } catch (err) {
        console.log(err)
    }
}
module.exports = {getAllSalesByDate, getAllSales, updateStock, insertSale, deleteStock, insertStock, getAllStock, getAllExtrato, getAllColaboradores, updateStatusCertificateByAdmin, getAllRegisterByMonthServiceTotalHours, getAllRegisterByMonthService, insertUser, getAllRegistersUsersStatus, deletePersonStatusCertificateId, getAllUserSchedule, insertNewSchedule, getAllSchedules, deleteScheduleApointmentByAdmin, updateStatusScheduleByAdmin }